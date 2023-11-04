from database.postgres_db import Base
from sqlalchemy import Column, String, Integer
from fastapi_utils.guid_type import GUID, GUID_SERVER_DEFAULT_POSTGRESQL

class Room(Base):
    __tablename__ = 'room'
    id = Column(GUID, primary_key=True, server_default=GUID_SERVER_DEFAULT_POSTGRESQL)
    name = Column(String, nullable=False, unique=True)
    capacity = Column(Integer, nullable=False)