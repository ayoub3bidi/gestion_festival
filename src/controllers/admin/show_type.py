from fastapi import HTTPException, status
from models.ShowType import ShowType

def add_show_type(payload, db):
    new_show_type = ShowType(**payload.dict())
    db.add(new_show_type)
    db.commit()
    db.refresh(new_show_type)
    return new_show_type