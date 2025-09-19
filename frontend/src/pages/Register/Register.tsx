import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { UserContext } from "../../contexts/UserContext";
import type { User } from "../../contexts/UserTypes";
import api from "../../services/api";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext)!;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/register", { name, email, password });
      const tokenData: { access_token: string; token_type: string; user: User } = response.data;

      localStorage.setItem("token", tokenData.access_token);
      setUser(tokenData.user);

      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Erro ao cadastrar");
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

        <form onSubmit={handleRegister} className="bg-white shadow rounded-lg p-6 w-full max-w-md flex flex-col gap-4">
          <Input label="Nome" type="text" placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="E-mail" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="Senha" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} />

          {error && <p className="text-red-500">{error}</p>}

          <Button variant="primary" size="lg" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </Button>

          <div className="flex justify-between text-sm text-blue-500 mt-2">
            <button type="button" onClick={() => navigate("/login")}>Já tenho conta</button>
          </div>
        </form>
      </main>
    </div>
  );
}
