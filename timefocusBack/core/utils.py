# Adicione em core/utils.py
import json
from pathlib import Path

def save_session(data):
    history_file = Path.home() / ".timefocus_history.json"
    try:
        with open(history_file, 'a+') as f:
            f.seek(0)
            history = json.load(f) if f.read() else []
            history.append(data)
            f.seek(0)
            json.dump(history, f)
    except:
        with open(history_file, 'w') as f:
            json.dump([data], f)