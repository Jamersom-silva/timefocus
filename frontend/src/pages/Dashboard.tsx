import Header from "../components/Header";

export default function DashboardPage() {
  return (
    <div className="dashboard-page min-h-screen flex flex-col">
      <Header />

      {/* Conteúdo principal */}
      <main className="flex-1 p-6 bg-gray-50">
        {/* Título */}
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* Resumo de ciclos concluídos */}
        <div className="mb-6">
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold">Resumo de hoje</h2>
            <p className="text-gray-600">
              Você concluiu <span className="font-bold">5 ciclos de Pomodoro</span> hoje 🎯
            </p>
          </div>
        </div>

        {/* Cards de estatísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white shadow rounded-lg p-4 text-center">
            <h3 className="text-lg font-semibold">Pomodoros</h3>
            <p className="text-2xl font-bold">5</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4 text-center">
            <h3 className="text-lg font-semibold">Tempo focado</h3>
            <p className="text-2xl font-bold">2h 30m</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4 text-center">
            <h3 className="text-lg font-semibold">Exercícios</h3>
            <p className="text-2xl font-bold">8</p>
          </div>
        </div>

      
      </main>
    </div>
  );
}
