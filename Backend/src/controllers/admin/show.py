from fastapi import HTTPException, status
from models.Show import Show

def add_show(payload, db):
    show_date = payload.date
    show_time = payload.time
    show_duration = payload.duration
    ## Check if the show will be between 17:00 and 23:00
    show_time = int(show_time.split(":")[0])
    if show_time < 17 or show_time > 23:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Show must be between 17:00 and 23:00")
    ## Check if there is a show at the same time
    shows = db.query(Show).filter(Show.date == show_date, Show.time == show_time).all()
    for show in shows:
        if show.time + show.duration > show_time:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Show with id {show.id} is already scheduled at this time")
        if show_time + show_duration > show.time:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Show with id {show.id} is already scheduled at this time")
    ## Check if room capacity is enough
    room_capacity = db.query(Show).filter(Show.room_id == new_show.room_id).capacity
    if room_capacity < new_show.reserved_seats:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Room capacity is {room_capacity} but {new_show.reserved_seats} seats are reserved")
    ## Add show to database
    new_show = Show(**payload.dict())
    db.add(new_show)
    db.commit()
    db.refresh(new_show)
    ## Return available seats with the show returned body
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