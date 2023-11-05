from typing import Annotated
from sqlalchemy.orm import Session
from fastapi import Depends, status, APIRouter
from database.postgres_db import get_db
from middleware.auth_guard import get_current_admin_user
from schemas.User import UserSchema
from models.Ticket import Ticket

router = APIRouter()

@router.get("", status_code=status.HTTP_200_OK)
def get_current_tickets(current_user: Annotated[UserSchema, Depends(get_current_admin_user)], db: Session = Depends(get_db)):
    tickets = db.query(Ticket).filter(Ticket.user_id == current_user.id).all()
    return tickets