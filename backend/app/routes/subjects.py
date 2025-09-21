# backend/app/routes/subjects.py
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from ..database import get_db
from ..models import Subject, User
from ..schemas import SubjectCreate, SubjectOut
from ..dependencies import get_current_user

router = APIRouter(prefix="/subjects", tags=["subjects"])

# Listar subjects do usuário
@router.get("/", response_model=List[SubjectOut])
async def get_subjects(current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Subject).filter(Subject.user_id == current_user.id))
    subjects = result.scalars().all()
    return subjects

# Criar novo subject
@router.post("/", response_model=SubjectOut)
async def create_subject(subject: SubjectCreate, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    new_subject = Subject(user_id=current_user.id, name=subject.name, description=subject.description)
    db.add(new_subject)
    await db.commit()
    await db.refresh(new_subject)
    return new_subject
