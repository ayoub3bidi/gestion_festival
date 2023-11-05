from typing import Annotated
from sqlalchemy.orm import Session
from fastapi import Depends, status, APIRouter
from controllers.admin.show_type import add_show_type, delete_show_type
from database.postgres_db import get_db
from middleware.auth_guard import get_current_admin_user
from schemas.User import UserSchema
from schemas.ShowType import ShowTypeSchema

router = APIRouter()

@router.post("/register", status_code=status.HTTP_201_CREATED)
def register_new_show_type(current_user: Annotated[UserSchema, Depends(get_current_admin_user)], payload: ShowTypeSchema, db: Session = Depends(get_db)):
    return add_show_type(payload, db)

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_a_show_type(current_user: Annotated[UserSchema, Depends(get_current_admin_user)], id: str, db: Session = Depends(get_db)):
    return delete_show_type(id, db)