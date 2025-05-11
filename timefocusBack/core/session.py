from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import List
from datetime import datetime, timedelta  # Importando timedelta
from timefocusBack.interface.auth_api import verify_token
from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from .models import Base

# Banco de dados simulado
fake_db_sessions = []

# Definição do modelo SQLAlchemy para Sessões
class SessionModel(Base):
    __tablename__ = "sessions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    start_time = Column(DateTime, default=datetime.utcnow)
    end_time = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="sessions")


# Definição do modelo Pydantic para validação de entrada e saída
class Session(BaseModel):
    date: str
    duration: int

    # Converter a data para o formato datetime
    def to_utc(self):
        return datetime.strptime(self.date, "%Y-%m-%dT%H:%M:%S")

    # Para retorno, é interessante enviar a data como string
    def to_dict(self):
        return {
            "date": self.date,
            "duration": self.duration
        }


# Definição do APIRouter
router = APIRouter()


@router.post("/sessions", response_model=Session)
def create_session(session: Session, user: dict = Depends(verify_token)):
    """
    Cria uma nova sessão para o usuário autenticado.
    """
    # Convertendo o horário para datetime
    start_time = session.to_utc()

    # Simulando o armazenamento da sessão no banco de dados
    fake_db_sessions.append({
        "start_time": start_time,
        "end_time": start_time + timedelta(minutes=session.duration),  # Usando timedelta
        "user_id": user["id"],
    })

    return session


@router.get("/sessions", response_model=List[Session])
def get_sessions(user: dict = Depends(verify_token)):
    """
    Retorna todas as sessões do usuário autenticado.
    """
    return [session.to_dict() for session in fake_db_sessions]
