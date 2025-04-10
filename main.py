from timefocusBack.interface.cli import main
import os

def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

    
if __name__ == "__main__":
    main()