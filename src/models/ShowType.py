from database.postgres_db import Base
from sqlalchemy import Column, String
from fastapi_utils.guid_type import GUID, GUID_SERVER_DEFAULT_POSTGRESQL

class ShowType(Base):
    __tablename__ = 'show_type'
    id = Column(GUID, primary_key=True, server_default=GUID_SERVER_DEFAULT_POSTGRESQL)
    name = Column(String, nullable=False, unique=True)