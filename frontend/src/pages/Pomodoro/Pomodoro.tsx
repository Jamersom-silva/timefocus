// frontend/src/pages/Pomodoro/Pomodoro.tsx
import { useState, useEffect, useContext } from "react";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import { api } from "../../services/api";
import { UserContext } from "../../contexts/UserContext";
import type { PomodoroCycleOut, PomodoroCycleCreate } from "../../types/api";

export default function PomodoroPage() {
  const { user } = useContext(UserContext)!;
  const [cycles, setCycles] = useState<PomodoroCycleOut[]>([]);
  const [duration, setDuration] = useState(25); // duração padrão em minutos
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Buscar ciclos do usuário
  const fetchCycles = async () => {
    try {
      const data = await api.getPomodoroCycles();
      setCycles(data);
    } catch (err: any) {
      setError(err.detail || "Erro ao buscar ciclos");
    }
  };

  useEffect(() => {
    fetchCycles();
  }, []);

  // Criar novo ciclo
  const startCycle = async () => {
    setLoading(true);
    setError("");
    const newCycle: PomodoroCycleCreate = { duration };

    try {
      const created = await api.createPomodoroCycle(newCycle);
      setCycles((prev) => [created, ...prev]);
    } catch (err: any) {
      setError(err.detail || "Erro ao iniciar ciclo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 p-6 bg-gray-50 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">Pomodoro</h1>

        <div className="flex gap-2 mb-4">
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="border rounded p-2 w-20 text-center"
          />
          <span>minutos</span>
        </div>

        <Button variant="primary" size="lg" disabled={loading} onClick={startCycle}>
          {loading ? "Iniciando..." : "Iniciar Ciclo"}
        </Button>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <h2 className="text-2xl font-semibold mt-6 mb-2">Histórico de Ciclos</h2>
        <ul className="w-full max-w-md flex flex-col gap-2">
          {cycles.map((cycle) => (
            <li key={cycle.id} className="bg-white shadow p-3 rounded flex justify-between">
              <span>Duração: {cycle.duration} min</span>
              <span>{new Date(cycle.created_at).toLocaleString()}</span>
            </li>
          ))}
          {cycles.length === 0 && <li className="text-gray-500">Nenhum ciclo registrado ainda.</li>}
        </ul>
      </main>
    </div>
  );
}
