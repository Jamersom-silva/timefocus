from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_home():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "TimeFocus API online"}

def test_daily_report_unauthorized():
    response = client.get("/reports/daily")
    assert response.status_code == 401
