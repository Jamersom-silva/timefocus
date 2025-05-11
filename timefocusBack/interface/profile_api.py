from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from core.auth import verify_token, get_db
from core.models import User
from core.session import Session as PomodoroSession

router = APIRouter()

@router.get("/profile")
def get_profile(token_data: dict = Depends(verify_token), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == token_data["sub"]).first()
    if not user:
        return {"error": "Usuário não encontrado"}

    sessions = db.query(PomodoroSession).filter(PomodoroSession.user_id == user.id).all()
    
    return {
        "username": user.username,
        "email": user.email,
        "total_sessions": len(sessions),
        "sessions": [
            {
                "id": s.id,
                "start_time": s.start_time,
                "end_time": s.end_time,
            }
            for s in sessions
        ]
    }
