from sqlalchemy import Column, Integer, String, DateTime, Boolean
from sqlalchemy.sql import func
from database import Base

class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    email = Column(String(100), unique=True)
    rol = Column(String(20), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class ResetPin(Base):
    __tablename__ = "reset_pins"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(100), nullable=False)
    pin = Column(String(6), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    expires_at = Column(DateTime(timezone=True), nullable=False)
    used = Column(Boolean, default=False, nullable=False) 