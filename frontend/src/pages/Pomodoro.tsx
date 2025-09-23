import { useState, useEffect, useContext, useCallback } from "react";
import Header from "../../components/Header";
import Button from "../../components/Button";
import { UserContext } from "../../contexts/UserContext";
import { api } from "../../services/api";
import type { PomodoroCycleOut } from "../../types/api";

export default function PomodoroPage() {
  const { user } = useContext(UserContext)!; // agora será usado
  const [cycles, setCycles] = useState<PomodoroCycleOut[]>([]);
  const [activeCycle, setActiveCycle] = useState<PomodoroCycleOut | null>(null);
  const [secondsLeft, setSecondsLeft] = useState<number>(0);

  // Função para buscar ciclos
  const fetchCycles = useCallback(async () => {
    try {
      const data = await api.getPomodoroCycles();
      setCycles(data);
    } catch (err) {
      console.error("Erro ao buscar ciclos:", err);
    }
  }, []);

  // Função para salvar ciclo
  const saveCycle = useCallback(async (cycle: PomodoroCycleOut) => {
    try {
      await api.createPomodoroCycle({ duration: cycle.duration });
      fetchCycles();
    } catch (err) {
      console.error("Erro ao salvar ciclo:", err);
    }
  }, [fetchCycles]);

  // Carregar ciclos ao montar
  useEffect(() => {
    fetchCycles();
  }, [fetchCycles]);

  // Contador
  useEffect(() => {
    if (!activeCycle) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeCycle]);

  const startCycle = (duration: number) => {
    const newCycle = { id: Date.now(), user_id: user?.id || 0, duration, start_time: new Date().toISOString(), end_time: null };
    setActiveCycle(newCycle);
    setSecondsLeft(duration * 60);
    saveCycle(newCycle);
  };

  const stopCycle = () => {
    setActiveCycle(null);
    setSecondsLeft(0);
  };

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="home-page min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 p-6 bg-gray-50 flex flex-col items-center">
        {user && <p className="mb-4 text-lg font-medium">Olá, {user.username}!</p>}

        <h1 className="text-3xl font-bold mb-2">Pomodoro</h1>
        <div className="text-2xl font-mono mb-4">{formatTime(secondsLeft)}</div>

        <div className="flex gap-4">
          <Button variant="primary" onClick={() => startCycle(25)}>Iniciar 25 min</Button>
          <Button variant="secondary" onClick={stopCycle}>Parar</Button>
        </div>

        <div className="mt-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2">Histórico de Ciclos</h2>
          <ul>
            {cycles.map((cycle) => (
              <li key={cycle.id} className="mb-1">
                Duração: {cycle.duration} min - Início: {new Date(cycle.start_time).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
