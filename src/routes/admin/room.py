from typing import Annotated
from sqlalchemy.orm import Session
from fastapi import Depends, status, APIRouter
from controllers.admin.room import add_room, delete_room
from database.postgres_db import get_db
from middleware.auth_guard import get_current_admin_user
from schemas.User import UserSchema
from schemas.Room import RoomSchema

router = APIRouter()

@router.post("/register", status_code=status.HTTP_201_CREATED)
def register_new_room(current_user: Annotated[UserSchema, Depends(get_current_admin_user)], payload: RoomSchema, db: Session = Depends(get_db)):
    return add_room(payload, db)

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_a_room(current_user: Annotated[UserSchema, Depends(get_current_admin_user)], id: str, db: Session = Depends(get_db)):
    return delete_room(id, db)