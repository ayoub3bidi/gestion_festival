from typing import Optional
from pydantic import BaseModel

class TicketSchema(BaseModel):
    show_id: str
    user_id: str
    
    class Config:
        orm_mode = True
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        
class TicketAdminSchema(BaseModel):
    show_id: str
    user_id: Optional[str]
    collective_tickets: Optional[int]
    
    class Config:
        orm_mode = True
        allow_population_by_field_name = True
        arbitrary_types_allowed = True