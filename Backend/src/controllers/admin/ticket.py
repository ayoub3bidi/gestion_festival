from fastapi import HTTPException, status
from models.Ticket import Ticket
from models.Show import Show
from models.User import User

def add_ticket(current_user, payload, db):
    show = db.query(Show).filter(Show.id == payload.show_id).first()
    if not show:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Show with id {payload.show_id} not found")
    if show.available_seats < 1:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Show with id {payload.show_id} is full")
    if show.is_exceptional:
        show_fill_rate_in_percent = (show.reserved_seats / show.room.capacity) * 100
        if show_fill_rate_in_percent > 75:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Show with id {payload.show_id} is an exceptional show and can only be filled up to 75% of its capacity, reservation is stopping now")
    show.available_seats -= 1
    if payload.user_id and payload.collective_tickets:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"User_id and collective_tickets are mutually exclusive")
    if payload.user_id:
        user = db.query(User).filter(User.id == payload.user_id).first()
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with id {payload.user_id} not found")
        if user.job == "student" or user.job == "enfant":
            price = show.price_reduced
        else:
            price = show.price_normal
    if payload.collective_tickets != None :
        price = show.price_collective * payload.collective_tickets
    db.add(show)
    db.commit()
    db.refresh(show)
    new_ticket = Ticket()
    new_ticket.show_id = payload.show_id
    new_ticket.price = price
    if payload.user_id:
        new_ticket.user_id = payload.user_id
    else:
        new_ticket.user_id = current_user.id
    db.add(new_ticket)
    db.commit()
    db.refresh(new_ticket)
    return new_ticket

def update_ticket_by_id(id, payload, db):
    ticket = db.query(Ticket).filter(Ticket.id == id).first()
    if not ticket:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Ticket with id {id} not found")
    db.query(Ticket).filter(Ticket.id == id).update(payload.dict())
    db.commit()
    return {"message": f"Ticket with id {id} updated successfully"}

def delete_ticket_by_id(id, db):
    ticket = db.query(Ticket).filter(Ticket.id == id).first()
    if not ticket:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Ticket with id {id} not found")
    db.delete(ticket)
    db.commit()
    return {"message": f"Ticket with id {id} deleted successfully"}