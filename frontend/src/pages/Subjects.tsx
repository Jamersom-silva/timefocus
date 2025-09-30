import { useState, useEffect, useCallback, useContext } from "react";
import Header from "../../components/Header/Header";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { UserContext } from "../../contexts/UserContext";
import { api } from "../../services/api";
import type { SubjectOut } from "../../types/api";
import { BookOpen, Plus, Edit3, Trash2, Search, Filter, GraduationCap } from "lucide-react";

export default function SubjectsPage() {
  const { user } = useContext(UserContext)!;
  const [subjects, setSubjects] = useState<SubjectOut[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingSubject, setEditingSubject] = useState<SubjectOut | null>(null);

  const fetchSubjects = useCallback(async () => {
    try {
      const data = await api.getSubjects();
      setSubjects(data);
    } catch (err) {
      console.error("Erro ao buscar subjects:", err);
    }
  }, []);

  const addSubject = async () => {
    if (!name.trim()) return;
    setLoading(true);
    try {
      await api.createSubject({ name: name.trim(), description: description.trim() });
      setName("");
      setDescription("");
      setShowCreateForm(false);
      fetchSubjects();
    } catch (err) {
      console.error("Erro ao criar subject:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateSubject = async () => {
    if (!editingSubject || !name.trim()) return;
    setLoading(true);
    try {
      await api.updateSubject(editingSubject.id, { name: name.trim(), description: description.trim() });
      setName("");
      setDescription("");
      setEditingSubject(null);
      fetchSubjects();
    } catch (err) {
      console.error("Erro ao atualizar subject:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteSubject = async (subjectId: number) => {
    if (!confirm("Tem certeza que deseja excluir esta matéria?")) return;
    try {
      await api.deleteSubject(subjectId);
      fetchSubjects();
    } catch (err) {
      console.error("Erro ao excluir subject:", err);
    }
  };

  const startEditing = (subject: SubjectOut) => {
    setEditingSubject(subject);
    setName(subject.name);
    setDescription(subject.description || "");
    setShowCreateForm(true);
  };

  const cancelEditing = () => {
    setEditingSubject(null);
    setName("");
    setDescription("");
    setShowCreateForm(false);
  };

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  const filteredSubjects = subjects.filter(subject =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (subject.description && subject.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const subjectColors = [
    'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 
    'bg-pink-500', 'bg-indigo-500', 'bg-red-500', 'bg-yellow-500'
  ];

  return (
    <div className="subjects-page min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {user && (
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Olá, {user.username}! 👋
            </h1>
            <p className="text-gray-600">Organize suas matérias de estudo</p>
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Matérias</p>
                <p className="text-3xl font-bold text-gray-900">{subjects.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Matérias Ativas</p>
                <p className="text-3xl font-bold text-green-600">{subjects.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Mais Estudada</p>
                <p className="text-lg font-bold text-purple-600">
                  {subjects.length > 0 ? subjects[0].name : "Nenhuma"}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar matérias..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              onClick={() => setShowCreateForm(true)}
              className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Nova Matéria</span>
            </button>
          </div>
        </div>

        {/* Create/Edit Form Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {editingSubject ? 'Editar Matéria' : 'Nova Matéria'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome da Matéria
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Ex: Matemática, História..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição (opcional)
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    rows={3}
                    placeholder="Descrição da matéria..."
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={editingSubject ? updateSubject : addSubject}
                  disabled={loading || !name.trim()}
                  className="flex-1 bg-teal-500 hover:bg-teal-600 disabled:bg-gray-300 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  {loading ? "Salvando..." : editingSubject ? "Atualizar" : "Criar Matéria"}
                </button>
                <button
                  onClick={cancelEditing}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Subjects Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {filteredSubjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {filteredSubjects.map((subject, index) => (
                <div key={subject.id} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 ${subjectColors[index % subjectColors.length]} rounded-lg flex items-center justify-center`}>
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{subject.name}</h3>
                        {subject.description && (
                          <p className="text-sm text-gray-600 mt-1">{subject.description}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditing(subject)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteSubject(subject.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Subject Stats */}
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">0</p>
                      <p className="text-xs text-gray-600">Ciclos</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">0h</p>
                      <p className="text-xs text-gray-600">Tempo</p>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="mt-4 flex space-x-2">
                    <button className="flex-1 bg-teal-100 text-teal-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-teal-200 transition-colors">
                      Estudar
                    </button>
                    <button className="flex-1 bg-blue-100 text-blue-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
                      Exercícios
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {subjects.length === 0 ? 'Nenhuma matéria cadastrada' : 'Nenhuma matéria encontrada'}
              </h3>
              <p className="text-gray-600 mb-6">
                {subjects.length === 0 
                  ? 'Comece criando sua primeira matéria de estudo!' 
                  : 'Tente ajustar o termo de busca.'}
              </p>
              {subjects.length === 0 && (
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="inline-flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  <span>Criar Primeira Matéria</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Quick Tips */}
        {subjects.length > 0 && (
          <div className="mt-8 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl border border-teal-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Dicas para Organizar suas Matérias</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
                <p className="text-sm text-gray-700">
                  <strong>Seja específico:</strong> Use nomes claros como "Cálculo I" ao invés de apenas "Matemática".
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <p className="text-sm text-gray-700">
                  <strong>Use descrições:</strong> Adicione detalhes sobre o conteúdo ou professor.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <p className="text-sm text-gray-700">
                  <strong>Organize por prioridade:</strong> Foque nas matérias mais importantes primeiro.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <p className="text-sm text-gray-700">
                  <strong>Revise regularmente:</strong> Mantenha suas matérias atualizadas.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}