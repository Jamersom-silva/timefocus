# timefocus/interface/cli.py
import argparse
import signal
import sys
from timefocusBack.core.timer import PomodoroTimer

def parse_args():
    """Configura os argumentos de linha de comando"""
    parser = argparse.ArgumentParser(
        description="⏰ TimeFocus - Pomodoro Timer Customizável",
        formatter_class=argparse.RawTextHelpFormatter
    )
    
    # Argumentos principais
    parser.add_argument("-c", "--cycles", type=int, default=4,
                      help="Número de ciclos (padrão: 4)")
    
    # Tempos customizáveis (em minutos)
    parser.add_argument("-w", "--work", type=int,
                      help="Tempo de trabalho em minutos (padrão: 25)")
    parser.add_argument("-s", "--short", type=int,
                      help="Tempo de pausa curta em minutos (padrão: 5)")
    parser.add_argument("-l", "--long", type=int,
                      help="Tempo de pausa longa em minutos (padrão: 15)")
    
    # Modo verboso
    parser.add_argument("-v", "--verbose", action="store_true",
                      help="Mostra informações detalhadas")
    
    return parser.parse_args()

def validate_args(args):
    """Valida os argumentos fornecidos"""
    if args.work and args.work < 1:
        print("❌ Erro: Tempo de trabalho deve ser ≥1 minuto")
        sys.exit(1)
    if args.short and args.short < 1:
        print("❌ Erro: Pausa curta deve ser ≥1 minuto")
        sys.exit(1)
    if args.long and args.long < 1:
        print("❌ Erro: Pausa longa deve ser ≥1 minuto")
        sys.exit(1)
    if args.cycles < 1:
        print("❌ Erro: Número de ciclos deve ser ≥1")
        sys.exit(1)

def print_settings(args, work_time, short_break, long_break):
    """Mostra as configurações atuais"""
    print("\n⚙️ Configuração Atual:")
    print(f"• Trabalho: {work_time//60} min")
    print(f"• Pausa Curta: {short_break//60} min")
    print(f"• Pausa Longa: {long_break//60} min")
    print(f"• Ciclos: {args.cycles}")
    print("\nPressione Ctrl+C para parar\n")

def handle_interrupt(signum, frame):
    """Lida com a interrupção do usuário"""
    print("\n⏹ Timer interrompido pelo usuário")
    sys.exit(0)

def main():
    # Configura o tratamento de interrupção
    signal.signal(signal.SIGINT, handle_interrupt)
    
    # Parseia argumentos
    args = parse_args()
    validate_args(args)
    
    # Converte minutos para segundos
    work_time = (args.work or 25) * 60
    short_break = (args.short or 5) * 60
    long_break = (args.long or 15) * 60
    
    # Mostra configurações
    print("\n⏰ TimeFocus - Técnica Pomodoro")
    print_settings(args, work_time, short_break, long_break)
    
    # Inicia o timer
    timer = PomodoroTimer(
        work_time=work_time,
        short_break=short_break,
        long_break=long_break
    )
    
    # Executa os ciclos
    try:
        for cycle in range(1, args.cycles + 1):
            if args.verbose:
                print(f"\n🔁 Iniciando Ciclo {cycle}/{args.cycles}")
            timer.start_work()
            timer.start_break()
        
        print("\n✅ Todos os ciclos completados com sucesso!")
        
    except Exception as e:
        print(f"\n❌ Erro durante a execução: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main()