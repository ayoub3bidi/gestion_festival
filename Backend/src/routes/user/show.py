from typing import Annotated
from sqlalchemy.orm import Session
from fastapi import Depends, status, APIRouter
from database.postgres_db import get_db
from middleware.auth_guard import get_current_active_user
from schemas.User import UserSchema
from models.Show import Show
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from sklearn.linear_model import LinearRegression
import matplotlib.pyplot as plt
import numpy as np
from io import BytesIO

router = APIRouter()

@router.get("", status_code=status.HTTP_200_OK)
def get_all_available_shows(current_user: Annotated[UserSchema, Depends(get_current_active_user)], db: Session = Depends(get_db)):
    shows = db.query(Show).filter(Show.is_available == True).all()
    return shows

@router.get("/linear-regression-chart", status_code=status.HTTP_200_OK)
def get_linear_regression_chart(current_user: Annotated[UserSchema, Depends(get_current_active_user)], db: Session = Depends(get_db)):
    shows = db.query(Show).filter(Show.is_available == True).all()
    # Convert 'shows' to a list of dictionaries
    shows = [show.__dict__ for show in shows]

    x = np.array([show['available_seats'] for show in shows]).reshape((-1, 1))
    y = np.array([show['reserved_seats'] for show in shows])

    model = LinearRegression().fit(x, y)

    plt.scatter(x, y, color = 'red')
    plt.plot(x, model.predict(x), color = 'blue')
    plt.title('Linear Regression of Shows')
    plt.xlabel('available_seats')
    plt.ylabel('reserved_seats')

    buf = BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    
    return StreamingResponse(buf, media_type="image/png")