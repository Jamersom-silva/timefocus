from fastapi import APIRouter, HTTPException
from timefocusBack.core.auth import create_access_token

router = APIRouter()

users = {}

@router.post("/register")
def register(username: str, password: str):
    if username in users:
        raise HTTPException(status_code=400, detail="Usuário já existe")
    users[username] = password
    return {"msg": "Usuário registrado com sucesso"}

@router.post("/login")
def login(username: str, password: str):
    if users.get(username) != password:
        raise HTTPException(status_code=401, detail="Credenciais inválidas")
    token = create_access_token({"sub": username})
    return {"access_token": token}
