# backend/app/routes/exercises.py
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from ..database import get_db
from ..models import Exercise, User
from ..schemas import ExerciseCreate, ExerciseOut
from ..dependencies import get_current_user

router = APIRouter(prefix="/exercises", tags=["exercises"])

# Listar exercícios do usuário
@router.get("/", response_model=List[ExerciseOut])
async def get_exercises(current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Exercise).filter(Exercise.user_id == current_user.id))
    exercises = result.scalars().all()
    return exercises

# Criar exercício
@router.post("/", response_model=ExerciseOut)
async def create_exercise(exercise: ExerciseCreate, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    new_exercise = Exercise(
        user_id=current_user.id,
        subject_id=exercise.subject_id,
        question=exercise.question,
        answer=exercise.answer,
        ai_generated=exercise.ai_generated or False
    )
    db.add(new_exercise)
    await db.commit()
    await db.refresh(new_exercise)
    return new_exercise
