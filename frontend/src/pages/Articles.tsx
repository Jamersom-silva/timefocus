import Header from "../components/Header";
import { BookOpen, Clock, User, Calendar, ArrowRight, Search, Filter, TrendingUp } from "lucide-react";
import { useState } from "react";

export default function ArticlesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "Todos os Artigos", count: 24 },
    { id: "pomodoro", name: "Técnica Pomodoro", count: 8 },
    { id: "memorization", name: "Memorização", count: 6 },
    { id: "productivity", name: "Produtividade", count: 5 },
    { id: "motivation", name: "Motivação", count: 3 },
    { id: "organization", name: "Organização", count: 2 }
  ];

  const featuredArticles = [
    {
      id: 1,
      title: "Guia Completo da Técnica Pomodoro: Como Maximizar sua Concentração",
      excerpt: "Descubra como a técnica Pomodoro pode revolucionar seus estudos com ciclos de 25 minutos de foco total.",
      category: "pomodoro",
      readTime: "8 min",
      author: "Dr. Maria Silva",
      date: "2024-01-15",
      image: "🍅",
      featured: true,
      tags: ["Concentração", "Produtividade", "Técnicas de Estudo"]
    },
    {
      id: 2,
      title: "Mapas Mentais: A Ferramenta Visual para Memorização Eficaz",
      excerpt: "Aprenda a criar mapas mentais poderosos que transformam informações complexas em conhecimento duradouro.",
      category: "memorization",
      readTime: "6 min",
      author: "Prof. João Santos",
      date: "2024-01-12",
      image: "🧠",
      featured: true,
      tags: ["Mapas Mentais", "Memorização", "Aprendizado Visual"]
    },
    {
      id: 3,
      title: "Método Feynman: Aprenda Qualquer Coisa Explicando de Forma Simples",
      excerpt: "O segredo dos gênios revelado: como ensinar para aprender e dominar qualquer assunto complexo.",
      category: "memorization",
      readTime: "7 min",
      author: "Ana Costa",
      date: "2024-01-10",
      image: "🎓",
      featured: true,
      tags: ["Método Feynman", "Compreensão", "Ensino"]
    }
  ];

  const articles = [
    {
      id: 4,
      title: "Técnica de Repetição Espaçada: Memorize para Sempre",
      excerpt: "Como usar intervalos científicos para fixar informações na memória de longo prazo.",
      category: "memorization",
      readTime: "5 min",
      author: "Dr. Carlos Lima",
      date: "2024-01-08",
      image: "📚",
      tags: ["Repetição Espaçada", "Memória", "Retenção"]
    },
    {
      id: 5,
      title: "Ambiente de Estudo Perfeito: Como Criar seu Espaço Ideal",
      excerpt: "Dicas práticas para organizar um ambiente que potencialize sua concentração e produtividade.",
      category: "organization",
      readTime: "4 min",
      author: "Laura Oliveira",
      date: "2024-01-05",
      image: "🏠",
      tags: ["Ambiente", "Organização", "Foco"]
    },
    {
      id: 6,
      title: "Cronograma de Estudos: Planejamento que Funciona",
      excerpt: "Estratégias comprovadas para criar um cronograma realista e sustentável.",
      category: "organization",
      readTime: "6 min",
      author: "Prof. Roberto Silva",
      date: "2024-01-03",
      image: "📅",
      tags: ["Planejamento", "Cronograma", "Organização"]
    },
    {
      id: 7,
      title: "Combatendo a Procrastinação: Técnicas Psicológicas Eficazes",
      excerpt: "Entenda a ciência por trás da procrastinação e aprenda métodos para superá-la definitivamente.",
      category: "motivation",
      readTime: "9 min",
      author: "Dra. Patricia Mendes",
      date: "2024-01-01",
      image: "⚡",
      tags: ["Procrastinação", "Motivação", "Psicologia"]
    },
    {
      id: 8,
      title: "Técnica Cornell: Anotações que Realmente Funcionam",
      excerpt: "Sistema de anotações desenvolvido em Cornell que melhora compreensão e revisão.",
      category: "productivity",
      readTime: "5 min",
      author: "Prof. Amanda Torres",
      date: "2023-12-28",
      image: "📝",
      tags: ["Anotações", "Cornell", "Organização"]
    },
    {
      id: 9,
      title: "Flow State: Como Entrar no Estado de Máxima Concentração",
      excerpt: "Descubra os segredos para alcançar o estado de flow e ter sessões de estudo ultra-produtivas.",
      category: "productivity",
      readTime: "7 min",
      author: "Dr. Felipe Rocha",
      date: "2023-12-25",
      image: "🌊",
      tags: ["Flow", "Concentração", "Performance"]
    }
  ];

  const allArticles = [...featuredArticles, ...articles];

  const filteredArticles = allArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      pomodoro: "bg-red-100 text-red-700",
      memorization: "bg-blue-100 text-blue-700",
      productivity: "bg-green-100 text-green-700",
      motivation: "bg-purple-100 text-purple-700",
      organization: "bg-yellow-100 text-yellow-700"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-700";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <div className="articles-page min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4 mr-2" />
            Blog de Estudos
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Métodos de{" "}
            <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Estudo Eficazes
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Descubra técnicas comprovadas cientificamente para maximizar seu aprendizado 
            e alcançar resultados extraordinários nos estudos.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar artigos, técnicas ou temas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none bg-white"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name} ({category.count})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <TrendingUp className="w-4 h-4" />
              <span>{filteredArticles.length} artigos encontrados</span>
            </div>
          </div>
        </div>

        {/* Featured Articles */}
        {selectedCategory === "all" && searchTerm === "" && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Artigos em Destaque</h2>
              <div className="w-20 h-1 bg-teal-500 rounded"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredArticles.map((article, index) => (
                <div key={article.id} className={`bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                        {categories.find(cat => cat.id === article.category)?.name}
                      </span>
                      <div className="text-6xl">{article.image}</div>
                    </div>
                    
                    <h3 className={`font-bold text-gray-900 mb-3 ${index === 0 ? 'text-2xl' : 'text-lg'}`}>
                      {article.title}
                    </h3>
                    
                    <p className={`text-gray-600 mb-4 ${index === 0 ? 'text-base' : 'text-sm'}`}>
                      {article.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(article.date)}</span>
                      </div>
                    </div>

                    <button className="w-full mt-4 bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                      <span>Ler Artigo</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Articles */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {selectedCategory === "all" && searchTerm === "" ? "Todos os Artigos" : "Resultados da Busca"}
            </h2>
            <div className="w-20 h-1 bg-blue-500 rounded"></div>
          </div>

          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <div key={article.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                        {categories.find(cat => cat.id === article.category)?.name}
                      </span>
                      <div className="text-4xl">{article.image}</div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {article.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                      {article.tags.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          +{article.tags.length - 2}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    <button className="w-full bg-gray-100 hover:bg-teal-500 hover:text-white text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                      <span>Ler Artigo</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum artigo encontrado</h3>
              <p className="text-gray-600 mb-6">
                Tente ajustar sua busca ou explorar outras categorias.
              </p>
              <button 
                onClick={() => {setSearchTerm(""); setSelectedCategory("all");}}
                className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Ver Todos os Artigos
              </button>
            </div>
          )}
        </div>

        {/* Newsletter CTA */}
        <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl p-8 text-white text-center mt-16">
          <h2 className="text-3xl font-bold mb-4">Receba Novos Artigos por Email</h2>
          <p className="text-teal-100 mb-8 max-w-2xl mx-auto">
            Inscreva-se em nossa newsletter e seja o primeiro a receber dicas exclusivas 
            sobre técnicas de estudo e produtividade.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Seu melhor email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
            />
            <button className="bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Inscrever-se
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}