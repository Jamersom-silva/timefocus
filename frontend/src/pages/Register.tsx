import { useState, useContext } from "react";
import { Button } from "../components/ui/Button";
import { UserContext } from "../contexts/UserContext";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

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
  const { register } = useContext(UserContext)!;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const username = form.nome + " " + form.sobrenome;
      await register(username, form.email, form.senha, form.cpf, form.telefone);
      navigate("/login");
    } catch (err: any) {
      alert(err?.message || "Erro no registro");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      <div className="flex items-center justify-center p-4 mt-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-6 rounded-2xl shadow-2xl backdrop-blur-sm flex flex-col gap-4"
        >
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">Cadastre-se no TimeFocus</h1>
          <input name="nome" placeholder="Nome" onChange={handleChange} className="border border-gray-200 p-3 rounded focus:ring-emerald-500 focus:border-emerald-500" required />
          <input name="sobrenome" placeholder="Sobrenome" onChange={handleChange} className="border border-gray-200 p-3 rounded focus:ring-emerald-500 focus:border-emerald-500" required />
          <input name="cpf" placeholder="CPF" onChange={handleChange} className="border border-gray-200 p-3 rounded focus:ring-emerald-500 focus:border-emerald-500" required />
          <input name="telefone" placeholder="Telefone" onChange={handleChange} className="border border-gray-200 p-3 rounded focus:ring-emerald-500 focus:border-emerald-500" required />
          <input name="email" type="email" placeholder="E-mail" onChange={handleChange} className="border border-gray-200 p-3 rounded focus:ring-emerald-500 focus:border-emerald-500" required />
          <input name="senha" type="password" placeholder="Senha" onChange={handleChange} className="border border-gray-200 p-3 rounded focus:ring-emerald-500 focus:border-emerald-500" required />

          <Button type="submit" className="bg-emerald-500 text-white py-3 rounded-lg hover:bg-emerald-600 font-semibold text-lg" disabled={isLoading}>
            {isLoading ? "Cadastrando..." : "Cadastrar"}
          </Button>

          <p className="mt-4 text-center text-gray-500 text-sm">
            Já tem uma conta?{" "}
            <span className="text-emerald-500 hover:text-emerald-600 cursor-pointer" onClick={() => navigate("/login")}>
              Faça login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
