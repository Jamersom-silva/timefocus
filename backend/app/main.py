from fastapi import FastAPI
from . import models, database
from .routes import users, auth, protected

# Cria as tabelas no banco (se não existirem)
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="TimeFocus API")

# Incluir rotas
app.include_router(users.router)
app.include_router(auth.router)
app.include_router(protected.router)

@app.get("/")
def root():
    return {"message": "API TimeFocus funcionando 🚀"}
