import re
from passlib.context import CryptContext
import os
from datetime import datetime, timedelta
from typing import Union
from jose import jwt
from fastapi import HTTPException, status
from constants.environment_variables import ACCESS_TOKEN_EXPIRE_MINUTES, ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_USERNAME, JWT_ALGORITHM, JWT_SECRET_KEY
from models.User import User
from models.Room import Room
from models.ShowType import ShowType
from models.Show import Show
from models.Ticket import Ticket
from database.postgres_db import SessionLocal
from constants.regex import email_regex, password_regex
import random
import string
from sqlalchemy.exc import IntegrityError

crypting_algorithm = "sha256_crypt" if JWT_ALGORITHM == "HS256" else "bcrypt"

pwd_context = CryptContext(schemes=[crypting_algorithm], deprecated="auto")
db = SessionLocal()

def create_admin_user():
    password = get_password_hash(ADMIN_PASSWORD)
    new_user = User(username=ADMIN_USERNAME, email=ADMIN_EMAIL, password=password, is_admin=True)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)  
        
def create_predefined_rooms():
    room_data = [
        {"name": "Room 1", "capacity": 600},
        {"name": "Room 2", "capacity": 300},
    ]

    rooms = [Room(name=data["name"], capacity=data["capacity"]) for data in room_data]
    for room in rooms:
        db.add(room)

    db.commit()

    for room in rooms:
        db.refresh(room)
    
def create_predefined_show_types():
    show_type_names = ["Théâtre", "Cinéma", "Musique", "Rencontre", "Animation"]

    show_types = [ShowType(name=name) for name in show_type_names]
    for show_type in show_types:
        db.add(show_type)

    db.commit()

def create_predefined_users():
    jobs = ['Teacher', 'Student', 'Doctor', 'Engineer', 'Artist', 'Musician', 'Writer']
    for _ in range(100):
        username = ''.join(random.choices(string.ascii_lowercase + string.digits, k=10))
        email = f'{username}@example.com'
        job = random.choice(jobs)
        password = 'default_password'
        user = User(username=username, email=email, job=job, password=password, is_admin=False, disabled=False)
        db.add(user)
        try:
            db.commit()
        except IntegrityError:
            db.rollback()
            
def create_predefined_shows():
    rooms = db.query(Room).all()
    show_types = db.query(ShowType).all()

    for i in range(12):
        unique_id = ''.join(random.choices(string.ascii_lowercase + string.digits, k=5))
        name = f'Show {i+1}-{unique_id}'
        date = (datetime.now() + timedelta(days=random.randint(1, 30))).strftime('%Y-%m-%d')
        time = f'{random.randint(17, 22)}:{random.randint(0, 59):02d}'
        duration = random.randint(30, 120)
        room = random.choice(rooms)
        reserved_seats = random.randint(0, room.capacity)
        available_seats = room.capacity - reserved_seats
        show_type = random.choice(show_types)
        price_normal = round(random.uniform(5, 50), 2)
        price_reduced = round(random.uniform(5, price_normal), 2)
        price_collective = round(random.uniform(5, price_reduced), 2)
        is_exceptional = random.choice([True, False])
        is_available = random.choice([True, False])

        show = Show(name=name, date=date, time=time, duration=duration, reserved_seats=reserved_seats,
                    available_seats=available_seats, room_name=room.name, show_type=show_type.name,
                    price_normal=price_normal, price_reduced=price_reduced, price_collective=price_collective,
                    is_exceptional=is_exceptional, is_available=is_available, room_id=room.id, show_type_id=show_type.id)

        db.add(show)
        db.commit()
        
def create_predefined_tickets():
    users = db.query(User).all()
    shows = db.query(Show).all()

    for user in users:
        show = random.choice(shows)
        price = random.choice([show.price_normal, show.price_reduced, show.price_collective])
        ticket = Ticket(price=price, user_id=user.id, show_id=show.id)
        db.add(ticket)
        db.commit()
        
def create_predefined_data():
    user = db.query(User).filter(User.email == ADMIN_EMAIL).first()
    if not user:
        create_admin_user()
        create_predefined_users()
        create_predefined_rooms()
        create_predefined_show_types()
        create_predefined_shows()
        create_predefined_tickets()

def validate_email(email):
    if re.search(email_regex, email):
        return True
    return False

def validate_password(password):
    if re.search(password_regex, password):
        return True
    return False

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)
    return encoded_jwt

def authenticate_user(payload, db):
    user = db.query(User).filter(User.email == payload.email).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invalid credentials")
    if not verify_password(payload.password, user.password):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Incorrect password")
    return user