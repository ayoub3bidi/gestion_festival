from models.Show import Show
from utils.charts import get_linear_regression, get_kmeans_classification, get_decision_tree

def get_linear_regression_chart_for_shows(payload, db):
    shows = db.query(Show).filter(Show.is_available == True).all()
    return get_linear_regression(shows, payload, "Shows Linear Regression Chart")

def get_kmeans_classification_chart_for_shows(db):
    shows = db.query(Show).filter(Show.is_available == True).all()
    return get_kmeans_classification(shows, "Shows KMeans Classification Chart")

def get_decision_tree_chart_for_shows(payload, db):
    shows = db.query(Show).filter(Show.is_available == True).all()
    return get_decision_tree(shows, payload, "Shows Decision Tree Chart")