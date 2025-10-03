# backend/src/utils.py
from passlib.context import CryptContext

# Cria o contexto para hashing de senhas
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    """
    Recebe uma senha em texto plano e retorna o hash seguro.
    """
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verifica se a senha em texto plano corresponde ao hash armazenado.
    """
    return pwd_context.verify(plain_password, hashed_password)
