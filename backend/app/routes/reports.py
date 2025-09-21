# backend/app/routes/reports.py
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from ..database import get_db
from ..models import Report, User
from ..schemas import ReportCreate, ReportOut
from ..dependencies import get_current_user

router = APIRouter(prefix="/reports", tags=["reports"])

# Listar reports do usuário
@router.get("/", response_model=List[ReportOut])
async def get_reports(current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Report).filter(Report.user_id == current_user.id))
    reports = result.scalars().all()
    return reports

# Criar report
@router.post("/", response_model=ReportOut)
async def create_report(report: ReportCreate, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    new_report = Report(user_id=current_user.id, type=report.type, data=report.data)
    db.add(new_report)
    await db.commit()
    await db.refresh(new_report)
    return new_report
