from typing import Optional
from pydantic import BaseModel
    
class ChartSchema(BaseModel):
    x_attribute: str
    y_attribute: str
    num_clusters: Optional[int] = None