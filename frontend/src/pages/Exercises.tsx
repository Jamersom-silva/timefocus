import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import type { ExerciseOut, ExerciseCreate, SubjectOut } from "../types/api";
import Header from "../components/Header";
import { BookOpen, Plus, Check, X, Sparkles, Grid3X3, Home } from "lucide-react";

export default function ExercisesPage() {
  const [exercises, setExercises] = useState<ExerciseOut[]>([]);
  const [subjects, setSubjects] = useState<SubjectOut[]>([]);
  const [newExercise, setNewExercise] = useState<ExerciseCreate>({
    subject_id: 0,
    question: "",
    answer: "",
  });
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [selectedSubject, setSelectedSubject] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  const [showNavigation, setShowNavigation] = useState(false);

  const navigate = useNavigate();

  const navigationOptions = [
    { name: 'Funcionalidades', icon: Grid3X3, description: 'Ver todas as funcionalidades', link: '/features' },
    { name: 'Dashboard', icon: Home, description: 'Voltar ao painel', link: '/' },
    { name: 'Timer Pomodoro', icon: BookOpen, description: 'Iniciar sessão de foco', link: '/pomodoro' },
    { name: 'Exercícios IA', icon: BookOpen, description: 'Praticar com exercícios', link: '/exercises' },
    { name: 'Matérias', icon: BookOpen, description: 'Gerenciar matérias', link: '/subjects' },
    { name: 'Relatórios', icon: BookOpen, description: 'Ver análises', link: '/reports' },
    { name: 'Perfil', icon: BookOpen, description: 'Configurações e conquistas', link: '/profile' },
    { name: 'Comunidade', icon: BookOpen, description: 'Conectar com estudantes', link: '/community' },
    { name: 'Artigos', icon: BookOpen, description: 'Dicas de estudo', link: '/articles' }
  ];

  const handleNavigation = (link: string) => {
    navigate(link);
    setShowNavigation(false);
  };

  const fetchExercises = async () => {
    try {
      const res = await api.getExercises();
      setExercises(res);
    } catch (err) {
      console.error("Erro ao buscar exercises:", err);
    }
  };

  const fetchSubjects = async () => {
    try {
      const res = await api.getSubjects();
      setSubjects(res);
    } catch (err) {
      console.error("Erro ao buscar subjects:", err);
    }
  };

  const createExercise = async () => {
    if (!newExercise.subject_id || !newExercise.question.trim()) return;
    try {
      await api.createExercise(newExercise);
      setNewExercise({ subject_id: 0, question: "", answer: "" });
      setShowCreateForm(false);
      fetchExercises();
    } catch (err) {
      console.error("Erro ao criar exercise:", err);
    }
  };

  const toggleComplete = async (exercise: ExerciseOut) => {
    try {
      await api.updateExercise(exercise.id, { completed: !exercise.completed });
      fetchExercises();
    } catch (err) {
      console.error("Erro ao atualizar exercise:", err);
    }
  };

  const generateAIExercise = async () => {
    const aiQuestions = [
      "Qual é a derivada de x²?",
      "Explique o teorema de Pitágoras",
      "O que foi a Revolução Francesa?",
      "Como conjugar o verbo 'to be' no presente?",
      "Qual é a fórmula da área do círculo?"
    ];
    const randomQuestion = aiQuestions[Math.floor(Math.random() * aiQuestions.length)];
    setNewExercise({ ...newExercise, question: randomQuestion });
    setShowCreateForm(true);
  };

  useEffect(() => {
    fetchExercises();
    fetchSubjects();
  }, []);

  const filteredExercises = exercises.filter(exercise => {
    const matchesFilter = filter === 'all' ||
      (filter === 'completed' && exercise.completed) ||
      (filter === 'pending' && !exercise.completed);
    const matchesSubject = selectedSubject === 0 || exercise.subject_id === selectedSubject;
    const matchesSearch = searchTerm === "" ||
      exercise.question.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSubject && matchesSearch;
  });

  const stats = {
    total: exercises.length,
    completed: exercises.filter(e => e.completed).length,
    pending: exercises.filter(e => !e.completed).length
  };

  return (
    <div className="exercises-page min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navbar + Outras Opções */}
        <div className="flex items-center justify-between mb-8 bg-white rounded-xl shadow-sm border p-4">
          <div className="flex items-center space-x-4">
            <BookOpen className="w-5 h-5 text-teal-600" />
            <span className="text-lg font-semibold text-gray-900">Exercícios</span>
          </div>

          {/* Menu "Outras Opções" */}
          <div className="relative">
            <button
              onClick={() => setShowNavigation(!showNavigation)}
              className="flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100 transition"
            >
              <Grid3X3 size={18} />
              Outras Opções
            </button>

            {showNavigation && (
              <div className="absolute right-0 mt-2 w-72 bg-white border rounded-xl shadow-lg z-20 p-2">
                {navigationOptions.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleNavigation(item.link)}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-teal-50 transition w-full text-left"
                  >
                    <item.icon size={20} className="text-teal-600 mt-1" />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Concluídos</p>
                <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Check className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pendentes</p>
                <p className="text-3xl font-bold text-orange-600">{stats.pending}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <X className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              {/* Search */}
              <div className="relative">
                <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar exercícios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              {/* Subject Filter */}
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(Number(e.target.value))}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value={0}>Todas as matérias</option>
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>

              {/* Status Filter */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                {[
                  { key: 'all', label: 'Todos' },
                  { key: 'pending', label: 'Pendentes' },
                  { key: 'completed', label: 'Concluídos' }
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setFilter(item.key as any)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      filter === item.key
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={generateAIExercise}
                className="flex items-center space-x-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <Sparkles className="w-5 h-5" />
                <span>Gerar com IA</span>
              </button>

              <button
                onClick={() => setShowCreateForm(true)}
                className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Novo Exercício</span>
              </button>
            </div>
          </div>
        </div>

        {/* Create Form Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Novo Exercício</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Matéria
                  </label>
                  <select
                    value={newExercise.subject_id}
                    onChange={(e) => setNewExercise({ ...newExercise, subject_id: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value={0}>Selecione uma matéria</option>
                    {subjects.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Questão
                  </label>
                  <textarea
                    value={newExercise.question}
                    onChange={(e) => setNewExercise({ ...newExercise, question: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    rows={3}
                    placeholder="Digite a questão..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resposta (opcional)
                  </label>
                  <textarea
                    value={newExercise.answer}
                    onChange={(e) => setNewExercise({ ...newExercise, answer: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    rows={2}
                    placeholder="Digite a resposta..."
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={createExercise}
                  className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Criar Exercício
                </button>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Exercises List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {filteredExercises.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {filteredExercises.map((exercise) => {
                const subject = subjects.find(s => s.id === exercise.subject_id);
                return (
                  <div key={exercise.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {subject?.name || 'Sem matéria'}
                          </span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            exercise.completed 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-orange-100 text-orange-800'
                          }`}>
                            {exercise.completed ? 'Concluído' : 'Pendente'}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          {exercise.question}
                        </h3>
                        
                        {exercise.answer && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm font-medium text-gray-700 mb-1">Resposta:</p>
                            <p className="text-sm text-gray-600">{exercise.answer}</p>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => toggleComplete(exercise)}
                        className={`ml-4 flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                          exercise.completed
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            : 'bg-green-500 text-white hover:bg-green-600'
                        }`}
                      >
                        {exercise.completed ? (
                          <>
                            <X className="w-4 h-4" />
                            <span>Desmarcar</span>
                          </>
                        ) : (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Concluir</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum exercício encontrado</h3>
              <p className="text-gray-600 mb-6">
                {exercises.length === 0 
                  ? 'Comece criando seu primeiro exercício!' 
                  : 'Tente ajustar os filtros de busca.'}
              </p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="inline-flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Criar Primeiro Exercício</span>
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
