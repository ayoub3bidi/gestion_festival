from fastapi import HTTPException, status
from models.ShowType import ShowType

def add_show_type(payload, db):
    new_show_type = ShowType(**payload.dict())
    db.add(new_show_type)
    db.commit()
    db.refresh(new_show_type)
    return new_show_type

def delete_show_type(id, db):
    show_type = db.query(ShowType).filter(ShowType.id == id).first()
    if not show_type:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Show type with id {id} not found")
    db.delete(show_type)
    db.commit()
    return {"message": f"Show type with id {id} deleted successfully"}