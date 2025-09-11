import { useState } from "react";
import Header from "../../components/Header/Header";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    usuario: "",
    senha: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", formData);
    alert("Login enviado!");
  };

  return (
    <div className="home-page">
      <Header />

      <div className="login-page">
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <label>
            Usuário:
            <input
              type="text"
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
              placeholder="Digite seu usuário ou e-mail"
              required
            />
          </label>

          <label>
            Senha:
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              placeholder="Digite sua senha"
              required
            />
          </label>

          <button type="submit">Entrar</button>
        </form>

        <p>
          <a href="#">Esqueceu a senha?</a>
        </p>
        <p>
          Ainda não tem conta? <a href="/register">Cadastre-se</a>
        </p>
      </div>
    </div>
  );
}
