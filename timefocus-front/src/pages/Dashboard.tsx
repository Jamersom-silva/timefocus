import { useEffect, useRef, useState } from "react";

const Dashboard = () => {
  const [seconds, setSeconds] = useState(25 * 60); // 25 minutos
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Controla o ciclo do timer
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => Math.max(prev - 1, 0));
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(25 * 60);
  };

  const formatTime = (s: number) => {
    const minutes = Math.floor(s / 60).toString().padStart(2, "0");
    const secs = (s % 60).toString().padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Pomodoro Timer */}
      <div className="flex flex-col items-center justify-center bg-white shadow rounded-2xl p-6 max-w-sm mx-auto">
        <span className="text-5xl font-mono mb-4">{formatTime(seconds)}</span>
        <div className="flex gap-3">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
            onClick={() => setIsRunning(true)}
          >
            Iniciar
          </button>
          <button
            className="bg-yellow-400 text-white px-4 py-2 rounded-xl hover:bg-yellow-500 transition"
            onClick={() => setIsRunning(false)}
          >
            Pausar
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
            onClick={resetTimer}
          >
            Resetar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
