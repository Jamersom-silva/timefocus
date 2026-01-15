from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func, cast, Date
from typing import List

from ..database import get_db
from ..models import Report, PomodoroCycle, User
from ..schemas import ReportCreate, ReportOut, DailyFocusReport
from ..core.security import get_current_user


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

@router.get("/focus/daily", response_model=List[DailyFocusReport])
async def daily_focus_report(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(
            cast(PomodoroCycle.start_time, Date).label("date"),
            func.sum(PomodoroCycle.real_duration).label("minutes"),
        )
        .where(
            PomodoroCycle.user_id == current_user.id,
            PomodoroCycle.status == "completed",
            PomodoroCycle.real_duration.isnot(None),
        )
        .group_by(cast(PomodoroCycle.start_time, Date))
        .order_by(cast(PomodoroCycle.start_time, Date).desc())
    )

    rows = result.all()

    return [
        {
            "date": row.date.isoformat(),
            "minutes": row.minutes,
        }
        for row in rows
    ]
