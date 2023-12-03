from typing import Annotated
from sqlalchemy.orm import Session
from fastapi import Depends, status, APIRouter
from database.postgres_db import get_db
from middleware.auth_guard import get_current_active_user
from schemas.User import UserSchema
from schemas.Chart import LinearRegressionSchema
from models.Show import Show
from sqlalchemy.orm import Session
from controllers.user.show import get_linear_regression_chart


router = APIRouter()

@router.get("", status_code=status.HTTP_200_OK)
def get_all_available_shows(current_user: Annotated[UserSchema, Depends(get_current_active_user)], db: Session = Depends(get_db)):
    shows = db.query(Show).filter(Show.is_available == True).all()
    return shows

@router.post("/linear-regression-chart", status_code=status.HTTP_200_OK)
def get_shows_linear_regression_chart(current_user: Annotated[UserSchema, Depends(get_current_active_user)], payload: LinearRegressionSchema, db: Session = Depends(get_db)):
    return get_linear_regression_chart(payload, db)