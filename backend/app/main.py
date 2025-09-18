# app/main.py
import asyncio
from fastapi import FastAPI
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy import Column, Integer, String, TIMESTAMP, func

# -----------------------------
# Configurações do Banco
# -----------------------------
DATABASE_URL = "postgresql+asyncpg://timefocus_user:134@127.0.0.1:5432/timefocus_db"

engine = create_async_engine(DATABASE_URL, echo=True)
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

Base = declarative_base()

# -----------------------------
# Modelos
# -----------------------------
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    hashed_password = Column(String, nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())

# -----------------------------
# App FastAPI
# -----------------------------
app = FastAPI(title="TimeFocus API")

# Evento startup: cria as tabelas
@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("Tabelas criadas (se não existiam).")

# Evento shutdown: fecha engine
@app.on_event("shutdown")
async def shutdown():
    await engine.dispose()
    print("Conexão com o banco encerrada.")

# Endpoint de teste
@app.get("/")
async def root():
    return {"message": "API TimeFocus está funcionando!"}

# -----------------------------
# Para rodar direto com python main.py
# -----------------------------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
