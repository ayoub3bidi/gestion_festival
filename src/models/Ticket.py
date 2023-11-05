from database.postgres_db import Base
from sqlalchemy import Column, String, Integer, Numeric
from fastapi_utils.guid_type import GUID, GUID_SERVER_DEFAULT_POSTGRESQL

class Ticket(Base):
    __tablename__ = 'ticket'
    id = Column(GUID, primary_key=True, server_default=GUID_SERVER_DEFAULT_POSTGRESQL)
    price = Column(Numeric, nullable=False)
    user_id = Column(GUID, nullable=False)
    show_id = Column(GUID, nullable=False)