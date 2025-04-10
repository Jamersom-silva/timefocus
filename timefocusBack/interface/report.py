# Adicione em interface/report.py
from rich.console import Console
from rich.table import Table
from ..interface.auth_api import verify_token
from ..core.auth import verify_token

def generate_report():
    console = Console()
    table = Table(title="Seu Desempenho")
    
    table.add_column("Data")
    table.add_column("Ciclos")
    table.add_column("Tempo Focado")
    
    # Adicione dados reais do histórico
    table.add_row("2023-10-01", "4", "1h40m")
    
    console.print(table)