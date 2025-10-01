import { useState, useEffect, useContext, useCallback } from "react";
import Header from "../components/Header";
import { UserContext } from "../contexts/UserContext";
import { api } from "../services/api";
import type { PomodoroCycleOut } from "../types/api";
import { Play, Pause, Square, Settings, Clock, Target, Coffee } from "lucide-react";

export default function PomodoroPage() {
  // Usuario fake caso o contexto não tenha
  const contextUser = useContext(UserContext)?.user;
  const user = contextUser ?? { id: 1, username: "Jamersom" };

  // Estados principais
  const [cycles, setCycles] = useState<PomodoroCycleOut[]>([]);
  const [activeCycle, setActiveCycle] = useState<PomodoroCycleOut | null>(null);
  const [secondsLeft, setSecondsLeft] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [cycleType, setCycleType] = useState<'focus' | 'break' | 'longBreak'>('focus');
  const [completedCycles, setCompletedCycles] = useState<number>(0);

  // Tempo customizável
  const [customTime, setCustomTime] = useState({ focus: 25, break: 5, longBreak: 15 });

  // Fetch histórico
  const fetchCycles = useCallback(async () => {
    try {
      const data = await api.getPomodoroCycles();
      setCycles(data);
    } catch {
      console.warn("API não respondeu, usando mock");
      setCycles([]);
    }
  }, []);

  useEffect(() => {
    fetchCycles();
  }, [fetchCycles]);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            handleCycleComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  const handleCycleComplete = () => {
    if (cycleType === 'focus') {
      setCompletedCycles(prev => prev + 1);
      const nextType = (completedCycles + 1) % 4 === 0 ? 'longBreak' : 'break';
      setCycleType(nextType);
      setSecondsLeft(customTime[nextType] * 60);
    } else {
      setCycleType('focus');
      setSecondsLeft(customTime.focus * 60);
    }
  };

  // Controles do timer
  const startTimer = () => {
    if (secondsLeft === 0) setSecondsLeft(customTime[cycleType] * 60);
    setIsRunning(true);

    if (!activeCycle) {
      const newCycle: PomodoroCycleOut = {
        id: Date.now(),
        user_id: user.id,
        duration: Math.round(customTime[cycleType]),
        start_time: new Date().toISOString(),
        end_time: null
      };
      setActiveCycle(newCycle);

      api.createPomodoroCycle({ duration: newCycle.duration }).catch(() => {
        console.warn("Erro API, adicionando localmente");
      });

      setCycles(prev => [...prev, newCycle]);
    }
  };

  const pauseTimer = () => setIsRunning(false);
  const stopTimer = () => {
    setIsRunning(false);
    setActiveCycle(null);
    setSecondsLeft(customTime[cycleType] * 60);
  };
  const resetTimer = () => {
    setIsRunning(false);
    setActiveCycle(null);
    setSecondsLeft(customTime.focus * 60);
    setCycleType('focus');
    setCompletedCycles(0);
  };

  // Formatação do timer
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`;
  };

  const getProgress = () => ((customTime[cycleType]*60 - secondsLeft)/(customTime[cycleType]*60))*100;

  const getCycleInfo = () => {
    switch(cycleType) {
      case 'focus': return { title: 'Foco', icon: Target, color: 'teal', bgColor: 'bg-teal-50', textColor: 'text-teal-600' };
      case 'break': return { title: 'Pausa Curta', icon: Coffee, color: 'blue', bgColor: 'bg-blue-50', textColor: 'text-blue-600' };
      case 'longBreak': return { title: 'Pausa Longa', icon: Coffee, color: 'purple', bgColor: 'bg-purple-50', textColor: 'text-purple-600' };
    }
  };

  const cycleInfo = getCycleInfo();
  const IconComponent = cycleInfo.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Saudação */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Olá, {user.username} 👋</h1>
          <p className="text-gray-600">Vamos focar nos seus estudos</p>
        </div>

        {/* Timer */}
        <div className="bg-white rounded-2xl shadow-lg border p-8 mb-8">
          {/* Cycle Indicator */}
          <div className="flex items-center justify-center mb-6">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-3 ${cycleInfo.bgColor}`}>
              <IconComponent className={`w-6 h-6 ${cycleInfo.textColor}`} />
            </div>
            <h2 className="text-2xl font-semibold">{cycleInfo.title}</h2>
          </div>

          {/* Progress Circle */}
          <div className="relative w-64 h-64 mx-auto mb-4">
            <svg className="w-64 h-64 transform -rotate-90" viewBox="0 0 256 256">
              <circle cx="128" cy="128" r="112" fill="none" stroke="#e5e7eb" strokeWidth="8"/>
              <circle cx="128" cy="128" r="112" fill="none" stroke="#0cfabe" strokeWidth="8" strokeLinecap="round"
                strokeDasharray={`${2*Math.PI*112}`} strokeDashoffset={`${2*Math.PI*112*(1-getProgress()/100)}`} className="transition-all duration-500"/>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl font-mono font-bold mb-2">{formatTime(secondsLeft)}</div>
                <div className="text-sm text-gray-500">{isRunning?'Em andamento':'Pausado'}</div>
              </div>
            </div>
          </div>

          {/* Tempo customizável */}
          <div className="flex justify-center mb-4 space-x-2">
            <input type="number" min={1} value={customTime[cycleType]} 
              onChange={e=>setCustomTime({...customTime, [cycleType]:Number(e.target.value)})}
              className="w-20 px-2 py-1 border rounded-lg text-center"/>
            <span>minutos</span>
          </div>

          {/* Controles */}
          <div className="flex justify-center space-x-4 mb-8">
            {!isRunning ? 
              <button onClick={startTimer} className="bg-teal-500 text-white px-6 py-3 rounded-xl flex items-center space-x-2"><Play className="w-5 h-5"/><span>Iniciar</span></button>
              :
              <button onClick={pauseTimer} className="bg-orange-500 text-white px-6 py-3 rounded-xl flex items-center space-x-2"><Pause className="w-5 h-5"/><span>Pausar</span></button>
            }
            <button onClick={stopTimer} className="bg-gray-500 text-white px-6 py-3 rounded-xl flex items-center space-x-2"><Square className="w-5 h-5"/><span>Parar</span></button>
            <button onClick={resetTimer} className="bg-red-500 text-white px-6 py-3 rounded-xl flex items-center space-x-2"><Settings className="w-5 h-5"/><span>Reset</span></button>
          </div>

          {/* Contador de Ciclos */}
          <div className="flex items-center justify-center space-x-8 text-center">
            <div>
              <p className="text-2xl font-bold">{completedCycles}</p>
              <p className="text-sm text-gray-600">Ciclos Concluídos</p>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div>
              <p className="text-2xl font-bold">{Math.floor(completedCycles * customTime.focus / 60)}h {(completedCycles*customTime.focus)%60}m</p>
              <p className="text-sm text-gray-600">Tempo Total</p>
            </div>
          </div>
        </div>

        {/* Histórico */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Histórico Recente</h2>
            <Clock className="w-5 h-5 text-gray-400"/>
          </div>

          {cycles.length > 0 ? (
            <div className="space-y-3">
              {cycles.slice(-5).reverse().map(cycle => (
                <div key={cycle.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">{cycle.duration} minutos</p>
                      <p className="text-sm text-gray-600">{new Date(cycle.start_time).toLocaleDateString('pt-BR')} às {new Date(cycle.start_time).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">Concluído</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4"/>
              <p className="text-gray-600">Nenhum ciclo concluído ainda</p>
              <p className="text-sm text-gray-500">Inicie seu primeiro Pomodoro!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
