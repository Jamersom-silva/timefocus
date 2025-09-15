from fastapi import FastAPI
from app.routes import auth, pomodoro, subjects, exercises, reports

app = FastAPI(title="TimeFocus API", version="1.0")

# Rotas
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(pomodoro.router, prefix="/pomodoro", tags=["Pomodoro"])
app.include_router(subjects.router, prefix="/subjects", tags=["Subjects"])
app.include_router(exercises.router, prefix="/exercises", tags=["Exercises"])
app.include_router(reports.router, prefix="/reports", tags=["Reports"])

@app.get("/")
def root():
    return {"message": "🚀 TimeFocus API rodando!"}
