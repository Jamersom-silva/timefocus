# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import auth
from . import models, database

app = FastAPI(title="TimeFocus API")

# CORS
origins = ["http://localhost:5173", "http://127.0.0.1:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluindo rotas
app.include_router(auth.router)

@app.get("/")
def root():
    return {"message": "API TimeFocus funcionando 🚀"}

# Cria as tabelas no startup (opcional)
@app.on_event("startup")
async def startup_event():
    async with database.engine.begin() as conn:
        await conn.run_sync(models.Base.metadata.create_all)
