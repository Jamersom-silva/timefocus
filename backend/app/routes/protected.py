from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from ..database import get_db
from ..models import User, PomodoroCycle, Subject, Exercise
from ..schemas import (
    UserOut, 
    PomodoroCycleOut, PomodoroCycleCreate, 
    SubjectOut, SubjectCreate, 
    ExerciseOut, ExerciseCreate
)
from ..core.security import get_current_user

router = APIRouter(prefix="/api", tags=["protected"])

# ----------------------------
# Users
# ----------------------------
@router.get("/users/me", response_model=UserOut)
async def read_current_user(current_user: User = Depends(get_current_user)):
    return current_user

# ----------------------------
# Pomodoro Cycles
# ----------------------------
@router.post("/pomodoro", response_model=PomodoroCycleOut)
async def create_pomodoro(
    pomodoro: PomodoroCycleCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    new_cycle = PomodoroCycle(user_id=current_user.id, duration=pomodoro.duration)
    db.add(new_cycle)
    await db.commit()
    await db.refresh(new_cycle)
    return new_cycle

@router.get("/pomodoro", response_model=List[PomodoroCycleOut])
async def get_pomodoros(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(PomodoroCycle).filter(PomodoroCycle.user_id == current_user.id)
    )
    return result.scalars().all()

# ----------------------------
# Subjects
# ----------------------------
@router.post("/subjects", response_model=SubjectOut)
async def create_subject(
    subject: SubjectCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    new_subject = Subject(
        name=subject.name, 
        description=subject.description, 
        user_id=current_user.id
    )
    db.add(new_subject)
    await db.commit()
    await db.refresh(new_subject)
    return new_subject

@router.get("/subjects", response_model=List[SubjectOut])
async def get_subjects(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Subject).filter(Subject.user_id == current_user.id)
    )
    return result.scalars().all()

# ----------------------------
# Exercises
# ----------------------------
@router.post("/exercises", response_model=ExerciseOut)
async def create_exercise(
    exercise: ExerciseCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    new_exercise = Exercise(
        user_id=current_user.id,
        subject_id=exercise.subject_id,
        question=exercise.question,
        answer=exercise.answer,
        ai_generated=exercise.ai_generated,
    )
    db.add(new_exercise)
    await db.commit()
    await db.refresh(new_exercise)
    return new_exercise

@router.get("/exercises", response_model=List[ExerciseOut])
async def get_exercises(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Exercise).filter(Exercise.user_id == current_user.id)
    )
    return result.scalars().all()
