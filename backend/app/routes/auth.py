from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.exc import IntegrityError
from passlib.context import CryptContext

from ..database import get_db
from .. import models, schemas
from ..core.security import create_access_token

router = APIRouter(prefix="/auth", tags=["auth"])
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# =============================
# Register
# =============================
@router.post("/register", response_model=schemas.UserOut, status_code=status.HTTP_201_CREATED)
async def register(user: schemas.UserCreate, db: AsyncSession = Depends(get_db)):
    try:
        hashed_password = pwd_context.hash(user.password)
        new_user = models.User(
            name=user.name,
            email=user.email,
            hashed_password=hashed_password
        )
        db.add(new_user)
        await db.commit()
        await db.refresh(new_user)
        return new_user
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Email already registered")


# =============================
# Login
# =============================
@router.post("/login", response_model=schemas.Token)
async def login(user: schemas.UserLogin, db: AsyncSession = Depends(get_db)):
    query = await db.execute(select(models.User).filter(models.User.email == user.email))
    db_user = query.scalar()
    if not db_user or not pwd_context.verify(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_access_token({"sub": str(db_user.id)})
    return {"access_token": token, "token_type": "bearer"}
