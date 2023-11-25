from fastapi import HTTPException, status
from models.Show import Show

def add_show(payload, db):
    new_show = Show(**payload.dict())
    room_capacity = db.query(Show).filter(Show.room_id == new_show.room_id).capacity
    if room_capacity < new_show.reserved_seats:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Room capacity is {room_capacity} but {new_show.reserved_seats} seats are reserved")
    db.add(new_show)
    db.commit()
    db.refresh(new_show)
    available_seats = room_capacity - new_show.reserved_seats
    new_show.available_seats = available_seats
    return new_show
def update_show_by_id(id, payload, db):
    show = db.query(Show).filter(Show.id == id).first()
    if not show:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Show with id {id} not found")
    db.query(Show).filter(Show.id == id).update({k: v for k, v in payload.dict().items() if v is not None})
    db.commit()
    return {"message": f"Show with id {id} updated successfully"}