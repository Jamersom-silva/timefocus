from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from timefocusBack.core.report import router as report_router
from timefocusBack.core.achievements import router as achievements_router
from timefocusBack.core import score
from timefocusBack.core.session import router as session_router
from core import models
from core.auth import engine
from core.database import init_db
from interface import auth_api
from interface import profile_api
# Inicializando o banco de dados
init_db()
models.Base.metadata.create_all(bind=engine)

# Criando o app FastAPI
app = FastAPI()

app.include_router(auth_api.router)
app.include_router(profile_api.router)
# Configuração do CORS (Cross-Origin Resource Sharing)
origins = [
    "http://localhost:5173",  # Origem do frontend durante o desenvolvimento
    # Adicione outras origens conforme necessário
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Especifica as origens permitidas
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos HTTP
    allow_headers=["*"],  # Permite todos os cabeçalhos
)

# Incluindo os routers das diferentes partes do aplicativo
app.include_router(report_router)
app.include_router(achievements_router)
app.include_router(score.router)
app.include_router(session_router)

@app.get("/")
async def root():
    return {"message": "TimeFocus API online 🚀"}
