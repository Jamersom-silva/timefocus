import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { Target, Clock, BookOpen, BarChart3, User, GraduationCap, Sparkles, Award, TrendingUp, Zap } from "lucide-react";

export default function FeaturesPage() {
  const navigate = useNavigate();

  const features = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      description: 'Visão geral completa da sua produtividade com métricas em tempo real, progresso semanal e ações rápidas.',
      icon: BarChart3,
      color: 'teal',
      benefits: [
        'Estatísticas detalhadas de desempenho',
        'Gráficos de progresso semanal',
        'Ações rápidas para iniciar estudos',
        'Insights de produtividade'
      ],
      image: '📊',
      link: '/dashboard'
    },
    {
      id: 'pomodoro',
      title: 'Timer Pomodoro',
      description: 'Técnica comprovada de produtividade com timer inteligente, ciclos automáticos e controle total do seu foco.',
      icon: Target,
      color: 'blue',
      benefits: [
        'Timer circular com progresso visual',
        'Ciclos automáticos de foco e pausa',
        'Histórico de sessões completas',
        'Configurações personalizáveis'
      ],
      image: '🍅',
      link: '/Pomodoro' 
    },
    {
      id: 'exercises',
      title: 'Exercícios com IA',
      description: 'Geração automática de exercícios personalizados usando inteligência artificial adaptada ao seu nível de conhecimento.',
      icon: Sparkles,
      color: 'purple',
      benefits: [
        'Geração automática com IA',
        'Exercícios adaptados ao seu nível',
        'Sistema de filtros avançados',
        'Acompanhamento de progresso'
      ],
      image: '🤖',
      link: '/exercises'
    },
    {
      id: 'subjects',
      title: 'Gestão de Matérias',
      description: 'Organize todas as suas matérias de estudo com sistema completo de categorização e acompanhamento.',
      icon: GraduationCap,
      color: 'green',
      benefits: [
        'Organização visual por cores',
        'Estatísticas por matéria',
        'Sistema CRUD completo',
        'Ações rápidas de estudo'
      ],
      image: '📚',
      link: '/subjects'
    },
    {
      id: 'reports',
      title: 'Relatórios Inteligentes',
      description: 'Análises detalhadas da sua produtividade com gráficos interativos, tendências e insights automáticos.',
      icon: TrendingUp,
      color: 'orange',
      benefits: [
        'Gráficos interativos avançados',
        'Análise de tendências',
        'Insights automáticos',
        'Comparações temporais'
      ],
      image: '📈',
      link: '/reports'
    },
    {
      id: 'profile',
      title: 'Perfil & Gamificação',
      description: 'Sistema completo de perfil com conquistas, níveis, XP e configurações personalizadas para manter você motivado.',
      icon: Award,
      color: 'pink',
      benefits: [
        'Sistema de níveis e XP',
        'Conquistas gamificadas',
        'Configurações avançadas',
        'Estatísticas pessoais'
      ],
      image: '🏆',
      link: '/profile'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      teal: { bg: 'bg-teal-50', border: 'border-teal-200', icon: 'text-teal-600', iconBg: 'bg-teal-100', button: 'bg-teal-500 hover:bg-teal-600', accent: 'text-teal-600' },
      blue: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-600', iconBg: 'bg-blue-100', button: 'bg-blue-500 hover:bg-blue-600', accent: 'text-blue-600' },
      purple: { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'text-purple-600', iconBg: 'bg-purple-100', button: 'bg-purple-500 hover:bg-purple-600', accent: 'text-purple-600' },
      green: { bg: 'bg-green-50', border: 'border-green-200', icon: 'text-green-600', iconBg: 'bg-green-100', button: 'bg-green-500 hover:bg-green-600', accent: 'text-green-600' },
      orange: { bg: 'bg-orange-50', border: 'border-orange-200', icon: 'text-orange-600', iconBg: 'bg-orange-100', button: 'bg-orange-500 hover:bg-orange-600', accent: 'text-orange-600' },
      pink: { bg: 'bg-pink-50', border: 'border-pink-200', icon: 'text-pink-600', iconBg: 'bg-pink-100', button: 'bg-pink-500 hover:bg-pink-600', accent: 'text-pink-600' }
    };
    return colors[color as keyof typeof colors] || colors.teal;
  };

  return (
    <div className="features-page min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4 mr-2" />
            Funcionalidades Completas
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Tudo que você precisa para
            <span className="block bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              maximizar seus estudos
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            O TimeFocus oferece um conjunto completo de ferramentas integradas para 
            organizar, acompanhar e otimizar sua jornada de aprendizado.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            const colorClasses = getColorClasses(feature.color);

            return (
              <div 
                key={feature.id} 
                className={`${colorClasses.bg} ${colorClasses.border} border-2 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 ${colorClasses.iconBg} rounded-xl flex items-center justify-center mb-4`}>
                      <IconComponent className={`w-8 h-8 ${colorClasses.icon}`} />
                    </div>
                    <div className="text-4xl text-center">{feature.image}</div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {feature.description}
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      {feature.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <div className={`w-2 h-2 ${colorClasses.button.split(' ')[0]} rounded-full`}></div>
                          <span className="text-sm text-gray-600">{benefit}</span>
                        </div>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => navigate(feature.link)}
                      className={`${colorClasses.button} text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center space-x-2`}
                    >
                      <span>Explorar {feature.title}</span>
                      <IconComponent className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Workflow Section */}
        <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl border border-teal-200 p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Fluxo de Estudo Otimizado
            </h2>
            <p className="text-lg text-gray-600">
              Siga este fluxo para maximizar sua produtividade
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {[
              { step: 1, title: 'Organize', desc: 'Cadastre suas matérias', icon: GraduationCap, link: '/subjects' },
              { step: 2, title: 'Planeje', desc: 'Veja metas no Dashboard', icon: BarChart3, link: '/dashboard' },
              { step: 3, title: 'Foque', desc: 'Use o Timer Pomodoro', icon: Target, link: '/dashboard' },
              { step: 4, title: 'Pratique', desc: 'Faça exercícios com IA', icon: Sparkles, link: '/exercises' },
              { step: 5, title: 'Analise', desc: 'Revise nos Relatórios', icon: TrendingUp, link: '/reports' },
              { step: 6, title: 'Evolua', desc: 'Conquiste no Perfil', icon: Award, link: '/profile' }
            ].map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div key={idx} className="text-center cursor-pointer" onClick={() => navigate(item.link)}>
                  <div className="relative">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                      <IconComponent className="w-6 h-6 text-teal-600" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {item.step}
                    </div>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-xs text-gray-600">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
