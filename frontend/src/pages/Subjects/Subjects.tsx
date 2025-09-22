// frontend/src/pages/Subjects/Subjects.tsx
import { useState, useEffect, useContext } from "react";
import Header from "../../components/Header/Header";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { api } from "../../services/api";
import { UserContext } from "../../contexts/UserContext";
import type { SubjectOut, SubjectCreate } from "../../types/api";

export default function SubjectsPage() {
  const { user } = useContext(UserContext)!;
  const [subjects, setSubjects] = useState<SubjectOut[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Buscar assuntos do usuário
  const fetchSubjects = async () => {
    try {
      const data = await api.getSubjects();
      setSubjects(data);
    } catch (err: any) {
      setError(err.detail || "Erro ao buscar assuntos");
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  // Criar novo assunto
  const addSubject = async () => {
    if (!name) {
      setError("O nome do assunto é obrigatório");
      return;
    }

    setLoading(true);
    setError("");
    const newSubject: SubjectCreate = { name, description };

    try {
      const created = await api.createSubject(newSubject);
      setSubjects((prev) => [created, ...prev]);
      setName("");
      setDescription("");
    } catch (err: any) {
      setError(err.detail || "Erro ao criar assunto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 p-6 bg-gray-50 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">Assuntos</h1>

        <div className="bg-white shadow rounded-lg p-6 w-full max-w-md flex flex-col gap-4 mb-6">
          <Input
            label="Nome do Assunto"
            type="text"
            placeholder="Ex.: Matemática"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Descrição (opcional)"
            type="text"
            placeholder="Breve descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {error && <p className="text-red-500">{error}</p>}

          <Button variant="primary" size="lg" disabled={loading} onClick={addSubject}>
            {loading ? "Adicionando..." : "Adicionar Assunto"}
          </Button>
        </div>

        <h2 className="text-2xl font-semibold mb-2">Lista de Assuntos</h2>
        <ul className="w-full max-w-md flex flex-col gap-2">
          {subjects.map((subj) => (
            <li key={subj.id} className="bg-white shadow p-3 rounded flex flex-col">
              <span className="font-semibold">{subj.name}</span>
              {subj.description && <span className="text-gray-600 text-sm">{subj.description}</span>}
            </li>
          ))}
          {subjects.length === 0 && <li className="text-gray-500">Nenhum assunto cadastrado ainda.</li>}
        </ul>
      </main>
    </div>
  );
}
