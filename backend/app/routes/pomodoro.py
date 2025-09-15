from fastapi import APIRouter

router = APIRouter()

@router.get("/history")
def get_pomodoro_history():
    return [
        {"id": 1, "duration": 25, "status": "concluído"},
        {"id": 2, "duration": 15, "status": "pausado"}
    ]

@router.post("/start")
def start_pomodoro(duration: int):
    return {"message": f"Pomodoro iniciado por {duration} minutos"}
