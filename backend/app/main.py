from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import models, database
from .routes import users, auth, protected

# Cria as tabelas no banco (se não existirem)
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="TimeFocus API")

# Configuração CORS
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # quem pode acessar
    allow_credentials=True,
    allow_methods=["*"],     # GET, POST, PUT, DELETE...
    allow_headers=["*"],     # headers permitidos
)

# Incluir rotas
app.include_router(users.router)
app.include_router(auth.router)
app.include_router(protected.router)

@app.get("/")
def root():
    return {"message": "API TimeFocus funcionando 🚀"}
