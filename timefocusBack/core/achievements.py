from fastapi import APIRouter, Depends
from .auth import verify_token
from timefocusBack.core.session import fake_db_sessions  # importar a lista simulada
router = APIRouter()


@router.get("/achievements")
def get_achievements(user: dict = Depends(verify_token)):
    sessions = fake_db_sessions  # usa dados reais agora
    total_time = sum(s["duration"] for s in sessions)
    points = total_time // 25

    achievements = []
    if points >= 1:
        achievements.append("Primeira sessão!")
    if points >= 5:
        achievements.append("5 sessões concluídas! 🎯")
    if points >= 10:
        achievements.append("10 sessões de foco! 🧠")

    return {"points": points, "achievements": achievements}

