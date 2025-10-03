import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { 
  User as UserIcon, Settings, Award, Target, Clock, BookOpen, Palette 
} from "lucide-react";

type Stats = {
  ciclosConcluidos: number;
  tempoTotal: string;
  exerciciosFeitos: number;
  diasConsecutivos: number;
  ranking: number;
  melhorSequencia: number;
  materiasFavoritas: string[];
  horasPorDia: number;
};

type Achievement = {
  id: number;
  name: string;
  description: string;
  icon: string;
  completed: boolean;
  date?: string;
  progress?: number;
};

export default function ProfilePage() {
  const { user, setUser, refreshUser } = useContext(UserContext)!;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'stats' | 'achievements' | 'settings'>('stats');

  const [userStats, setUserStats] = useState<Stats | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: true,
    sounds: true,
    focusMode: true,
    pomodoroTime: 25,
    shortBreak: 5,
    longBreak: 15,
    autoStartBreaks: false,
    autoStartPomodoros: false
  });

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  // Verifica login
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  // Busca dados do usuário atual
  useEffect(() => {
    async function fetchData() {
      try {
        await refreshUser(); // Atualiza user do contexto

        // Aqui você pode chamar API para stats e achievements
        // Simulação:
        setUserStats({
          ciclosConcluidos: 142,
          tempoTotal: "58h 30min",
          exerciciosFeitos: 89,
          diasConsecutivos: 12,
          ranking: 5,
          melhorSequencia: 21,
          materiasFavoritas: ["Matemática", "Física", "História"],
          horasPorDia: 2.5
        });

        setAchievements([
          { id: 1, name: "Primeiro Pomodoro", description: "Complete seu primeiro ciclo", icon: "🍅", completed: true, date: "15 Jan 2024" },
          { id: 2, name: "Maratonista", description: "Complete 50 ciclos", icon: "🏃‍♂️", completed: true, date: "28 Fev 2024" },
          { id: 3, name: "IA Explorer", description: "Use exercícios com IA 10 vezes", icon: "🤖", completed: true, date: "10 Mar 2024" },
          { id: 4, name: "Consistência Semanal", description: "Estude 7 dias seguidos", icon: "📅", completed: true, date: "22 Mar 2024" },
          { id: 5, name: "Centurião", description: "Complete 100 ciclos", icon: "💯", completed: true, date: "05 Abr 2024" },
          { id: 6, name: "Mestre do Foco", description: "Complete 200 ciclos", icon: "🎯", completed: false, progress: 71 }
        ]);

      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    }

    fetchData();
  }, []);

  if (!user || !userStats) return null;

  return (
    <div className="profile-page min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center">
                <UserIcon className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user.username}</h1>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500">
                  Membro desde {new Date(user.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[ 
                { key: 'stats', label: 'Estatísticas', icon: Target },
                { key: 'achievements', label: 'Conquistas', icon: Award },
                { key: 'settings', label: 'Configurações', icon: Settings }
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.key
                        ? 'border-teal-500 text-teal-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Estatísticas */}
            {activeTab === 'stats' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-teal-700">Ciclos Concluídos</p>
                        <p className="text-3xl font-bold text-teal-900">{userStats.ciclosConcluidos}</p>
                      </div>
                      <Target className="w-8 h-8 text-teal-600" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-700">Tempo Total</p>
                        <p className="text-3xl font-bold text-blue-900">{userStats.tempoTotal}</p>
                      </div>
                      <Clock className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-purple-700">Exercícios</p>
                        <p className="text-3xl font-bold text-purple-900">{userStats.exerciciosFeitos}</p>
                      </div>
                      <BookOpen className="w-8 h-8 text-purple-600" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-orange-700">Sequência Atual</p>
                        <p className="text-3xl font-bold text-orange-900">{userStats.diasConsecutivos}</p>
                      </div>
                      <Award className="w-8 h-8 text-orange-600" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Conquistas */}
            {activeTab === 'achievements' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map(a => (
                  <div key={a.id} className={`rounded-xl p-6 border-2 transition-all ${
                    a.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="text-center">
                      <div className="text-4xl mb-3">{a.icon}</div>
                      <h3 className={`font-semibold mb-2 ${a.completed ? 'text-green-900' : 'text-gray-600'}`}>{a.name}</h3>
                      <p className={`text-sm mb-3 ${a.completed ? 'text-green-700' : 'text-gray-500'}`}>{a.description}</p>
                      {a.completed ? <span className="text-sm text-green-600 font-medium">Conquistado em {a.date}</span> : (
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div className="bg-teal-500 h-2 rounded-full" style={{ width: `${a.progress}%` }} />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Configurações */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Palette className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Aparência</h3>
                  </div>
                  <select value={settings.theme} onChange={e => updateSetting('theme', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                    <option value="light">Claro</option>
                    <option value="dark">Escuro</option>
                    <option value="auto">Automático</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
