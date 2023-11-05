from fastapi import HTTPException, status
from models.Room import Room

def add_room(payload, db):
    new_room = Room(**payload.dict())
    db.add(new_room)
    db.commit()
    db.refresh(new_room)
    return new_room

def delete_room(id, db):
    room = db.query(Room).filter(Room.id == id).first()
    if not room:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Room with id {id} not found")
    db.delete(room)
    db.commit()
    return {"message": f"Room with id {id} deleted successfully"}