// frontend/src/pages/Exercises/Exercises.tsx
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import type { ExerciseOut, ExerciseCreate, SubjectOut } from "../../types/api";

export default function ExercisesPage() {
  const [exercises, setExercises] = useState<ExerciseOut[]>([]);
  const [subjects, setSubjects] = useState<SubjectOut[]>([]);
  const [newExercise, setNewExercise] = useState<ExerciseCreate>({
    subject_id: 0,
    question: "",
    answer: "",
  });

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

  useEffect(() => {
    fetchExercises();
    fetchSubjects();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Exercises</h1>

      <div className="flex gap-2 mb-4">
        <select
          value={newExercise.subject_id}
          onChange={(e) => setNewExercise({ ...newExercise, subject_id: Number(e.target.value) })}
          className="border p-2 rounded"
        >
          <option value={0}>Selecione uma matéria</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Questão"
          value={newExercise.question}
          onChange={(e) => setNewExercise({ ...newExercise, question: e.target.value })}
          className="border p-2 rounded w-1/3"
        />
        <input
          type="text"
          placeholder="Resposta"
          value={newExercise.answer}
          onChange={(e) => setNewExercise({ ...newExercise, answer: e.target.value })}
          className="border p-2 rounded w-1/3"
        />
        <button
          onClick={createExercise}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Adicionar
        </button>
      </div>

      <ul className="space-y-2">
        {exercises.map((ex) => (
          <li
            key={ex.id}
            className={`p-2 border rounded flex justify-between items-center ${
              ex.completed ? "bg-green-100" : ""
            }`}
          >
            <div>
              <strong>{ex.question}</strong>
              {ex.answer && <p>Resposta: {ex.answer}</p>}
            </div>
            <button
              onClick={() => toggleComplete(ex)}
              className={`px-3 py-1 rounded ${
                ex.completed ? "bg-gray-500 text-white" : "bg-green-600 text-white"
              }`}
            >
              {ex.completed ? "Desmarcar" : "Concluir"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
