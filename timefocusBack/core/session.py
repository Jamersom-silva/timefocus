from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import List
from datetime import datetime
from timefocusBack.interface.auth_api import verify_token

router = APIRouter()

# Simulando um banco de dados em memória
fake_db_sessions = []

class Session(BaseModel):
    date: str
    duration: int

@router.post("/sessions", response_model=Session)
def create_session(session: Session, user: dict = Depends(verify_token)):
    fake_db_sessions.append(session.dict())
    return session

@router.get("/sessions", response_model=List[Session])
def get_sessions(user: dict = Depends(verify_token)):
    return fake_db_sessions
