// frontend/src/pages/Exercises/Exercises.tsx
import { useState, useEffect, useContext } from "react";
import Header from "../../components/Header/Header";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { api } from "../../services/api";
import { UserContext } from "../../contexts/UserContext";
import type { ExerciseOut, ExerciseCreate, SubjectOut } from "../../types/api";

export default function ExercisesPage() {
  const { user } = useContext(UserContext)!;
  const [exercises, setExercises] = useState<ExerciseOut[]>([]);
  const [subjects, setSubjects] = useState<SubjectOut[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Buscar exercícios e assuntos
  const fetchData = async () => {
    try {
      const [exs, subs] = await Promise.all([api.getExercises(), api.getSubjects()]);
      setExercises(exs);
      setSubjects(subs);
    } catch (err: any) {
      setError(err.detail || "Erro ao buscar dados");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Criar novo exercício
  const addExercise = async () => {
    if (!selectedSubjectId || !question) {
      setError("Selecione o assunto e escreva a pergunta");
      return;
    }

    setLoading(true);
    setError("");
    const newExercise: ExerciseCreate = {
      subject_id: selectedSubjectId,
      question,
      ai_generated: true, // pode indicar se foi gerado automaticamente
    };

    try {
      const created = await api.createExercise(newExercise);
      setExercises((prev) => [created, ...prev]);
      setQuestion("");
    } catch (err: any) {
      setError(err.detail || "Erro ao criar exercício");
    } finally {
      setLoading(false);
    }
  };

  // Marcar exercício como concluído
  const markComplete = async (exerciseId: number) => {
    // Se quiser integrar com backend, criar endpoint PATCH/PUT para marcar concluído
    setExercises((prev) =>
      prev.map((ex) => (ex.id === exerciseId ? { ...ex, answer: "Concluído" } : ex))
    );
  };

  return (
    <div className="home-page min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 p-6 bg-gray-50 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">Exercícios</h1>

        <div className="bg-white shadow rounded-lg p-6 w-full max-w-md flex flex-col gap-4 mb-6">
          <label className="flex flex-col">
            Assunto:
            <select
              value={selectedSubjectId ?? ""}
              onChange={(e) => setSelectedSubjectId(Number(e.target.value))}
              className="border rounded p-2 mt-1"
            >
              <option value="">Selecione um assunto</option>
              {subjects.map((subj) => (
                <option key={subj.id} value={subj.id}>
                  {subj.name}
                </option>
              ))}
            </select>
          </label>

          <Input
            label="Pergunta"
            type="text"
            placeholder="Escreva a pergunta"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          {error && <p className="text-red-500">{error}</p>}

          <Button variant="primary" size="lg" disabled={loading} onClick={addExercise}>
            {loading ? "Adicionando..." : "Adicionar Exercício"}
          </Button>
        </div>

        <h2 className="text-2xl font-semibold mb-2">Lista de Exercícios</h2>
        <ul className="w-full max-w-md flex flex-col gap-2">
          {exercises.map((ex) => (
            <li key={ex.id} className="bg-white shadow p-3 rounded flex flex-col">
              <span className="font-semibold">{ex.question}</span>
              <span className="text-gray-600 text-sm">
                {ex.answer ? `Resposta: ${ex.answer}` : "Ainda não respondido"}
              </span>
              {!ex.answer && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => markComplete(ex.id)}
                >
                  Marcar como concluído
                </Button>
              )}
            </li>
          ))}
          {exercises.length === 0 && <li className="text-gray-500">Nenhum exercício cadastrado ainda.</li>}
        </ul>
      </main>
    </div>
  );
}
