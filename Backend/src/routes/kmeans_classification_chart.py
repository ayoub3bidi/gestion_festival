from typing import Annotated
from sqlalchemy.orm import Session
from fastapi import Depends, status, APIRouter
from database.postgres_db import get_db
from middleware.auth_guard import get_current_active_user, get_current_admin_user
from schemas.User import UserSchema
from schemas.Chart import ChartSchema
from sqlalchemy.orm import Session
from controllers.user.show import get_kmeans_classification_chart_for_shows
from controllers.admin.user import get_kmeans_classification_chart_for_users
from controllers.admin.ticket import get_kmeans_classification_chart_for_tickets

router = APIRouter()

@router.post("/shows", status_code=status.HTTP_200_OK)
def get_shows_kmeans_classifications_chart(current_user: Annotated[UserSchema, Depends(get_current_active_user)], payload: ChartSchema, db: Session = Depends(get_db)):
    return get_kmeans_classification_chart_for_shows(payload, db)

@router.post("/users", status_code=status.HTTP_200_OK)
def get_users_linear_regression_chart(current_user: Annotated[UserSchema, Depends(get_current_admin_user)], payload: ChartSchema, db: Session = Depends(get_db)):
    return get_kmeans_classification_chart_for_users(payload, db)

@router.post("/tickets", status_code=status.HTTP_200_OK)
def get_tickets_linear_regression_chart(current_user: Annotated[UserSchema, Depends(get_current_admin_user)], payload: ChartSchema, db: Session = Depends(get_db)):
    return get_kmeans_classification_chart_for_tickets(payload, db)