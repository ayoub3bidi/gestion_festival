from database.postgres_db import Base
from sqlalchemy import Column, String, Integer, Boolean, Numeric
from fastapi_utils.guid_type import GUID, GUID_SERVER_DEFAULT_POSTGRESQL

class Show(Base):
    __tablename__ = 'show'
    id = Column(GUID, primary_key=True, server_default=GUID_SERVER_DEFAULT_POSTGRESQL)
    name = Column(String, nullable=False, unique=True)
    date = Column(String, nullable=False)
    time = Column(String, nullable=False)
    duration = Column(Integer, nullable=False)
    reserved_seats = Column(Integer, nullable=False)
    available_seats = Column(Integer, nullable=False)
    room_name = Column(String, nullable=False)
    show_type = Column(String, nullable=False)
    price_normal = Column(Numeric, nullable=False)
    price_reduced = Column(Numeric, nullable=False)
    price_collective = Column(Numeric, nullable=False)
    is_exceptional = Column(Boolean, default=False)
    is_available = Column(Boolean, default=True)
    room_id = Column(GUID, nullable=False)
    show_type_id = Column(GUID, nullable=False)