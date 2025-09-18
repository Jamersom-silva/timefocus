from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base

# Conexão com PostgreSQL
DATABASE_URL = "postgresql+asyncpg://timefocus_user:134@localhost:5432/timefocus_db"

engine = create_async_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
Base = declarative_base()

# Dependency para usar nas rotas
async def get_db():
    async with SessionLocal() as session:
        yield session
