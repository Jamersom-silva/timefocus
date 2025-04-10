# Adicione em interface/report.py
from rich.console import Console
from rich.table import Table
from fastapi import APIRouter, Depends, HTTPException
from datetime import datetime, timedelta
from collections import defaultdict
from typing import List
from ..interface.auth_api import verify_token
from timefocusBack.core.session import fake_db_sessions
router = APIRouter()

router = APIRouter()

# Simulando sessões do usuário (no lugar de um banco real)
sessions = [
    {"date": "2025-04-07", "duration": 25},
    {"date": "2025-04-07", "duration": 25},
    {"date": "2025-04-08", "duration": 50},
    {"date": "2025-04-09", "duration": 25},
    {"date": "2025-04-10", "duration": 25},
]

@router.get("/reports/daily")
def daily_report(user: dict = Depends(verify_token)):
    today = datetime.now().date().isoformat()
    total_today = sum(s["duration"] for s in fake_db_sessions if s["date"] == today)
    return {"date": today, "total_minutes": total_today}

@router.get("/reports/weekly")
def weekly_report(user: dict = Depends(verify_token)):
    today = datetime.now().date()
    last_7_days = [(today - timedelta(days=i)).isoformat() for i in range(7)]
    report = {d: 0 for d in last_7_days}
    for s in sessions:
        if s["date"] in report:
            report[s["date"]] += s["duration"]
    return report


def generate_report():
    console = Console()
    table = Table(title="Seu Desempenho")
    
    table.add_column("Data")
    table.add_column("Ciclos")
    table.add_column("Tempo Focado")
    
    # Adicione dados reais do histórico
    table.add_row("2023-10-01", "4", "1h40m")
    
    console.print(table)