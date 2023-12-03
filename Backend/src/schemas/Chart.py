from typing import Optional
from pydantic import BaseModel
    
class LinearRegressionSchema(BaseModel):
    x_attribute: str
    y_attribute: str