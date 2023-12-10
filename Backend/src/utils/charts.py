from sklearn.linear_model import LinearRegression
from sklearn.cluster import KMeans
from sklearn.tree import DecisionTreeClassifier, plot_tree
import matplotlib.pyplot as plt
import numpy as np
from io import BytesIO
from fastapi.responses import StreamingResponse

def get_linear_regression(data, payload, title):
    # Convert data to a list of dictionaries
    data = [item.__dict__ for item in data]
    
    x = np.array([show[payload.x_attribute] for show in data]).reshape((-1, 1))
    y = np.array([show[payload.y_attribute] for show in data])

    model = LinearRegression().fit(x, y)

    plt.scatter(x, y, color = 'red')
    plt.plot(x, model.predict(x), color = 'blue')
    plt.title(title)
    plt.xlabel(payload.x_attribute)
    plt.ylabel(payload.y_attribute)

    buf = BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    
    return StreamingResponse(buf, media_type="image/png")

def get_kmeans_classification(data, payload, title):
    # Convert data to a list of dictionaries
    data = [item.__dict__ for item in data]
    
    features = np.array([[show[payload.x_attribute], show[payload.y_attribute]] for show in data])

    if payload.num_clusters is not None or payload.num_clusters > 0:
        kmeans = KMeans(n_clusters=payload.num_clusters, random_state=0)
    else:
        kmeans = KMeans(n_clusters=3, random_state=0)
    kmeans.fit(features)

    # Predict the cluster for each data point
    labels = kmeans.labels_

    # Plotting the clusters
    plt.scatter(features[:, 0], features[:, 1], c=labels, cmap='viridis', edgecolor='k')
    plt.scatter(kmeans.cluster_centers_[:, 0], kmeans.cluster_centers_[:, 1], marker='X', s=200, c='red')
    
    plt.title(title)
    plt.xlabel(payload.x_attribute)
    plt.ylabel(payload.y_attribute)

    buf = BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)

    return StreamingResponse(buf, media_type="image/png")

def get_decision_tree(data, payload, title):
    # Convert data to a list of dictionaries
    data = [item.__dict__ for item in data]
    
    X = np.array([[show[payload.x_attribute], show[payload.y_attribute]] for show in data])
    y = np.array([show[payload.target_attribute] for show in data])

    clf = DecisionTreeClassifier(random_state=1234)
    model = clf.fit(X, y)

    fig, ax = plt.subplots(figsize=(10, 10))  # whatever size you want
    plot_tree(clf, ax=ax)
    plt.title(title)

    buf = BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    
    return StreamingResponse(buf, media_type="image/png")