# timefocus/core/timer.py
import time
from datetime import datetime, timedelta
from pathlib import Path
from plyer import notification
from playsound import playsound
from timefocusBack.config.settings import *

# timefocus/core/timer.py
from timefocusBack.config.settings import (
    DEFAULT_WORK_TIME, 
    DEFAULT_SHORT_BREAK, 
    DEFAULT_LONG_BREAK,
    CYCLES_FOR_LONG_BREAK
)

class PomodoroTimer:
    def __init__(self, work_time=None, short_break=None, long_break=None):
        self.cycle_count = 0
        self.is_running = False
        self.work_time = work_time or DEFAULT_WORK_TIME
        self.short_break = short_break or DEFAULT_SHORT_BREAK
        self.long_break = long_break or DEFAULT_LONG_BREAK
    
    def show_countdown(self, seconds):
        """Mostra contagem regressiva com barra de progresso"""
        total_seconds = seconds
        while seconds and self.is_running:
            mins, secs = divmod(seconds, 60)
            progress = int(50 * (total_seconds - seconds) / total_seconds)
            bar = "█" * progress + "-" * (50 - progress)
            timer_str = f"\r🍅 {mins:02d}:{secs:02d} |{bar}| {progress*2}%"
            print(timer_str, end="", flush=True)
            time.sleep(1)
            seconds -= 1
        
        print("\r" + " " * 70 + "\r", end="")  # Limpa a linha

    def notify(self, title, message, sound_file):
        """Mostra notificação e toca som"""
        try:
            sound_path = SOUNDS_DIR / sound_file
            playsound(str(sound_path))
        except Exception as e:
            print(f"\n🔊 Erro no som: {e}")
        
        notification.notify(
            title=title,
            message=message,
            timeout=10
        )
    
    def start_work(self):
        """Inicia período de trabalho"""
        self.cycle_count += 1
        self.is_running = True
        print(f"\n🍅 Ciclo {self.cycle_count} - Trabalhe por {self.work_time//60} minutos")
        self.show_countdown(WORK_TIME)
        if self.is_running:
            self.notify("TimeFocus", "Hora da pausa!", "work_end.wav")
    
    def start_break(self):
        """Inicia período de pausa"""
        if self.cycle_count % CYCLES_FOR_LONG_BREAK == 0:
            duration = LONG_BREAK
            print(f"\n🌴 Pausa longa de {duration//60} minutos!")
        else:
            duration = SHORT_BREAK
            print(f"\n☕ Pausa curta de {duration//60} minutos!")
        
        self.show_countdown(duration)
        if self.is_running:
            self.notify("TimeFocus", "Volte ao trabalho!", "break_end.wav")
    
    def stop(self):
        """Para o timer"""
        self.is_running = False

    