# timefocus/config/settings.py
from pathlib import Path

# Diretórios
BASE_DIR = Path(__file__).parent.parent.parent
SOUNDS_DIR = BASE_DIR / "timefocus" / "sounds"

# Configurações do Pomodoro
WORK_TIME = 25 * 60      # 25 minutos em segundos
SHORT_BREAK = 5 * 60     # 5 minutos
LONG_BREAK = 15 * 60     # 15 minutos
CYCLES_FOR_LONG_BREAK = 4
# Altere para True durante desenvolvimento
DEBUG_MODE = True
WORK_TIME = 5 if DEBUG_MODE else 25 * 60  # 5 segundos vs 25 minutos
# timefocus/config/settings.py
DEFAULT_WORK_TIME = 25 * 60      # 25 minutos
DEFAULT_SHORT_BREAK = 5 * 60    # 5 minutos
DEFAULT_LONG_BREAK = 15 * 60    # 15 minutos