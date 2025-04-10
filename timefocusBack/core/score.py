from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel

router = APIRouter(prefix="/score", tags=["Pontuação"])

# Simulação de banco de dados em memória
fake_user_scores = {}

class ScoreInput(BaseModel):
    username: str
    points: int

@router.post("/")
def add_score(score: ScoreInput):
    if score.username in fake_user_scores:
        fake_user_scores[score.username] += score.points
    else:
        fake_user_scores[score.username] = score.points
    return {"message": "Pontuação atualizada", "total": fake_user_scores[score.username]}

@router.get("/{username}")
def get_score(username: str):
    score = fake_user_scores.get(username)
    if score is None:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return {"username": username, "score": score}
