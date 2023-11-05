from fastapi import HTTPException, status
from models.Show import Show

def add_show(payload, db):
    new_show = Show(**payload.dict())
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