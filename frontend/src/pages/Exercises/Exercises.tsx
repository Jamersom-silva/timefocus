import Header from "../../components/Header/Header";
import { useState } from "react";

export default function ExercisesPage() {
  // Lista estática simulando exercícios (depois vem da IA/backend)
  const [exercises, setExercises] = useState([
    { id: 1, text: "Resolva 5 questões de equações do 2º grau", done: false },
    { id: 2, text: "Resuma o capítulo de Revolução Francesa", done: false },
    { id: 3, text: "Traduza um texto simples em inglês", done: true },
  ]);

  // Função para marcar exercício como concluído
  const toggleDone = (id: number) => {
    setExercises(exercises.map(e =>
      e.id === id ? { ...e, done: !e.done } : e
    ));
  };

  return (
    <div className="exercises-page">
      <Header />

      <div className="exercises-content p-4">
        <h1 className="text-3xl font-bold">Exercícios</h1>
        <p>Acompanhe e conclua seus exercícios gerados pela IA.</p>

        {/* Lista */}
        <ul className="mt-4 space-y-2">
          {exercises.map(ex => (
            <li key={ex.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={ex.done}
                onChange={() => toggleDone(ex.id)}
              />
              <span className={ex.done ? "line-through text-gray-500" : ""}>
                {ex.text}
              </span>
            </li>
          ))}
        </ul>

        {/* Botão de geração (placeholder) */}
        <div className="mt-6">
          <button className="px-4 py-2 bg-green-500 text-white rounded">
            Gerar novos exercícios (IA)
          </button>
        </div>
      </div>
    </div>
  );
}
