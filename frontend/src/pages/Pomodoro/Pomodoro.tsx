import Header from "../../components/Header/Header";

export default function PomodoroPage() {
  return (
    <div className="pomodoro-page">
      <Header />

      <div className="pomodoro-content p-4">
        <h1 className="text-3xl font-bold">Pomodoro</h1>
        <p>Configure seu tempo de foco e acompanhe seus ciclos.</p>

        {/* Área do Timer */}
        <div className="timer-box">
          {/* Aqui entra o display do tempo */}
          <h2 className="text-4xl font-mono">25:00</h2>

          {/* Botões de controle */}
          <div className="controls space-x-2">
            <button>Iniciar</button>
            <button>Pausar</button>
            <button>Resetar</button>
          </div>
        </div>

        {/* Input para o usuário definir tempo */}
        <div className="time-config mt-4">
          <label>Definir tempo (minutos): </label>
          <input type="number" min="1" defaultValue={25} />
          <button>Sugerir tempo</button>
        </div>

        {/* Histórico */}
        <div className="history mt-6">
          <h3 className="text-xl font-semibold">Histórico de ciclos</h3>
          <ul>
            <li>25 min - Concluído ✅</li>
            <li>15 min - Concluído ✅</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
