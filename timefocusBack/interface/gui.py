import tkinter as tk

def start_gui():
    root = tk.Tk()
    root.title("TimeFocus - GUI")
    label = tk.Label(root, text="Bem-vindo ao TimeFocus!")
    label.pack(padx=20, pady=20)
    root.mainloop()

if __name__ == "__main__":
    start_gui()
