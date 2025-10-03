// frontend/src/pages/Register.tsx
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { ArrowLeft } from "lucide-react";
import Header from "../components/Header";
import { UserContext } from "../contexts/UserContext";

export default function RegisterPage() {
  const [form, setForm] = useState({
    nome: "",
    sobrenome: "",
    cpf: "",
    telefone: "",
    email: "",
    senha: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useContext(UserContext) ?? {};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!register) return;

    setIsLoading(true);

    try {
      await register(
        form.nome + " " + form.sobrenome,
        form.email,
        form.senha
      );
      navigate("/login");
    } catch (err: any) {
      console.error("Erro ao registrar:", err);
      alert(err?.message || "Erro no registro");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
      <Header />

      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
        {/* Back link */}
        <Link 
          to="/" 
          className="flex items-center gap-2 text-gray-600 hover:text-emerald-500 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar ao início
        </Link>

        <Card className="w-full max-w-md bg-white/95 p-6 rounded-2xl shadow-2xl backdrop-blur-sm">
          <CardHeader className="text-center mb-4">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Cadastre-se no TimeFocus
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                name="nome"
                placeholder="Nome"
                value={form.nome}
                onChange={handleChange}
                required
              />
              <Input
                name="sobrenome"
                placeholder="Sobrenome"
                value={form.sobrenome}
                onChange={handleChange}
                required
              />
              <Input
                name="cpf"
                placeholder="CPF"
                value={form.cpf}
                onChange={handleChange}
                required
              />
              <Input
                name="telefone"
                placeholder="Telefone"
                value={form.telefone}
                onChange={handleChange}
                required
              />
              <Input
                name="email"
                type="email"
                placeholder="E-mail"
                value={form.email}
                onChange={handleChange}
                required
              />
              <Input
                name="senha"
                type="password"
                placeholder="Senha"
                value={form.senha}
                onChange={handleChange}
                required
              />

              <Button
                type="submit"
                className="bg-emerald-500 text-white py-3 rounded-lg hover:bg-emerald-600 mt-2 font-semibold text-lg"
                disabled={isLoading}
              >
                {isLoading ? "Cadastrando..." : "Cadastrar"}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <Separator />
            </div>

            <p className="mt-4 text-center text-gray-500 text-sm">
              Já tem uma conta?{" "}
              <span
                className="text-emerald-500 hover:text-emerald-600 cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Faça login
              </span>
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
