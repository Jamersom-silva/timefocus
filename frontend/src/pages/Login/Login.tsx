import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { UserContext } from "../../contexts/UserContext";
import type { User } from "../../contexts/UserTypes";
import { api } from "../../services/api";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext)!; // garante que não é null
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Faz login e salva token
      const tokenData = await api.login({ email, password });
      localStorage.setItem("token", tokenData.access_token);

      // Busca usuário atual
      const currentUserFromApi = await api.getCurrentUser();

      // Monta o objeto User corretamente
      const currentUser: User = {
        id: currentUserFromApi.id,
        email: currentUserFromApi.email,
        username: currentUserFromApi.username,
      };

      // Atualiza contexto e navega
      setUser(currentUser);
      navigate("/dashboard");
    } catch (err: unknown) {
      // Type guard para erros
      if (err && typeof err === "object" && "detail" in err) {
        setError((err as { detail: string }).detail);
      } else {
        setError("Erro ao logar");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 p-6 bg-gray-50 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-2">Login</h1>
        <h2 className="text-lg text-gray-600 mb-6 text-center max-w-md">
          Faça login para acessar todos os recursos do TimeFocus.
        </h2>

        <form
          onSubmit={handleLogin}
          className="bg-white shadow rounded-lg p-6 w-full max-w-md flex flex-col gap-4"
        >
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
            {loading ? "Entrando..." : "Entrar"}
          </Button>

          <div className="flex justify-between text-sm text-blue-500 mt-2">
            <button type="button">Esqueceu a senha?</button>
            <button type="button" onClick={() => navigate("/register")}>
              Cadastro
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
