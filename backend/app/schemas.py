from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

# ----------------------------
# Usuário
# ----------------------------
class UserCreate(BaseModel):
    username: str  # alinhado com frontend
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr
    created_at: datetime

    class Config:
        orm_mode = True

# ----------------------------
# Token JWT
# ----------------------------
class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserOut

# ----------------------------
# Pomodoro
# ----------------------------
class PomodoroCycleCreate(BaseModel):
    duration: int  # minutos

class PomodoroCycleOut(BaseModel):
    id: int
    user_id: int
    duration: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

# ----------------------------
# Subjects
# ----------------------------
class SubjectCreate(BaseModel):
    name: str
    description: Optional[str] = None

class SubjectOut(BaseModel):
    id: int
    user_id: int
    name: str
    description: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

# ----------------------------
# Exercises
# ----------------------------
class ExerciseCreate(BaseModel):
    subject_id: int
    question: str
    answer: Optional[str] = None
    ai_generated: Optional[bool] = False

class ExerciseOut(BaseModel):
    id: int
    user_id: int
    subject_id: int
    question: str
    answer: Optional[str]
    ai_generated: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

# ----------------------------
# Reports
# ----------------------------
class ReportCreate(BaseModel):
    type: str
    data: str

class ReportOut(BaseModel):
    id: int
    user_id: int
    type: str
    data: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
