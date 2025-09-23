import { useState, useEffect, useCallback, useContext } from "react";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { UserContext } from "../../contexts/UserContext";
import { api } from "../../services/api";
import type { SubjectOut } from "../../types/api";

export default function SubjectsPage() {
  const { user } = useContext(UserContext)!;
  const [subjects, setSubjects] = useState<SubjectOut[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchSubjects = useCallback(async () => {
    try {
      const data = await api.getSubjects();
      setSubjects(data);
    } catch (err) {
      console.error("Erro ao buscar subjects:", err);
    }
  }, []);

  const addSubject = async () => {
    if (!name) return;
    setLoading(true);
    try {
      await api.createSubject({ name, description });
      setName("");
      setDescription("");
      fetchSubjects();
    } catch (err) {
      console.error("Erro ao criar subject:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  return (
    <div className="home-page min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 p-6 bg-gray-50 flex flex-col items-center">
        {user && <p className="mb-4 text-lg font-medium">Olá, {user.username}!</p>}

        <h1 className="text-3xl font-bold mb-4">Subjects</h1>

        <div className="mb-6 w-full max-w-md flex flex-col gap-2">
          <Input
            label="Nome do Subject"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Descrição (opcional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button variant="primary" onClick={addSubject} disabled={loading}>
            {loading ? "Salvando..." : "Adicionar Subject"}
          </Button>
        </div>

        <div className="w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2">Lista de Subjects</h2>
          <ul>
            {subjects.map((subject) => (
              <li key={subject.id} className="mb-1 border-b pb-1">
                <strong>{subject.name}</strong>
                {subject.description && ` - ${subject.description}`}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
