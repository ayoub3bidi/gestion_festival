from typing import Optional
from pydantic import BaseModel

class RoomSchema(BaseModel):
    name: str
    capacity: int
    
    class Config:
        orm_mode = True
        allow_population_by_field_name = True
        arbitrary_types_allowed = True