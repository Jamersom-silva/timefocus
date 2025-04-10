from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from timefocusBack.core.report import router as report_router
from timefocusBack.core.achievements import router as achievements_router

app = FastAPI()

# Configuração do CORS
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

@app.get("/")
async def root():
    return {"message": "TimeFocus API online 🚀"}
