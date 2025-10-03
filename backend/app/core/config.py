# backend/src/core/config.py
import os
from dotenv import load_dotenv
from pathlib import Path

# Carrega variáveis do arquivo .env
BASE_DIR = Path(__file__).resolve().parent.parent.parent  # ajusta caminho conforme estrutura
load_dotenv(BASE_DIR / ".env")

# ----------------------------
# Banco de dados
# ----------------------------
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:1234@localhost:5432/timefocus_db")

# ----------------------------
# JWT
# ----------------------------
SECRET_KEY = os.getenv("SECRET_KEY", "sua_chave_supersecreta")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 60))

# ----------------------------
# CORS
# ----------------------------
FRONTEND_URLS = os.getenv("FRONTEND_URLS", "http://localhost:5173,http://127.0.0.1:5173").split(",")

# ----------------------------
# Outros parâmetros
# ----------------------------
DEBUG = os.getenv("DEBUG", "True").lower() in ("true", "1", "t")
