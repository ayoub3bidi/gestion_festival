from typing import Optional
from pydantic import BaseModel

class ShowSchema(BaseModel):
    name: str
    date: str
    time: str
    duration: int
    reserved_seats: int
    available_seats: int
    room_name: str
    show_type: str
    price_normal: float
    price_reduced: float
    price_collective: float
    is_exceptional: bool
    is_available: bool
    room_id: str
    show_type_id: str