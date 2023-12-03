from models.Show import Show
from sklearn.linear_model import LinearRegression
import matplotlib.pyplot as plt
import numpy as np
from io import BytesIO
from fastapi.responses import StreamingResponse
from utils.charts import get_linear_regression

def get_linear_regression_chart(payload, db):
    shows = db.query(Show).filter(Show.is_available == True).all()
    return get_linear_regression(shows, payload, "Shows Linear Regression Chart")