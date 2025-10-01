import Header from "../components/Header";
import { Target, Users, Award, Lightbulb, Heart, Zap, Clock, BookOpen } from "lucide-react";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Ana Silva",
      role: "CEO & Fundadora",
      description: "Especialista em produtividade com 10+ anos de experiência em educação.",
      image: "👩‍💼",
      color: "bg-teal-100 text-teal-700"
    },
    {
      name: "Carlos Santos",
      role: "CTO",
      description: "Desenvolvedor full-stack apaixonado por tecnologias educacionais.",
      image: "👨‍💻",
      color: "bg-blue-100 text-blue-700"
    },
    {
      name: "Maria Oliveira",
      role: "Head de Design",
      description: "Designer UX/UI focada em criar experiências intuitivas e engajantes.",
      image: "👩‍🎨",
      color: "bg-purple-100 text-purple-700"
    },
    {
      name: "João Costa",
      role: "Especialista em IA",
      description: "PhD em Machine Learning, responsável pelos algoritmos de personalização.",
      image: "👨‍🔬",
      color: "bg-green-100 text-green-700"
    }
  ];

  const values = [
    {
      icon: Target,
      title: "Foco na Produtividade",
      description: "Acreditamos que o foco é a chave para o sucesso acadêmico e profissional.",
      color: "teal"
    },
    {
      icon: Users,
      title: "Comunidade",
      description: "Construímos uma comunidade de estudantes que se apoiam mutuamente.",
      color: "blue"
    },
    {
      icon: Lightbulb,
      title: "Inovação",
      description: "Utilizamos tecnologia de ponta para criar soluções educacionais únicas.",
      color: "purple"
    },
    {
      icon: Heart,
      title: "Paixão pela Educação",
      description: "Somos movidos pela missão de transformar a forma como as pessoas aprendem.",
      color: "pink"
    }
  ];

  const milestones = [
    { year: "2022", title: "Fundação", description: "TimeFocus é criado com a missão de revolucionar os estudos" },
    { year: "2023", title: "Primeira Versão", description: "Lançamento da plataforma com timer Pomodoro e exercícios básicos" },
    { year: "2023", title: "IA Integrada", description: "Implementação de inteligência artificial para geração de exercícios" },
    { year: "2024", title: "50k+ Usuários", description: "Alcançamos a marca de 50 mil estudantes ativos" },
    { year: "2024", title: "Gamificação", description: "Lançamento do sistema de conquistas e níveis" },
    { year: "2024", title: "Futuro", description: "Expansão internacional e novas funcionalidades em desenvolvimento" }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      teal: { bg: "bg-teal-50", icon: "text-teal-600", iconBg: "bg-teal-100" },
      blue: { bg: "bg-blue-50", icon: "text-blue-600", iconBg: "bg-blue-100" },
      purple: { bg: "bg-purple-50", icon: "text-purple-600", iconBg: "bg-purple-100" },
      pink: { bg: "bg-pink-50", icon: "text-pink-600", iconBg: "bg-pink-100" }
    };
    return colors[color as keyof typeof colors] || colors.teal;
  };

  return (
    <div className="about-page min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium mb-6">
            <Heart className="w-4 h-4 mr-2" />
            Nossa História
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Sobre o{" "}
            <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              TimeFocus
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Nascemos da paixão por educação e da crença de que todos podem alcançar seu máximo potencial 
            com as ferramentas certas e metodologias comprovadas.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Nossa Missão</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Democratizar o acesso a técnicas de estudo eficazes e tecnologias educacionais avançadas, 
                ajudando estudantes de todo o mundo a alcançarem seus objetivos acadêmicos e profissionais.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Acreditamos que a combinação da técnica Pomodoro, inteligência artificial e gamificação 
                pode transformar completamente a experiência de aprendizado, tornando-a mais eficiente, 
                engajante e prazerosa.
              </p>
            </div>
            <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">50k+</div>
                  <div className="text-sm text-gray-600">Estudantes</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">2M+</div>
                  <div className="text-sm text-gray-600">Horas de Estudo</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">1M+</div>
                  <div className="text-sm text-gray-600">Exercícios Gerados</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">85%</div>
                  <div className="text-sm text-gray-600">Melhoria</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nossos Valores</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Os princípios que guiam cada decisão e desenvolvimento do TimeFocus
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              const colors = getColorClasses(value.color);
              
              return (
                <div key={index} className={`${colors.bg} rounded-xl p-6 text-center hover:shadow-md transition-shadow`}>
                  <div className={`w-16 h-16 ${colors.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className={`w-8 h-8 ${colors.icon}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nossa Jornada</h2>
            <p className="text-gray-600">
              Marcos importantes na evolução do TimeFocus
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-teal-200"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="text-2xl font-bold text-teal-600 mb-2">{milestone.year}</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600 text-sm">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-teal-500 rounded-full border-4 border-white shadow-md"></div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nossa Equipe</h2>
            <p className="text-gray-600">
              Conheça as pessoas por trás do TimeFocus
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center hover:shadow-xl transition-shadow">
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${member.color}`}>
                  {member.role}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Faça Parte da Nossa História</h2>
          <p className="text-teal-100 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de estudantes que já transformaram sua forma de estudar. 
            Sua jornada de sucesso começa aqui!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-teal-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors">
              Começar Gratuitamente
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-teal-600 px-8 py-4 rounded-xl font-semibold text-lg transition-colors">
              Conhecer a Equipe
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}