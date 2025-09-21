# backend/app/routers/pomodoro.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from datetime import datetime
from typing import List

from ..database import get_db
from ..models import PomodoroCycle, User
from ..schemas import PomodoroCycleCreate, PomodoroCycleOut
from ..dependencies import get_current_user

router = APIRouter(prefix="/api/pomodoro", tags=["Pomodoro"])

# Criar novo ciclo
@router.post("/", response_model=PomodoroCycleOut)
async def create_cycle(cycle: PomodoroCycleCreate, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    new_cycle = PomodoroCycle(user_id=current_user.id, duration=cycle.duration, created_at=datetime.utcnow())
    db.add(new_cycle)
    await db.commit()
    await db.refresh(new_cycle)
    return new_cycle

# Listar histórico de ciclos do usuário
@router.get("/", response_model=List[PomodoroCycleOut])
async def list_cycles(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(PomodoroCycle).filter(PomodoroCycle.user_id == current_user.id))
    cycles = result.scalars().all()
    return cycles

# Atualizar ciclo (pausar/reset)
@router.patch("/{cycle_id}", response_model=PomodoroCycleOut)
async def update_cycle(cycle_id: int, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(PomodoroCycle).filter(PomodoroCycle.id == cycle_id, PomodoroCycle.user_id == current_user.id))
    cycle = result.scalar()
    if not cycle:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cycle not found")
    
    # Aqui você define a lógica de pausa ou reset
    cycle.updated_at = datetime.utcnow()
    await db.commit()
    await db.refresh(cycle)
    return cycle
