from typing import Annotated
from sqlalchemy.orm import Session
from fastapi import Depends, status, APIRouter
from controllers.user.ticket import add_ticket
from database.postgres_db import get_db
from middleware.auth_guard import get_current_user
from schemas.User import UserSchema
from schemas.Ticket import TicketSchema
from models.Ticket import Ticket

router = APIRouter()

@router.get("", status_code=status.HTTP_200_OK)
def get_current_tickets(current_user: Annotated[UserSchema, Depends(get_current_user)], db: Session = Depends(get_db)):
    tickets = db.query(Ticket).filter(Ticket.user_id == current_user.id).all()
    return tickets

@router.post("", status_code=status.HTTP_201_CREATED)
def reserve_ticket(current_user: Annotated[UserSchema, Depends(get_current_user)], payload: TicketSchema, db: Session = Depends(get_db)):
    return add_ticket(current_user, payload, db)