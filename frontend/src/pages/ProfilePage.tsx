import Header from "../../components/Header";

export default function ProfilePage() {
  // Dados mockados
  const userStats = {
    ciclosConcluidos: 42,
    tempoTotal: "18h 30min",
    ranking: 5,
    badges: ["Pomodoro Master", "IA Explorer", "Consistência Semanal"]
  };

  return (
    <div className="profile-page min-h-screen">
      <Header />

      <div className="profile-content p-4">
        <h1 className="text-3xl font-bold mb-2">Meu Perfil</h1>
        <p>Confira suas estatísticas, conquistas e personalizações.</p>

        {/* Estatísticas */}
        <div className="stats mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="stat-card p-4 bg-white rounded shadow">
            <h2 className="font-semibold">Ciclos Concluídos</h2>
            <p className="text-xl">{userStats.ciclosConcluidos}</p>
          </div>

          <div className="stat-card p-4 bg-white rounded shadow">
            <h2 className="font-semibold">Tempo Total</h2>
            <p className="text-xl">{userStats.tempoTotal}</p>
          </div>

          <div className="stat-card p-4 bg-white rounded shadow">
            <h2 className="font-semibold">Ranking</h2>
            <p className="text-xl">{userStats.ranking}º</p>
          </div>
        </div>

        {/* Badges */}
        <div className="badges mt-6">
          <h2 className="text-xl font-semibold mb-2">Conquistas</h2>
          <ul className="flex gap-2 flex-wrap">
            {userStats.badges.map((badge, index) => (
              <li key={index} className="px-3 py-1 bg-yellow-300 rounded">{badge}</li>
            ))}
          </ul>
        </div>

        {/* Configurações */}
        <div className="settings mt-6">
          <h2 className="text-xl font-semibold mb-2">Configurações</h2>
          <div className="flex flex-col gap-2">
            <label>
              Tema:
              <select className="ml-2 border p-1 rounded">
                <option>Claro</option>
                <option>Escuro</option>
              </select>
            </label>

            <label>
              Sons do Timer:
              <select className="ml-2 border p-1 rounded">
                <option>Ativado</option>
                <option>Desativado</option>
              </select>
            </label>

            <label>
              Modo Foco:
              <select className="ml-2 border p-1 rounded">
                <option>Ativado</option>
                <option>Desativado</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
