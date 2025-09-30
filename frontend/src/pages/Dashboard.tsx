import Header from "../../components/Header/Header";
import { Clock, Target, BookOpen, TrendingUp, Calendar, Award } from "lucide-react";

export default function DashboardPage() {
  // Dados mockados para demonstração
  const todayStats = {
    completedCycles: 5,
    focusTime: "2h 30m",
    exercisesCompleted: 8,
    streak: 7
  };

  const weeklyData = [
    { day: "Seg", cycles: 3, hours: 1.5 },
    { day: "Ter", cycles: 5, hours: 2.5 },
    { day: "Qua", cycles: 4, hours: 2.0 },
    { day: "Qui", cycles: 6, hours: 3.0 },
    { day: "Sex", cycles: 2, hours: 1.0 },
    { day: "Sáb", cycles: 0, hours: 0 },
    { day: "Dom", cycles: 1, hours: 0.5 },
  ];

  const recentSubjects = [
    { name: "Matemática", time: "45min", color: "bg-blue-500" },
    { name: "História", time: "30min", color: "bg-purple-500" },
    { name: "Inglês", time: "25min", color: "bg-orange-500" },
  ];

  return (
    <div className="dashboard-page min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bem-vindo de volta! 👋
          </h1>
          <p className="text-gray-600">
            Aqui está um resumo da sua produtividade hoje
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pomodoros Hoje</p>
                <p className="text-3xl font-bold text-gray-900">{todayStats.completedCycles}</p>
              </div>
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-teal-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+20% vs ontem</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tempo Focado</p>
                <p className="text-3xl font-bold text-gray-900">{todayStats.focusTime}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+5% vs ontem</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Exercícios</p>
                <p className="text-3xl font-bold text-gray-900">{todayStats.exercisesCompleted}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+12% vs ontem</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sequência</p>
                <p className="text-3xl font-bold text-gray-900">{todayStats.streak}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm text-gray-600">dias consecutivos</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Weekly Progress Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Progresso Semanal</h2>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="space-y-4">
              {weeklyData.map((day, index) => (
                <div key={day.day} className="flex items-center space-x-4">
                  <div className="w-12 text-sm font-medium text-gray-600">{day.day}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-teal-400 to-teal-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(day.cycles / 6) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{day.cycles}</span>
                    </div>
                    <div className="text-xs text-gray-500">{day.hours}h focado</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Subjects */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Matérias Recentes</h2>
            
            <div className="space-y-4">
              {recentSubjects.map((subject, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${subject.color}`}></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{subject.name}</p>
                    <p className="text-sm text-gray-500">{subject.time} hoje</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 px-4 py-2 bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100 transition-colors font-medium">
              Ver Todas as Matérias
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Ações Rápidas</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center space-x-3 p-4 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors group">
              <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">Iniciar Pomodoro</p>
                <p className="text-sm text-gray-600">25 minutos de foco</p>
              </div>
            </button>

            <button className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">Gerar Exercícios</p>
                <p className="text-sm text-gray-600">Com IA personalizada</p>
              </div>
            </button>

            <button className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">Ver Relatórios</p>
                <p className="text-sm text-gray-600">Análise detalhada</p>
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}