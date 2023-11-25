from fastapi import HTTPException, status
from models.Show import Show
from models.Room import Room

def add_show(payload, db):
    show_date = payload.date
    show_time = payload.time
    show_duration = payload.duration
    ## Check if the show will be between 17:00 and 23:00
    show_time_converted_to_actual_time = int(show_time.split(":")[0]) + int(show_time.split(":")[1]) / 60
    if show_time_converted_to_actual_time < 17 or show_time_converted_to_actual_time > 23:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Show time must be between 17:00 and 23:00")
    ## Check if there is a show at the same time
    shows = db.query(Show).filter(Show.date == show_date, Show.time == show_time).all()
    for show in shows:
        if show.time + show.duration > show_time:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Show with id {show.id} is already scheduled at this time")
        if show_time + show_duration > show.time:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Show with id {show.id} is already scheduled at this time")
    ## Check if room exist
    room = db.query(Room).filter(Room.id == payload.room_id).first()
    if not room:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Room with id {payload.room_id} not found")
    ## check if room is exceptional, if yes, check if room is filled up to 75%
    if payload.is_exceptional:
        room_fill_rate_in_percent = (payload.reserved_seats / room.capacity) * 100
        if room_fill_rate_in_percent > 75:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Room with id {payload.room_id} is an exceptional room and can only be filled up to 75% of its capacity, reservation is stopping now")
    ## Check if room capacity is enough
    if room.capacity < payload.reserved_seats:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Room capacity is {room.capacity} but {new_show.reserved_seats} seats are reserved")
    ## Add show to database
    new_show = Show(**payload.dict())
    available_seats = room.capacity - new_show.reserved_seats
    new_show.available_seats = available_seats
    db.add(new_show)
    db.commit()
    db.refresh(new_show)
    return new_show

def update_show_by_id(id, payload, db):
    show = db.query(Show).filter(Show.id == id).first()
    if not show:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Show with id {id} not found")
    db.query(Show).filter(Show.id == id).update({k: v for k, v in payload.dict().items() if v is not None})
    db.commit()
    return {"message": f"Show with id {id} updated successfully"}

def delete_show_by_id(id, db):
    show = db.query(Show).filter(Show.id == id).first()
    if not show:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Show with id {id} not found")
    db.query(Show).filter(Show.id == id).delete()
    db.commit()
    return {"message": f"Show with id {id} deleted successfully"}