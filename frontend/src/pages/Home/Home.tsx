import Header from "../../components/Header/Header";

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
          <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
            📸 Imagem Hero
          </div>
        </div>
      </section>

      {/* Funcionalidade detalhada 1 */}
      <section className="flex flex-col md:flex-row items-center py-20 px-6 bg-white">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800">⏱️ Foque com o Pomodoro</h2>
          <p className="mt-4 text-lg text-gray-600">
            Estude em ciclos de 25 minutos com pausas automáticas. 
            Acompanhe seu progresso em tempo real e mantenha o foco.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
          <div className="w-80 h-56 bg-gray-100 rounded-lg flex items-center justify-center">
            📸 Mockup Pomodoro
          </div>
        </div>
      </section>

      {/* Funcionalidade detalhada 2 */}
      <section className="flex flex-col md:flex-row-reverse items-center py-20 px-6 bg-gray-50">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800">📊 Relatórios Inteligentes</h2>
          <p className="mt-4 text-lg text-gray-600">
            Veja sua produtividade em relatórios diários, semanais e mensais. 
            Descubra onde pode melhorar.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
          <div className="w-80 h-56 bg-gray-100 rounded-lg flex items-center justify-center">
            📸 Mockup Relatórios
          </div>
        </div>
      </section>

      {/* Funcionalidade detalhada 3 */}
      <section className="flex flex-col md:flex-row items-center py-20 px-6 bg-white">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800">🤖 Exercícios com IA</h2>
          <p className="mt-4 text-lg text-gray-600">
            Gere automaticamente exercícios personalizados 
            com base no conteúdo que está estudando.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
          <div className="w-80 h-56 bg-gray-100 rounded-lg flex items-center justify-center">
            📸 Mockup Exercícios IA
          </div>
        </div>
      </section>

      {/* Funcionalidade detalhada 4 */}
      <section className="flex flex-col md:flex-row-reverse items-center py-20 px-6 bg-gray-50">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800">🏆 Gamificação</h2>
          <p className="mt-4 text-lg text-gray-600">
            Ganhe pontos, conquistas e veja seu ranking. 
            Transforme seus estudos em uma jornada motivadora.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
          <div className="w-80 h-56 bg-gray-100 rounded-lg flex items-center justify-center">
            📸 Mockup Gamificação
          </div>
        </div>
      </section>

      {/* Call to Action Final */}
      <section className="cta text-center py-20 bg-blue-600 text-white">
        <h2 className="text-3xl font-bold">Estude melhor e mais focado</h2>
        <p className="mt-2 text-lg">
          Cadastre-se grátis e comece sua jornada com TimeFocus
        </p>
        <button className="mt-6 px-6 py-3 bg-white text-blue-600 rounded-lg text-lg hover:bg-gray-200">
          Criar Conta
        </button>
      </section>
    </div>
  );
}
