import Header from "../components/Header";
import FeatureSection from "../components/FeatureSection";
import CTASection from "../components/CTASection";
import { Button } from "../components/ui/Button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 px-6 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-200 rounded-full opacity-20 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col-reverse md:flex-row items-center gap-12">
            {/* Hero Text */}
            <div className="md:w-1/2 text-center md:text-left space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  🚀 Novo: Exercícios com IA disponíveis!
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Organize seus estudos com{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    TimeFocus
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Pomodoro, relatórios e inteligência artificial para turbinar sua produtividade. 
                  Transforme sua forma de estudar com a plataforma mais completa do mercado.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200"
                >
                  Começar Grátis
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 font-semibold px-8 py-4 text-lg"
                >
                  Ver Como Funciona
                </Button>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Grátis para sempre</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Sem anúncios</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Dados seguros</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
<div className="md:w-1/2 flex justify-center">
  <div className="relative">
    <img
      src="/img/TimesFocusLetra.png"
      alt="Logo TimeFocus"
      className="w-full max-w-lg h-80 object-contain transform hover:scale-105 transition-transform duration-300"
    />

    {/* Floating elements */}
    <div className="absolute -top-6 -right-6 w-12 h-12 rounded-2xl flex items-center justify-center">
      
    </div>
    <div className="absolute -bottom-6 -left-6 w-12 h-12 rounded-2xl flex items-center justify-center">
      
    </div>
  </div>
</div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <div id="features">
        <FeatureSection
          icon="⏱️"
          title="Foque com o Pomodoro"
          description="Estude em ciclos de 25 minutos com pausas automáticas. Acompanhe seu progresso em tempo real e mantenha o foco máximo em suas tarefas mais importantes."
          mockupText="Timer Pomodoro Inteligente"
          bgColor="bg-white"
        />

        <FeatureSection
          icon="📊"
          title="Relatórios Inteligentes"
          description="Veja sua produtividade em relatórios diários, semanais e mensais. Descubra padrões, identifique seus horários mais produtivos e otimize sua rotina de estudos."
          mockupText="Dashboard de Produtividade"
          reverse={true}
          bgColor="bg-gray-50"
        />

        <FeatureSection
          icon="🤖"
          title="Exercícios com IA"
          description="Gere automaticamente exercícios personalizados com base no conteúdo que está estudando. Nossa IA cria questões adaptadas ao seu nível e área de conhecimento."
          mockupText="Gerador de Exercícios IA"
          bgColor="bg-white"
        />

        <FeatureSection
          icon="🏆"
          title="Gamificação"
          description="Ganhe pontos, conquistas e veja seu ranking. Transforme seus estudos em uma jornada motivadora com metas, desafios e recompensas que mantêm você engajado."
          mockupText="Sistema de Conquistas"
          reverse={true}
          bgColor="bg-gray-50"
        />
      </div>

      {/* Stats Section */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Resultados que falam por si
            </h2>
            <p className="text-lg text-gray-600">
              Milhares de estudantes já transformaram sua produtividade
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">50k+</div>
              <p className="text-gray-600">Estudantes ativos</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">2M+</div>
              <p className="text-gray-600">Horas de estudo</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">85%</div>
              <p className="text-gray-600">Melhoria na produtividade</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">4.9★</div>
              <p className="text-gray-600">Avaliação dos usuários</p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <span className="text-xl font-bold">TimeFocus</span>
              </div>
              <p className="text-gray-400">
                A plataforma completa para organizar seus estudos e maximizar sua produtividade.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Funcionalidades</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Atualizações</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TimeFocus. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}