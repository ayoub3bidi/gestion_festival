from typing import Annotated
from sqlalchemy.orm import Session
from fastapi import Depends, status, APIRouter
from database.postgres_db import get_db
from middleware.auth_guard import get_current_admin_user
from schemas.User import UserSchema
from schemas.Ticket import TicketAdminSchema
from models.Ticket import Ticket
from controllers.admin.ticket import add_ticket, update_ticket_by_id, delete_ticket_by_id

router = APIRouter()

@router.get("", status_code=status.HTTP_200_OK)
def get_all_tickets(current_user: Annotated[UserSchema, Depends(get_current_admin_user)], db: Session = Depends(get_db)):
    tickets = db.query(Ticket).all()
    total_profit = 0
    for ticket in tickets:
        total_profit += ticket.price
    return {"tickets": tickets, "total_profit": total_profit}

@router.post("", status_code=status.HTTP_201_CREATED)
def create_ticket(current_user: Annotated[UserSchema, Depends(get_current_admin_user)], payload: TicketAdminSchema, db: Session = Depends(get_db)):
    return add_ticket(current_user, payload, db)

@router.patch("/{ticket_id}", status_code=status.HTTP_200_OK)
def update_ticket(current_user: Annotated[UserSchema, Depends(get_current_admin_user)], ticket_id: int, payload: TicketAdminSchema, db: Session = Depends(get_db)):
    return update_ticket_by_id(ticket_id, payload, db)

@router.delete("/{ticket_id}", status_code=status.HTTP_200_OK)
def unreserve_ticket(current_user: Annotated[UserSchema, Depends(get_current_admin_user)], ticket_id: int, db: Session = Depends(get_db)):
    return delete_ticket_by_id(ticket_id, db)