from fastapi import APIRouter

router = APIRouter()

@router.post("/register")
def register_user(username: str, email: str):
    return {"message": "Usuário registrado com sucesso", "username": username, "email": email}

@router.post("/login")
def login_user(username: str):
    return {"message": "Login realizado", "token": "fake-jwt-token", "username": username}
