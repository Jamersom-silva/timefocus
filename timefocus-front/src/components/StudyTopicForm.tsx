import { useState } from "react";

interface Props {
  onStart: (topic: string) => void;
}

export default function StudyTopicForm({ onStart }: Props) {
  const [topic, setTopic] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    onStart(topic);
    setTopic("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <label className="text-sm font-medium">Tema do Estudo:</label>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Ex: História - Revolução Francesa"
        className="p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Iniciar Estudo
      </button>
    </form>
  );
}
