# backend/src/routes/auth.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .. import models, schemas, database, auth

router = APIRouter(prefix="/auth", tags=["auth"])

# ----------------------------
# Registro de usuário
# ----------------------------
@router.post("/register", response_model=schemas.UserOut)
def register(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    # Verifica se email já existe
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email já registrado")

    # Cria usuário com senha criptografada
    hashed_pw = auth.get_password_hash(user.password)
    new_user = models.User(
        name=user.username,  # alinhado com frontend
        email=user.email,
        hashed_password=hashed_pw
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return schemas.UserOut(
        id=new_user.id,
        username=new_user.name,
        email=new_user.email,
        created_at=new_user.created_at
    )

# ----------------------------
# Login de usuário
# ----------------------------
@router.post("/login", response_model=schemas.Token)
def login(user: schemas.UserLogin, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or not auth.verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credenciais inválidas")

    token = auth.create_access_token(data={"sub": str(db_user.id)})

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
