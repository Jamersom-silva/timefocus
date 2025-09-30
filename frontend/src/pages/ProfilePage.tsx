import Header from "../../components/Header/Header";
import { User, Settings, Award, Target, Clock, BookOpen, Bell, Palette, Volume2, Shield } from "lucide-react";
import { useState } from "react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'stats' | 'achievements' | 'settings'>('stats');
  
  // Dados mockados do usuário
  const userProfile = {
    name: "João Silva",
    email: "joao.silva@email.com",
    avatar: null,
    joinDate: "Janeiro 2024",
    level: 15,
    xp: 2850,
    nextLevelXp: 3000
  };

  const userStats = {
    ciclosConcluidos: 142,
    tempoTotal: "58h 30min",
    exerciciosFeitos: 89,
    diasConsecutivos: 12,
    ranking: 5,
    melhorSequencia: 21,
    materiasFavoritas: ["Matemática", "Física", "História"],
    horasPorDia: 2.5
  };

  const achievements = [
    { 
      id: 1, 
      name: "Primeiro Pomodoro", 
      description: "Complete seu primeiro ciclo", 
      icon: "🍅", 
      completed: true,
      date: "15 Jan 2024"
    },
    { 
      id: 2, 
      name: "Maratonista", 
      description: "Complete 50 ciclos", 
      icon: "🏃‍♂️", 
      completed: true,
      date: "28 Fev 2024"
    },
    { 
      id: 3, 
      name: "IA Explorer", 
      description: "Use exercícios com IA 10 vezes", 
      icon: "🤖", 
      completed: true,
      date: "10 Mar 2024"
    },
    { 
      id: 4, 
      name: "Consistência Semanal", 
      description: "Estude 7 dias seguidos", 
      icon: "📅", 
      completed: true,
      date: "22 Mar 2024"
    },
    { 
      id: 5, 
      name: "Centurião", 
      description: "Complete 100 ciclos", 
      icon: "💯", 
      completed: true,
      date: "05 Abr 2024"
    },
    { 
      id: 6, 
      name: "Mestre do Foco", 
      description: "Complete 200 ciclos", 
      icon: "🎯", 
      completed: false,
      progress: 71
    }
  ];

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

  return (
    <div className="profile-page min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{userProfile.name}</h1>
                <p className="text-gray-600">{userProfile.email}</p>
                <p className="text-sm text-gray-500">Membro desde {userProfile.joinDate}</p>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <div className="flex items-center justify-center md:justify-end space-x-2 mb-2">
                <Award className="w-5 h-5 text-yellow-500" />
                <span className="text-lg font-semibold text-gray-900">Nível {userProfile.level}</span>
              </div>
              <div className="w-48 bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-gradient-to-r from-teal-400 to-teal-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(userProfile.xp / userProfile.nextLevelXp) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-600">{userProfile.xp} / {userProfile.nextLevelXp} XP</p>
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
              ].map((tab) => {
                const IconComponent = tab.icon;
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
                    <IconComponent className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Statistics Tab */}
            {activeTab === 'stats' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Suas Estatísticas</h2>
                  
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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Desempenho Geral</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Ranking Global</span>
                        <span className="font-semibold text-gray-900">#{userStats.ranking}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Melhor Sequência</span>
                        <span className="font-semibold text-gray-900">{userStats.melhorSequencia} dias</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Média por Dia</span>
                        <span className="font-semibold text-gray-900">{userStats.horasPorDia}h</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Matérias Favoritas</h3>
                    <div className="space-y-3">
                      {userStats.materiasFavoritas.map((materia, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                          <span className="text-gray-700">{materia}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Achievements Tab */}
            {activeTab === 'achievements' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Suas Conquistas</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {achievements.map((achievement) => (
                    <div 
                      key={achievement.id} 
                      className={`rounded-xl p-6 border-2 transition-all ${
                        achievement.completed 
                          ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-200' 
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-4xl mb-3">{achievement.icon}</div>
                        <h3 className={`font-semibold mb-2 ${
                          achievement.completed ? 'text-green-900' : 'text-gray-600'
                        }`}>
                          {achievement.name}
                        </h3>
                        <p className={`text-sm mb-3 ${
                          achievement.completed ? 'text-green-700' : 'text-gray-500'
                        }`}>
                          {achievement.description}
                        </p>
                        
                        {achievement.completed ? (
                          <div className="flex items-center justify-center space-x-2">
                            <Award className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-green-600 font-medium">
                              Conquistado em {achievement.date}
                            </span>
                          </div>
                        ) : (
                          <div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                              <div 
                                className="bg-teal-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${achievement.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500">
                              {achievement.progress}% concluído
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Configurações</h2>
                  
                  {/* Appearance Settings */}
                  <div className="bg-gray-50 rounded-xl p-6 mb-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Palette className="w-5 h-5 text-gray-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Aparência</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">Tema</label>
                        <select
                          value={settings.theme}
                          onChange={(e) => updateSetting('theme', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        >
                          <option value="light">Claro</option>
                          <option value="dark">Escuro</option>
                          <option value="auto">Automático</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Timer Settings */}
                  <div className="bg-gray-50 rounded-xl p-6 mb-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Clock className="w-5 h-5 text-gray-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Timer</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pomodoro (minutos)
                        </label>
                        <input
                          type="number"
                          value={settings.pomodoroTime}
                          onChange={(e) => updateSetting('pomodoroTime', parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          min="1"
                          max="60"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pausa Curta (minutos)
                        </label>
                        <input
                          type="number"
                          value={settings.shortBreak}
                          onChange={(e) => updateSetting('shortBreak', parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          min="1"
                          max="30"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pausa Longa (minutos)
                        </label>
                        <input
                          type="number"
                          value={settings.longBreak}
                          onChange={(e) => updateSetting('longBreak', parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          min="1"
                          max="60"
                        />
                      </div>
                    </div>

                    <div className="mt-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">
                          Iniciar pausas automaticamente
                        </label>
                        <button
                          onClick={() => updateSetting('autoStartBreaks', !settings.autoStartBreaks)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            settings.autoStartBreaks ? 'bg-teal-500' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              settings.autoStartBreaks ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">
                          Iniciar pomodoros automaticamente
                        </label>
                        <button
                          onClick={() => updateSetting('autoStartPomodoros', !settings.autoStartPomodoros)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            settings.autoStartPomodoros ? 'bg-teal-500' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              settings.autoStartPomodoros ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Notifications Settings */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Bell className="w-5 h-5 text-gray-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Notificações & Sons</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">
                          Notificações
                        </label>
                        <button
                          onClick={() => updateSetting('notifications', !settings.notifications)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            settings.notifications ? 'bg-teal-500' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              settings.notifications ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">
                          Sons do Timer
                        </label>
                        <button
                          onClick={() => updateSetting('sounds', !settings.sounds)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            settings.sounds ? 'bg-teal-500' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              settings.sounds ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">
                          Modo Foco (bloquear distrações)
                        </label>
                        <button
                          onClick={() => updateSetting('focusMode', !settings.focusMode)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            settings.focusMode ? 'bg-teal-500' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              settings.focusMode ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}