from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_subjects():
    return ["Matemática", "História", "Inglês"]

@router.post("/")
def add_subject(name: str):
    return {"message": f"Assunto {name} adicionado"}
