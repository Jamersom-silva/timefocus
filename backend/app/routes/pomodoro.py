# backend/app/routers/pomodoro.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from datetime import datetime
from typing import List, Optional

from ..database import get_db
from ..models import PomodoroCycle, User
from ..schemas import PomodoroCycleCreate, PomodoroCycleOut
from ..dependencies import get_current_user

router = APIRouter(prefix="/api/pomodoro", tags=["Pomodoro"])

# Criar novo ciclo
@router.post("/", response_model=PomodoroCycleOut)
async def create_cycle(
    cycle: PomodoroCycleCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Verifica se já existe ciclo ativo
    result = await db.execute(
        select(PomodoroCycle).where(
            PomodoroCycle.user_id == current_user.id,
            PomodoroCycle.status == "running"
        )
    )
    active_cycle = result.scalar_one_or_none()

    if active_cycle:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Já existe um Pomodoro em andamento"
        )

    new_cycle = PomodoroCycle(
        user_id=current_user.id,
        duration=cycle.duration,
        start_time=datetime.utcnow(),
        status="running"
    )

    db.add(new_cycle)
    await db.commit()
    await db.refresh(new_cycle)
    return new_cycle


# Listar histórico de ciclos do usuário
@router.get("/", response_model=List[PomodoroCycleOut])
async def list_cycles(
    db: AsyncSession = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    result = await db.execute(
        select(PomodoroCycle)
        .filter(PomodoroCycle.user_id == current_user.id)
        .order_by(PomodoroCycle.start_time.desc())
    )
    cycles = result.scalars().all()
    return cycles

# Atualizar ciclo (marcar como finalizado)
@router.patch("/{cycle_id}", response_model=PomodoroCycleOut)
async def update_cycle(
    cycle_id: int,
    ended: bool = True,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    result = await db.execute(
        select(PomodoroCycle).where(
            PomodoroCycle.id == cycle_id,
            PomodoroCycle.user_id == current_user.id
        )
    )
    cycle = result.scalar_one_or_none()

    if not cycle:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cycle not found"
        )

    if ended:
        cycle.end_time = datetime.utcnow()
        cycle.status = "completed"

        # calcula duração real em minutos
        delta = cycle.end_time - cycle.start_time
        cycle.real_duration = int(delta.total_seconds() / 60)
    else:
        cycle.end_time = None
        cycle.status = "canceled"
        cycle.real_duration = None

    await db.commit()
    await db.refresh(cycle)
    return cycle
