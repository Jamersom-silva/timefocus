# backend/app/init_db.py

from .database import engine, Base

def init_models():
    """
    Cria todas as tabelas do banco se não existirem.
    """
    Base.metadata.create_all(bind=engine)
    print("✅ Tables created successfully!")

if __name__ == "__main__":
    init_models()
