from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from .. import models
from ..database import get_db
from ..schemas import (
    UserOut,
    PomodoroCycleOut, PomodoroCycleCreate,
    SubjectOut, SubjectCreate,
    ExerciseOut, ExerciseCreate,
    ReportOut, ReportCreate
)
from ..core.security import get_current_user

router = APIRouter(prefix="/api", tags=["protected"])

# ----------------------------
# Reports
# ----------------------------
@router.post("/reports", response_model=ReportOut)
async def create_report(
    report: ReportCreate,
    db: AsyncSession = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    new_report = models.Report(
        user_id=current_user.id,
        type=report.type,
        data=report.data
    )
    db.add(new_report)
    await db.commit()
    await db.refresh(new_report)
    return new_report

@router.get("/reports", response_model=List[ReportOut])
async def get_reports(
    db: AsyncSession = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    result = await db.execute(
        select(models.Report).filter(models.Report.user_id == current_user.id)
    )
    return result.scalars().all()

# ----------------------------
# Users
# ----------------------------
@router.get("/users/me", response_model=UserOut)
async def read_current_user(current_user: models.User = Depends(get_current_user)):
    return current_user

# ----------------------------
# Pomodoro Cycles
# ----------------------------
@router.post("/pomodoro", response_model=PomodoroCycleOut)
async def create_pomodoro(
    pomodoro: PomodoroCycleCreate,
    db: AsyncSession = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    new_cycle = models.PomodoroCycle(user_id=current_user.id, duration=pomodoro.duration)
    db.add(new_cycle)
    await db.commit()
    await db.refresh(new_cycle)
    return new_cycle

@router.get("/pomodoro", response_model=List[PomodoroCycleOut])
async def get_pomodoros(
    db: AsyncSession = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    result = await db.execute(
        select(models.PomodoroCycle).filter(models.PomodoroCycle.user_id == current_user.id)
    )
    return result.scalars().all()

# ----------------------------
# Subjects
# ----------------------------
@router.post("/subjects", response_model=SubjectOut)
async def create_subject(
    subject: SubjectCreate,
    db: AsyncSession = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    new_subject = models.Subject(
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
    current_user: models.User = Depends(get_current_user),
):
    result = await db.execute(
        select(models.Subject).filter(models.Subject.user_id == current_user.id)
    )
    return result.scalars().all()

# ----------------------------
# Exercises
# ----------------------------
@router.post("/exercises", response_model=ExerciseOut)
async def create_exercise(
    exercise: ExerciseCreate,
    db: AsyncSession = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    new_exercise = models.Exercise(
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
    current_user: models.User = Depends(get_current_user),
):
    result = await db.execute(
        select(models.Exercise).filter(models.Exercise.user_id == current_user.id)
    )
    return result.scalars().all()
