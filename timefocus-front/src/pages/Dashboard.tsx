import { useEffect, useRef, useState } from "react";
import StudyTopicForm from "../components/StudyTopicForm";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"; // Mantendo apenas o necessário

interface Session {
  topic: string;
  duration: number; // em segundos
  date: string;
}

const Dashboard = () => {
  const [seconds, setSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [topic, setTopic] = useState("");
  const [sessions, setSessions] = useState<Session[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer Pomodoro
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            saveSession(); // salva ao terminar
            return 0;
          }
          return prev - 1;
        });
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
    setTopic("");
  };

  const saveSession = () => {
    const newSession: Session = {
      topic,
      duration: 25 * 60,
      date: new Date().toISOString(),
    };
    setSessions((prev) => {
      const updated = [...prev, newSession];
      localStorage.setItem("sessions", JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    const stored = localStorage.getItem("sessions");
    if (stored) setSessions(JSON.parse(stored));
  }, []);

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  const handleStartWithTopic = (enteredTopic: string) => {
    setTopic(enteredTopic);
    setIsRunning(true);
  };

  // Função para formatar dados para o gráfico
  const getChartData = () => {
    // Agrupar as sessões por data (dia da semana)
    const dataByDay: { [key: string]: number } = {};

    sessions.forEach((session) => {
      const date = new Date(session.date);
      const dayOfWeek = date.toLocaleDateString("pt-BR", { weekday: "short" }); // Exemplo: "Seg", "Ter", "Qua"
      dataByDay[dayOfWeek] = (dataByDay[dayOfWeek] || 0) + session.duration;
    });

    // Transformar os dados em formato que o gráfico entende
    const chartData = Object.keys(dataByDay).map((day) => ({
      name: day,
      duration: dataByDay[day] / 60, // Converter para minutos
    }));

    return chartData;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {!isRunning && !topic && (
        <div className="mb-6 bg-white p-6 rounded-xl shadow max-w-md mx-auto">
          <StudyTopicForm onStart={handleStartWithTopic} />
        </div>
      )}

      {/* Timer */}
      {topic && (
        <div className="flex flex-col items-center bg-white shadow rounded-2xl p-6 max-w-sm mx-auto mb-8">
          <p className="text-sm text-gray-500 mb-2">Estudando: <strong>{topic}</strong></p>
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
      )}

      {/* Gráfico Semanal */}
      <div className="max-w-md mx-auto mb-8">
        <h2 className="text-lg font-semibold mb-4">Progresso Semanal</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={getChartData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="duration" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Lista de sessões anteriores */}
      <div className="max-w-md mx-auto bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Histórico de Sessões</h2>
        {sessions.length === 0 ? (
          <p className="text-gray-500">Nenhuma sessão registrada.</p>
        ) : (
          <ul className="divide-y">
            {sessions.map((s, idx) => (
              <li key={idx} className="py-2 text-sm">
                📘 <strong>{s.topic}</strong> — {new Date(s.date).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
