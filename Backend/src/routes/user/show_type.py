from typing import Annotated
from sqlalchemy.orm import Session
from fastapi import Depends, status, APIRouter
from database.postgres_db import get_db
from middleware.auth_guard import get_current_active_user
from schemas.User import UserSchema
from models.ShowType import ShowType

router = APIRouter()

@router.get("", status_code=status.HTTP_200_OK)
def get_all_show_types(current_user: Annotated[UserSchema, Depends(get_current_active_user)], db: Session = Depends(get_db)):
    show_types = db.query(ShowType).all()
    return show_types