from fastapi import FastAPI

app = FastAPI(title="TimeFocus API", version="1.0")

@app.get("/")
def read_root():
    return {"message": "🚀 TimeFocus API rodando com FastAPI"}
