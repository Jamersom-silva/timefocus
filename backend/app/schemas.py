from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional
from datetime import datetime

# =============================
# User Schemas
# =============================
class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOut(UserBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

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
    start_time: datetime
    end_time: datetime

    model_config = ConfigDict(from_attributes=True)

# =============================
# Subject Schemas
# =============================
class SubjectBase(BaseModel):
    name: str
    description: Optional[str] = None

class SubjectCreate(SubjectBase):
    pass

class SubjectOut(SubjectBase):
    id: int
    user_id: int

    model_config = ConfigDict(from_attributes=True)

# =============================
# Exercise Schemas
# =============================
class ExerciseBase(BaseModel):
    question: str
    answer: Optional[str] = None
    completed: bool = False
    ai_generated: bool = False

class ExerciseCreate(ExerciseBase):
    subject_id: int

class ExerciseOut(ExerciseBase):
    id: int
    user_id: int
    subject_id: int

    model_config = ConfigDict(from_attributes=True)

# =============================
# Report Schemas
# =============================
class ReportBase(BaseModel):
    type: str  # e.g., "pomodoro", "exercise", etc.
    data: str  # JSON string ou descrição resumida

class ReportCreate(ReportBase):
    user_id: int

class ReportOut(ReportBase):
    id: int
    user_id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
