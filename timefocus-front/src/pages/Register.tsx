// src/pages/Register.tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Adicionei o Link aqui

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode integrar com seu backend
    console.log("Registrando:", { email, password });
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6">Criar Conta</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Registrar
        </button>
      </form>
      <p className="mt-4 text-sm text-center text-gray-600">
        Já tem uma conta?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Faça login
        </Link>
      </p>
    </div>
  );
}