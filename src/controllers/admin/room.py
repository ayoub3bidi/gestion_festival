from fastapi import HTTPException, status
from models.Room import Room

def add_room(payload, db):
    new_room = Room(**payload.dict())
    db.add(new_room)
    db.commit()
    db.refresh(new_room)
    return new_room