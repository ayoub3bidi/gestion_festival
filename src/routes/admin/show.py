from typing import Annotated
from sqlalchemy.orm import Session
from fastapi import Depends, status, APIRouter
from database.postgres_db import get_db
from middleware.auth_guard import get_current_admin_user
from schemas.User import UserSchema
from schemas.Show import ShowSchema
from models.Show import Show
from controllers.admin.show import add_show, update_show_by_id

router = APIRouter()

@router.get("", status_code=status.HTTP_200_OK)
def get_all_shows(current_user: Annotated[UserSchema, Depends(get_current_admin_user)], db: Session = Depends(get_db)):
    shows = db.query(Show).all()
    return shows

@router.post("", status_code=status.HTTP_201_CREATED)
def create_show(current_user: Annotated[UserSchema, Depends(get_current_admin_user)], payload: ShowSchema, db: Session = Depends(get_db)):
    return add_show(payload, db)

@router.patch("/{show_id}", status_code=status.HTTP_200_OK)
def update_show(current_user: Annotated[UserSchema, Depends(get_current_admin_user)], show_id: int, payload: ShowSchema, db: Session = Depends(get_db)):
    return update_show_by_id(show_id, payload, db)