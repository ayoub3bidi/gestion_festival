from fastapi import HTTPException, status
from models.Ticket import Ticket
from models.Show import Show

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
    if current_user.job == "student" or current_user.job == "enfant":
        price = show.price_reduced
    else:
        price = show.price_normal
    db.add(show)
    db.commit()
    db.refresh(show)
    new_ticket = Ticket()
    new_ticket.user_id = current_user.id
    new_ticket.show_id = payload.show_id
    new_ticket.price = price
    db.add(new_ticket)
    db.commit()
    db.refresh(new_ticket)
    return new_ticket