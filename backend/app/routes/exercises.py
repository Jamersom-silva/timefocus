from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def list_exercises():
    return [
        {"id": 1, "question": "2+2?", "answer": "4"},
        {"id": 2, "question": "Capital do Brasil?", "answer": "Brasília"}
    ]

@router.post("/complete/{exercise_id}")
def complete_exercise(exercise_id: int):
    return {"message": f"Exercício {exercise_id} concluído!"}
