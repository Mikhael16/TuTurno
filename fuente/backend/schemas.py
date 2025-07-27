from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UsuarioBase(BaseModel):
    username: str
    email: str
    rol: str

class UsuarioCreate(UsuarioBase):
    password: str

class UsuarioCreateAdmin(BaseModel):
    username: str
    email: str
    password: str
    confirm_password: str

class UsuarioUpdate(BaseModel):
    email: str
    current_password: str
    new_password: Optional[str] = None
    confirm_new_password: Optional[str] = None

class ResetPasswordRequest(BaseModel):
    email: str

class ValidatePinRequest(BaseModel):
    email: str
    pin: str

class ResetPasswordWithPin(BaseModel):
    email: str
    pin: str
    new_password: str
    confirm_password: str

class Usuario(UsuarioBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None 