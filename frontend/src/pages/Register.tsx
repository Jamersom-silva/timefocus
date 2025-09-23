import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { UserContext } from "../../contexts/UserContext";
import type { User } from "../../contexts/UserTypes";
import { api } from "../../services/api"; // CORRIGIDO

export default function RegisterPage() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext)!;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Chama API para registrar
      await api.register({ username, email, password });

      // Após registro, busca usuário atual
      const currentUserFromApi: User = await api.getCurrentUser();

      // Atualiza contexto
      const currentUser: User = {
        id: currentUserFromApi.id,
        email: currentUserFromApi.email,
        username: currentUserFromApi.username,
      };
      setUser(currentUser);

      navigate("/dashboard");
    } catch (err: unknown) {
      if (err && typeof err === "object" && "detail" in err) {
        setError((err as { detail: string }).detail);
      } else {
        setError("Erro ao cadastrar");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 p-6 bg-gray-50 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-2">Cadastro</h1>
        <h2 className="text-lg text-gray-600 mb-6 text-center max-w-md">
          Crie sua conta para aproveitar todas as funcionalidades do TimeFocus.
        </h2>

        <form
          onSubmit={handleRegister}
          className="bg-white shadow rounded-lg p-6 w-full max-w-md flex flex-col gap-4"
        >
          <Input
            label="Nome"
            type="text"
            placeholder="Seu nome"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            label="E-mail"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Senha"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500">{error}</p>}

          <Button variant="primary" size="lg" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </Button>

          <div className="flex justify-between text-sm text-blue-500 mt-2">
            <button type="button" onClick={() => navigate("/login")}>
              Já tenho conta
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
