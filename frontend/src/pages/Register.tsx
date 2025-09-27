// frontend/src/pages/Register.tsx
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Input from "../components/Input";
import { Button } from "../components/ui/Button";
import { UserContext } from "../contexts/UserContext";
import type { User } from "../contexts/UserTypes";
import { api } from "../services/api";

export default function RegisterPage() {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const setUser = userContext?.setUser;

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
      if (setUser) {
        const currentUserFromApi: User = await api.getCurrentUser();

        const currentUser: User = {
          id: currentUserFromApi.id,
          email: currentUserFromApi.email,
          username: currentUserFromApi.username,
        };
        setUser(currentUser);
      }

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
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-400 to-indigo-600">
      <Header />

      <main className="flex-1 p-6 flex flex-col items-center justify-center">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Cadastro
          </h1>
          <h2 className="text-gray-600 text-center mb-6">
            Crie sua conta para aproveitar todas as funcionalidades do TimeFocus.
          </h2>

          <form
            onSubmit={handleRegister}
            className="flex flex-col gap-4"
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

            {error && <p className="text-red-500 text-center">{error}</p>}

            <Button variant="primary" size="lg" disabled={loading}>
              {loading ? "Cadastrando..." : "Cadastrar"}
            </Button>

            <div className="flex justify-center text-sm text-blue-500 mt-2">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="hover:underline"
              >
                Já tenho conta!
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
