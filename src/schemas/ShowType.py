from typing import Optional
from pydantic import BaseModel

class ShowTypeSchema(BaseModel):
    name: str
    
    class Config:
        orm_mode = True
        allow_population_by_field_name = True
        arbitrary_types_allowed = True