from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# =============================
# User Schemas
# =============================
class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: int

    class Config:
        orm_mode = True

# =============================
# PomodoroCycle Schemas
# =============================
class PomodoroCycleBase(BaseModel):
    duration: int  # minutos

class PomodoroCycleCreate(PomodoroCycleBase):
    pass

class PomodoroCycleOut(PomodoroCycleBase):
    id: int
    user_id: int
    completed_at: datetime

    class Config:
        orm_mode = True

# =============================
# Subject Schemas
# =============================
class SubjectBase(BaseModel):
    name: str

class SubjectCreate(SubjectBase):
    pass

class SubjectOut(SubjectBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True

# =============================
# Exercise Schemas
# =============================
class ExerciseBase(BaseModel):
    question: str
    answer: Optional[str] = None
    completed: Optional[bool] = False

class ExerciseCreate(ExerciseBase):
    subject_id: int

class ExerciseOut(ExerciseBase):
    id: int
    subject_id: int

    class Config:
        orm_mode = True

# =============================
# Report Schemas
# =============================
class ReportBase(BaseModel):
    content: str

class ReportCreate(ReportBase):
    user_id: int

class ReportOut(ReportBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        orm_mode = True
