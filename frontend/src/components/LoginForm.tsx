import { useState } from "react";

export default function LoginForm() {
  const [form, setForm] = useState({
    usuario: "",
    senha: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login com:", form);
    // 🚀 Aqui no futuro: autenticar no backend
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-sm mx-auto mt-6">
      <input
        name="usuario"
        placeholder="Usuário ou E-mail"
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        name="senha"
        type="password"
        placeholder="Senha"
        onChange={handleChange}
        className="border p-2 rounded"
      />

      <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
        Entrar
      </button>

      <a href="/register" className="text-blue-500 text-sm hover:underline">
        Não tem conta? Cadastre-se
      </a>
    </form>
  );
}
