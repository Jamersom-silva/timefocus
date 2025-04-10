from fastapi import APIRouter, Depends
from .auth import verify_token

router = APIRouter()

@router.get("/achievements")
def get_achievements(user: dict = Depends(verify_token)):
    # Pontuação baseada em tempo total: 1 ponto por 25 minutos
    sessions = [25, 25, 50, 25, 25]  # Exemplo (puxar do banco real depois)
    total_time = sum(sessions)
    points = total_time // 25

    # Conquistas básicas
    achievements = []
    if points >= 1:
        achievements.append("Primeira sessão!")
    if points >= 5:
        achievements.append("5 sessões concluídas!")
    if points >= 10:
        achievements.append("10 sessões de foco! 🧠")

    return {"points": points, "achievements": achievements}