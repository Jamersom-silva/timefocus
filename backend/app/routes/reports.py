from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_reports():
    return {
        "pomodoros": 10,
        "tempo_focado": "5h 20m",
        "assuntos": ["Matemática", "História"]
    }
