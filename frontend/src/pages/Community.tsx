import Header from "../components/Header";
import { Users, MessageCircle, Trophy, Star, Calendar, TrendingUp, Heart, Share2, BookOpen, Clock, Award, Target } from "lucide-react";
import { useState } from "react";

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("feed");

  const communityStats = [
    { icon: Users, label: "Membros Ativos", value: "12.5k", color: "teal" },
    { icon: MessageCircle, label: "Discussões", value: "3.2k", color: "blue" },
    { icon: Trophy, label: "Conquistas", value: "850", color: "yellow" },
    { icon: BookOpen, label: "Estudos Compartilhados", value: "5.7k", color: "purple" }
  ];

  const feedPosts = [
    {
      id: 1,
      author: {
        name: "Maria Silva",
        avatar: "👩‍🎓",
        level: "Estudante Dedicada",
        streak: 45
      },
      content: "Acabei de completar 30 dias consecutivos usando a técnica Pomodoro! 🍅 A diferença na minha produtividade é incrível. Quem mais está tentando manter uma rotina consistente?",
      timestamp: "2h atrás",
      likes: 24,
      comments: 8,
      tags: ["Pomodoro", "Produtividade", "Conquista"],
      type: "achievement"
    },
    {
      id: 2,
      author: {
        name: "João Santos",
        avatar: "👨‍💻",
        level: "Mestre dos Estudos",
        streak: 120
      },
      content: "Dica do dia: Criei um cronograma de revisão espaçada para matemática e já vejo resultados! Alguém quer que eu compartilhe o template?",
      timestamp: "4h atrás",
      likes: 18,
      comments: 12,
      tags: ["Matemática", "Revisão", "Dica"],
      type: "tip",
      attachment: "📊 Template de Cronograma.pdf"
    },
    {
      id: 3,
      author: {
        name: "Ana Costa",
        avatar: "👩‍🔬",
        level: "Pesquisadora",
        streak: 78
      },
      content: "Estou organizando um grupo de estudos online para quem está se preparando para vestibular. Foco em exatas! Interessados, comentem aqui 👇",
      timestamp: "6h atrás",
      likes: 31,
      comments: 15,
      tags: ["Vestibular", "Exatas", "Grupo de Estudos"],
      type: "event"
    },
    {
      id: 4,
      author: {
        name: "Carlos Oliveira",
        avatar: "👨‍🎓",
        level: "Estudante Focado",
        streak: 23
      },
      content: "Alguém tem dicas para manter a concentração durante sessões longas de estudo? Estou tendo dificuldades após 2 horas...",
      timestamp: "8h atrás",
      likes: 12,
      comments: 20,
      tags: ["Concentração", "Ajuda", "Dúvida"],
      type: "question"
    }
  ];

  const leaderboard = [
    { rank: 1, name: "Sofia Mendes", avatar: "👩‍🎓", points: 2450, streak: 180, badge: "🏆" },
    { rank: 2, name: "Pedro Lima", avatar: "👨‍💼", points: 2380, streak: 165, badge: "🥈" },
    { rank: 3, name: "Lucia Santos", avatar: "👩‍🔬", points: 2290, streak: 142, badge: "🥉" },
    { rank: 4, name: "Rafael Costa", avatar: "👨‍🎓", points: 2180, streak: 128, badge: "⭐" },
    { rank: 5, name: "Amanda Silva", avatar: "👩‍💻", points: 2050, streak: 115, badge: "⭐" }
  ];

  const studyGroups = [
    {
      id: 1,
      name: "Medicina ENEM 2024",
      description: "Grupo focado em preparação para medicina no ENEM",
      members: 234,
      category: "Vestibular",
      activity: "Muito Ativa",
      image: "🏥",
      nextSession: "Hoje, 19h"
    },
    {
      id: 2,
      name: "Programação para Iniciantes",
      description: "Aprendendo lógica de programação juntos",
      members: 189,
      category: "Tecnologia",
      activity: "Ativa",
      image: "💻",
      nextSession: "Amanhã, 20h"
    },
    {
      id: 3,
      name: "Concurso Público - Direito",
      description: "Preparação para concursos na área jurídica",
      members: 156,
      category: "Concursos",
      activity: "Moderada",
      image: "⚖️",
      nextSession: "Sábado, 14h"
    },
    {
      id: 4,
      name: "Inglês Fluente",
      description: "Prática de conversação e gramática",
      members: 298,
      category: "Idiomas",
      activity: "Muito Ativa",
      image: "🇺🇸",
      nextSession: "Hoje, 18h"
    }
  ];

  const challenges = [
    {
      id: 1,
      title: "Desafio 30 Dias Pomodoro",
      description: "Complete 30 sessões Pomodoro consecutivas",
      progress: 23,
      total: 30,
      reward: "Badge Tomate de Ouro 🥇",
      participants: 1250,
      timeLeft: "7 dias"
    },
    {
      id: 2,
      title: "Maratona de Leitura",
      description: "Leia 5 livros acadêmicos este mês",
      progress: 2,
      total: 5,
      reward: "Badge Leitor Voraz 📚",
      participants: 890,
      timeLeft: "12 dias"
    },
    {
      id: 3,
      title: "Streak Master",
      description: "Mantenha uma sequência de 60 dias estudando",
      progress: 45,
      total: 60,
      reward: "Badge Consistência Máxima ⚡",
      participants: 567,
      timeLeft: "15 dias"
    }
  ];

  const getPostTypeIcon = (type: string) => {
    const icons = {
      achievement: Trophy,
      tip: Star,
      event: Calendar,
      question: MessageCircle
    };
    return icons[type as keyof typeof icons] || MessageCircle;
  };

  const getPostTypeColor = (type: string) => {
    const colors = {
      achievement: "bg-yellow-100 text-yellow-700",
      tip: "bg-blue-100 text-blue-700",
      event: "bg-purple-100 text-purple-700",
      question: "bg-green-100 text-green-700"
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-700";
  };

  const getActivityColor = (activity: string) => {
    const colors = {
      "Muito Ativa": "bg-green-100 text-green-700",
      "Ativa": "bg-blue-100 text-blue-700",
      "Moderada": "bg-yellow-100 text-yellow-700"
    };
    return colors[activity as keyof typeof colors] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="community-page min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium mb-6">
            <Users className="w-4 h-4 mr-2" />
            Comunidade TimeFocus
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Estude em{" "}
            <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Comunidade
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Conecte-se com milhares de estudantes, compartilhe conquistas, 
            participe de desafios e cresça junto com nossa comunidade.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {communityStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center mx-auto mb-4`}>
                  <IconComponent className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="flex flex-wrap border-b border-gray-200">
            {[
              { id: "feed", label: "Feed da Comunidade", icon: MessageCircle },
              { id: "groups", label: "Grupos de Estudo", icon: Users },
              { id: "challenges", label: "Desafios", icon: Trophy },
              { id: "leaderboard", label: "Ranking", icon: Award }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-teal-500 text-teal-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === "feed" && (
              <div className="space-y-6">
                {/* Create Post */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                      <span className="text-xl">👤</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Compartilhe suas conquistas ou faça uma pergunta..."
                      className="flex-1 bg-gray-100 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:bg-white transition-colors"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-4">
                      <button className="text-gray-600 hover:text-teal-600 text-sm">📷 Foto</button>
                      <button className="text-gray-600 hover:text-teal-600 text-sm">📊 Progresso</button>
                      <button className="text-gray-600 hover:text-teal-600 text-sm">🏆 Conquista</button>
                    </div>
                    <button className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg font-medium">
                      Compartilhar
                    </button>
                  </div>
                </div>

                {/* Feed Posts */}
                {feedPosts.map((post) => {
                  const PostIcon = getPostTypeIcon(post.type);
                  return (
                    <div key={post.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
                          {post.author.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm text-gray-500">{post.author.level}</span>
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm text-gray-500">{post.timestamp}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2 mb-3">
                            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getPostTypeColor(post.type)}`}>
                              <PostIcon className="w-3 h-3 mr-1" />
                              {post.type === 'achievement' && 'Conquista'}
                              {post.type === 'tip' && 'Dica'}
                              {post.type === 'event' && 'Evento'}
                              {post.type === 'question' && 'Pergunta'}
                            </div>
                            <div className="flex items-center text-xs text-gray-500">
                              <Target className="w-3 h-3 mr-1" />
                              {post.author.streak} dias consecutivos
                            </div>
                          </div>

                          <p className="text-gray-700 mb-4">{post.content}</p>

                          {post.attachment && (
                            <div className="bg-gray-50 rounded-lg p-3 mb-4">
                              <div className="flex items-center text-sm text-gray-600">
                                <BookOpen className="w-4 h-4 mr-2" />
                                {post.attachment}
                              </div>
                            </div>
                          )}

                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                #{tag}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex items-center space-x-6">
                              <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500">
                                <Heart className="w-4 h-4" />
                                <span className="text-sm">{post.likes}</span>
                              </button>
                              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500">
                                <MessageCircle className="w-4 h-4" />
                                <span className="text-sm">{post.comments}</span>
                              </button>
                              <button className="flex items-center space-x-2 text-gray-600 hover:text-green-500">
                                <Share2 className="w-4 h-4" />
                                <span className="text-sm">Compartilhar</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === "groups" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Grupos de Estudo</h2>
                  <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg font-medium">
                    Criar Grupo
                  </button>
                </div>

                {studyGroups.map((group) => (
                  <div key={group.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-3xl">
                        {group.image}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{group.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs ${getActivityColor(group.activity)}`}>
                            {group.activity}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-3">{group.description}</p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {group.members} membros
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {group.nextSession}
                          </div>
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded">
                            {group.category}
                          </span>
                        </div>

                        <div className="flex space-x-3">
                          <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                            Participar
                          </button>
                          <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium">
                            Ver Detalhes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "challenges" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Desafios Ativos</h2>
                  <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg font-medium">
                    Criar Desafio
                  </button>
                </div>

                {challenges.map((challenge) => (
                  <div key={challenge.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{challenge.title}</h3>
                        <p className="text-gray-600 mb-3">{challenge.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500 mb-1">Termina em</div>
                        <div className="font-semibold text-orange-600">{challenge.timeLeft}</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                        <span>Progresso: {challenge.progress}/{challenge.total}</span>
                        <span>{Math.round((challenge.progress / challenge.total) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-teal-500 h-2 rounded-full transition-all"
                          style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Trophy className="w-4 h-4 mr-1" />
                          {challenge.reward}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {challenge.participants} participantes
                        </div>
                      </div>
                      <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                        Participar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "leaderboard" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900">Ranking da Comunidade</h2>
                  <p className="text-gray-600">Os estudantes mais dedicados desta semana</p>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {leaderboard.map((user) => (
                    <div key={user.rank} className="p-6 flex items-center space-x-4">
                      <div className="text-2xl font-bold text-gray-400 w-8">
                        {user.rank}
                      </div>
                      <div className="text-2xl">{user.badge}</div>
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
                        {user.avatar}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{user.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 mr-1" />
                            {user.points} pontos
                          </div>
                          <div className="flex items-center">
                            <Target className="w-4 h-4 mr-1" />
                            {user.streak} dias consecutivos
                          </div>
                        </div>
                      </div>
                      <button className="text-teal-600 hover:text-teal-700 font-medium text-sm">
                        Seguir
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Suas Estatísticas</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Sequência atual</span>
                  <span className="font-semibold text-teal-600">23 dias</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Pontos totais</span>
                  <span className="font-semibold text-blue-600">1,850</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Posição no ranking</span>
                  <span className="font-semibold text-purple-600">#127</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Grupos participando</span>
                  <span className="font-semibold text-green-600">3</span>
                </div>
              </div>
            </div>

            {/* Trending Topics */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Tópicos em Alta</h3>
              <div className="space-y-3">
                {[
                  { tag: "Pomodoro", posts: 45 },
                  { tag: "Vestibular2024", posts: 38 },
                  { tag: "Matemática", posts: 32 },
                  { tag: "Concursos", posts: 28 },
                  { tag: "Inglês", posts: 24 }
                ].map((topic, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-teal-500 mr-2" />
                      <span className="text-gray-900">#{topic.tag}</span>
                    </div>
                    <span className="text-sm text-gray-500">{topic.posts} posts</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Próximos Eventos</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-teal-500 pl-4">
                  <h4 className="font-medium text-gray-900">Webinar: Técnicas de Memorização</h4>
                  <p className="text-sm text-gray-600">Hoje, 19h</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium text-gray-900">Maratona de Estudos</h4>
                  <p className="text-sm text-gray-600">Sábado, 14h</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-medium text-gray-900">Q&A com Especialistas</h4>
                  <p className="text-sm text-gray-600">Domingo, 16h</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}