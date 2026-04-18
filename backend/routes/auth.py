from typing import Optional
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/profile", tags=["profile"])

class Profile(BaseModel):
    username: str
    role: str
    full_name: str

class ProfileUpdate(BaseModel):
    role: Optional[str] = None
    full_name: Optional[str] = None

PROFILE_DATA = {
    "username": "admin",
    "role": "Administrador",
    "full_name": "Administrador do Sistema"
}

@router.get("/", response_model=Profile)
def get_profile():
    return PROFILE_DATA

@router.put("/", response_model=Profile)
def update_profile(profile: ProfileUpdate):
    if profile.role is not None:
        PROFILE_DATA["role"] = profile.role
    if profile.full_name is not None:
        PROFILE_DATA["full_name"] = profile.full_name
    return PROFILE_DATA
