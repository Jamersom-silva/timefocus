from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from ..database import get_db
from .. import models, schemas
from ..core.security import create_access_token, hash_password, verify_password

router = APIRouter(prefix="/auth", tags=["auth"])

# ----------------------------
# Registro de usuário
# ----------------------------
@router.post("/register", response_model=schemas.UserOut)
async def register(user: schemas.UserCreate, db: AsyncSession = Depends(get_db)):
    # Verifica se email já existe
    query = await db.execute(select(models.User).filter(models.User.email == user.email))
    existing = query.scalar()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Cria usuário com senha criptografada
    hashed_pwd = hash_password(user.password)
    new_user = models.User(name=user.username, email=user.email, hashed_password=hashed_pwd)
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return new_user

# ----------------------------
# Login de usuário
# ----------------------------
@router.post("/login")
async def login(user: schemas.UserLogin, db: AsyncSession = Depends(get_db)):
    query = await db.execute(select(models.User).filter(models.User.email == user.email))
    db_user = query.scalar()

    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    token = create_access_token({"sub": str(db_user.id)})  # o sub agora é o id do usuário
    return {"access_token": token, "token_type": "bearer"}
