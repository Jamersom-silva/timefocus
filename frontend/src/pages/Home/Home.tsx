import Header from "../../components/Header/Header";
//import Footer from "../../components/Footer/Footer";//
// import heroImage from "../../assets/hero.png"; // Imagem da seção Hero (adicione depois)
// import pomodoroIcon from "../../assets/pomodoro.png"; // Ícone do Pomodoro
// import reportsIcon from "../../assets/reports.png"; // Ícone de Relatórios
// import aiIcon from "../../assets/ai.png"; // Ícone de Exercícios IA
// import gamificationIcon from "../../assets/gamification.png"; // Ícone de Gamificação

export default function HomePage() {
  return (
    <div className="home-page">
      <Header />

      {/* Hero */}
      <section className="hero flex flex-col-reverse md:flex-row items-center justify-between py-20 px-6 bg-gray-50">
        <div className="hero-text md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl font-bold text-blue-600">
            Organize seus estudos com TimeFocus
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Pomodoro, relatórios e inteligência artificial para turbinar sua produtividade.
          </p>
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700">
            Começar agora
          </button>
        </div>
        <div className="hero-image md:w-1/2">
          {/* Coloque a imagem da hero aqui quando tiver */}
          {/* <img src={heroImage} alt="TimeFocus Hero" className="w-full max-w-md mx-auto" /> */}
        </div>
      </section>

      {/* Funcionalidades */}
      <section className="features grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-16 px-6 bg-white">
        <div className="card p-6 shadow-md rounded-lg flex flex-col items-center">
          {/* Coloque o ícone do Pomodoro aqui */}
          {/* <img src={pomodoroIcon} alt="Pomodoro" className="w-16 h-16 mb-4" /> */}
          <h2 className="text-xl font-semibold">⏱️ Pomodoro Timer</h2>
          <p className="text-gray-600 text-center mt-2">
            Mantenha o foco com ciclos de estudo e pausas inteligentes.
          </p>
        </div>
        <div className="card p-6 shadow-md rounded-lg flex flex-col items-center">
          {/* Coloque o ícone de Relatórios aqui */}
          {/* <img src={reportsIcon} alt="Relatórios" className="w-16 h-16 mb-4" /> */}
          <h2 className="text-xl font-semibold">📊 Relatórios</h2>
          <p className="text-gray-600 text-center mt-2">
            Acompanhe sua produtividade diária, semanal e mensal.
          </p>
        </div>
        <div className="card p-6 shadow-md rounded-lg flex flex-col items-center">
          {/* Coloque o ícone de Exercícios IA aqui */}
          {/* <img src={aiIcon} alt="Exercícios IA" className="w-16 h-16 mb-4" /> */}
          <h2 className="text-xl font-semibold">🤖 Exercícios IA</h2>
          <p className="text-gray-600 text-center mt-2">
            Geração de exercícios personalizados com inteligência artificial.
          </p>
        </div>
        <div className="card p-6 shadow-md rounded-lg flex flex-col items-center">
          {/* Coloque o ícone de Gamificação aqui */}
          {/* <img src={gamificationIcon} alt="Gamificação" className="w-16 h-16 mb-4" /> */}
          <h2 className="text-xl font-semibold">🏆 Gamificação</h2>
          <p className="text-gray-600 text-center mt-2">
            Pontos, conquistas e ranking para motivar seus estudos.
          </p>
        </div>
      </section>

      {/* Call to Action Final */}
      <section className="cta text-center py-20 bg-blue-600 text-white">
        <h2 className="text-3xl font-bold">Estude melhor e mais focado</h2>
        <p className="mt-2 text-lg">Cadastre-se grátis e comece sua jornada com TimeFocus</p>
        <button className="mt-6 px-6 py-3 bg-white text-blue-600 rounded-lg text-lg hover:bg-gray-200">
          Criar Conta
        </button>
      </section>

      
    </div>
  );
}
