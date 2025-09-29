import { useState } from "react";

export default function RegisterForm() {
  const [form, setForm] = useState({
    nome: "",
    sobrenome: "",
    cpf: "",
    telefone: "",
    email: "",
    senha: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados do cadastro:", form);
    // 🚀 Aqui no futuro: enviar os dados para o backend
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md mx-auto mt-6">
      <input name="nome" placeholder="Nome" onChange={handleChange} className="border p-2 rounded" />
      <input name="sobrenome" placeholder="Sobrenome" onChange={handleChange} className="border p-2 rounded" />
      <input name="cpf" placeholder="CPF" onChange={handleChange} className="border p-2 rounded" />
      <input name="telefone" placeholder="Telefone" onChange={handleChange} className="border p-2 rounded" />
      <input name="email" type="email" placeholder="E-mail" onChange={handleChange} className="border p-2 rounded" />
      <input name="senha" type="password" placeholder="Senha" onChange={handleChange} className="border p-2 rounded" />

      <button type="submit" className="bg-emerald-500 text-white py-2 px-4 rounded hover:bg-emerald-500">
        Cadastrar
      </button>
    </form>
  );
}
