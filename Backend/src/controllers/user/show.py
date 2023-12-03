from models.Show import Show
from utils.charts import get_linear_regression

def get_linear_regression_chart_for_shows(payload, db):
    shows = db.query(Show).filter(Show.is_available == True).all()
    return get_linear_regression(shows, payload, "Shows Linear Regression Chart")