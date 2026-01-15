from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from datetime import datetime
from fastapi.security import OAuth2PasswordBearer

from ..database import get_db
from .. import models, schemas
from ..core.security import create_access_token, hash_password, verify_password, get_current_user

router = APIRouter(prefix="/auth", tags=["auth"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# ----------------------------
# Registro de usuário
# ----------------------------
@router.post(
    "/register",
    response_model=schemas.Token,
    status_code=status.HTTP_201_CREATED
)

async def register(user: schemas.UserCreate, db: AsyncSession = Depends(get_db)):
    query = await db.execute(select(models.User).filter(models.User.email == user.email))
db_user = query.scalar_one_or_none()

    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_pwd = hash_password(user.password)
    new_user = models.User(
        name=user.username,
        email=user.email,
        hashed_password=hashed_pwd,
        created_at=datetime.utcnow()
    )
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)

    token = create_access_token({"sub": str(new_user.id)})

    return schemas.Token(
        access_token=token,
        token_type="bearer",
        user=schemas.UserOut(
            id=new_user.id,
            username=new_user.name,
            email=new_user.email,
            created_at=new_user.created_at
        )
    )

# ----------------------------
# Login de usuário
# ----------------------------
@router.post("/login", response_model=schemas.Token)
async def login(user: schemas.UserLogin, db: AsyncSession = Depends(get_db)):
    query = await db.execute(select(models.User).filter(models.User.email == user.email))
existing = query.scalar_one_or_none()


    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    token = create_access_token({"sub": str(db_user.id)})

    return schemas.Token(
        access_token=token,
        token_type="bearer",
        user=schemas.UserOut(
            id=db_user.id,
            username=db_user.name,
            email=db_user.email,
            created_at=db_user.created_at
        )
    )

# ----------------------------
# Retornar usuário atual
# ----------------------------
@router.get("/me", response_model=schemas.UserOut)
async def get_current_user_route(
    current_user: models.User = Depends(get_current_user),
):
    return schemas.UserOut(
        id=current_user.id,
        username=current_user.name,
        email=current_user.email,
        created_at=current_user.created_at
    )
