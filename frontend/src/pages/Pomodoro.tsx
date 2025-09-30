import { useState, useEffect, useContext, useCallback } from "react";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import { UserContext } from "../../contexts/UserContext";
import { api } from "../../services/api";
import type { PomodoroCycleOut } from "../../types/api";
import { Play, Pause, Square, Settings, Clock, Target, Coffee } from "lucide-react";

export default function PomodoroPage() {
  const { user } = useContext(UserContext)!;
  const [cycles, setCycles] = useState<PomodoroCycleOut[]>([]);
  const [activeCycle, setActiveCycle] = useState<PomodoroCycleOut | null>(null);
  const [secondsLeft, setSecondsLeft] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [cycleType, setCycleType] = useState<'focus' | 'break' | 'longBreak'>('focus');
  const [completedCycles, setCompletedCycles] = useState<number>(0);

  // Configurações de tempo (em minutos)
  const timeSettings = {
    focus: 25,
    break: 5,
    longBreak: 15
  };

  const fetchCycles = useCallback(async () => {
    try {
      const data = await api.getPomodoroCycles();
      setCycles(data);
    } catch (err) {
      console.error("Erro ao buscar ciclos:", err);
    }
  }, []);

  const saveCycle = useCallback(async (cycle: PomodoroCycleOut) => {
    try {
      await api.createPomodoroCycle({ duration: cycle.duration });
      fetchCycles();
    } catch (err) {
      console.error("Erro ao salvar ciclo:", err);
    }
  }, [fetchCycles]);

  useEffect(() => {
    fetchCycles();
  }, [fetchCycles]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
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
      // Determinar próximo tipo de ciclo
      const nextType = (completedCycles + 1) % 4 === 0 ? 'longBreak' : 'break';
      setCycleType(nextType);
      setSecondsLeft(timeSettings[nextType] * 60);
    } else {
      setCycleType('focus');
      setSecondsLeft(timeSettings.focus * 60);
    }
  };

  const startTimer = () => {
    if (secondsLeft === 0) {
      setSecondsLeft(timeSettings[cycleType] * 60);
    }
    setIsRunning(true);
    
    if (!activeCycle) {
      const newCycle = { 
        id: Date.now(), 
        user_id: user?.id || 0, 
        duration: timeSettings[cycleType], 
        start_time: new Date().toISOString(), 
        end_time: null 
      };
      setActiveCycle(newCycle);
      saveCycle(newCycle);
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setActiveCycle(null);
    setSecondsLeft(timeSettings[cycleType] * 60);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setActiveCycle(null);
    setSecondsLeft(timeSettings[cycleType] * 60);
    setCycleType('focus');
    setCompletedCycles(0);
  };

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const getProgress = () => {
    const totalTime = timeSettings[cycleType] * 60;
    return ((totalTime - secondsLeft) / totalTime) * 100;
  };

  const getCycleInfo = () => {
    switch (cycleType) {
      case 'focus':
        return { title: 'Foco', icon: Target, color: 'teal' };
      case 'break':
        return { title: 'Pausa Curta', icon: Coffee, color: 'blue' };
      case 'longBreak':
        return { title: 'Pausa Longa', icon: Coffee, color: 'purple' };
    }
  };

  const cycleInfo = getCycleInfo();
  const IconComponent = cycleInfo.icon;

  return (
    <div className="pomodoro-page min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {user && (
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Olá, {user.username}! 👋
            </h1>
            <p className="text-gray-600">Vamos focar nos seus estudos</p>
          </div>
        )}

        {/* Timer Main Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <div className="text-center">
            {/* Cycle Type Indicator */}
            <div className="flex items-center justify-center mb-6">
              <div className={`w-12 h-12 bg-${cycleInfo.color}-100 rounded-full flex items-center justify-center mr-3`}>
                <IconComponent className={`w-6 h-6 text-${cycleInfo.color}-600`} />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">{cycleInfo.title}</h2>
            </div>

            {/* Progress Circle */}
            <div className="relative w-64 h-64 mx-auto mb-8">
              <svg className="w-64 h-64 transform -rotate-90" viewBox="0 0 256 256">
                <circle
                  cx="128"
                  cy="128"
                  r="112"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                />
                <circle
                  cx="128"
                  cy="128"
                  r="112"
                  fill="none"
                  stroke="#0cfabe"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 112}`}
                  strokeDashoffset={`${2 * Math.PI * 112 * (1 - getProgress() / 100)}`}
                  className="transition-all duration-1000 ease-in-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl font-mono font-bold text-gray-900 mb-2">
                    {formatTime(secondsLeft)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {isRunning ? 'Em andamento' : 'Pausado'}
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              {!isRunning ? (
                <button
                  onClick={startTimer}
                  className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors shadow-lg"
                >
                  <Play className="w-5 h-5" />
                  <span>Iniciar</span>
                </button>
              ) : (
                <button
                  onClick={pauseTimer}
                  className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors shadow-lg"
                >
                  <Pause className="w-5 h-5" />
                  <span>Pausar</span>
                </button>
              )}
              
              <button
                onClick={stopTimer}
                className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                <Square className="w-5 h-5" />
                <span>Parar</span>
              </button>

              <button
                onClick={resetTimer}
                className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                <Settings className="w-5 h-5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Cycle Counter */}
            <div className="flex items-center justify-center space-x-8 text-center">
              <div>
                <p className="text-2xl font-bold text-gray-900">{completedCycles}</p>
                <p className="text-sm text-gray-600">Ciclos Concluídos</p>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{Math.floor(completedCycles * 25 / 60)}h {(completedCycles * 25) % 60}m</p>
                <p className="text-sm text-gray-600">Tempo Total</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Settings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => {setCycleType('focus'); setSecondsLeft(timeSettings.focus * 60); setIsRunning(false);}}
            className={`p-4 rounded-xl border-2 transition-colors ${
              cycleType === 'focus' 
                ? 'border-teal-500 bg-teal-50' 
                : 'border-gray-200 bg-white hover:border-teal-300'
            }`}
          >
            <Target className="w-8 h-8 text-teal-600 mx-auto mb-2" />
            <p className="font-semibold text-gray-900">Foco</p>
            <p className="text-sm text-gray-600">{timeSettings.focus} minutos</p>
          </button>

          <button
            onClick={() => {setCycleType('break'); setSecondsLeft(timeSettings.break * 60); setIsRunning(false);}}
            className={`p-4 rounded-xl border-2 transition-colors ${
              cycleType === 'break' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 bg-white hover:border-blue-300'
            }`}
          >
            <Coffee className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="font-semibold text-gray-900">Pausa Curta</p>
            <p className="text-sm text-gray-600">{timeSettings.break} minutos</p>
          </button>

          <button
            onClick={() => {setCycleType('longBreak'); setSecondsLeft(timeSettings.longBreak * 60); setIsRunning(false);}}
            className={`p-4 rounded-xl border-2 transition-colors ${
              cycleType === 'longBreak' 
                ? 'border-purple-500 bg-purple-50' 
                : 'border-gray-200 bg-white hover:border-purple-300'
            }`}
          >
            <Coffee className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="font-semibold text-gray-900">Pausa Longa</p>
            <p className="text-sm text-gray-600">{timeSettings.longBreak} minutos</p>
          </button>
        </div>

        {/* Recent Cycles History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Histórico Recente</h2>
            <Clock className="w-5 h-5 text-gray-400" />
          </div>
          
          {cycles.length > 0 ? (
            <div className="space-y-3">
              {cycles.slice(0, 5).map((cycle) => (
                <div key={cycle.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-gray-900">{cycle.duration} minutos</p>
                      <p className="text-sm text-gray-600">
                        {new Date(cycle.start_time).toLocaleDateString('pt-BR')} às {new Date(cycle.start_time).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">Concluído</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">Nenhum ciclo concluído ainda</p>
              <p className="text-sm text-gray-500">Inicie seu primeiro Pomodoro!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}