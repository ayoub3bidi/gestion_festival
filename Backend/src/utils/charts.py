from sklearn.linear_model import LinearRegression
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