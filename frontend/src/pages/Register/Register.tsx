import { useState } from "react";
import Header from "../../components/Header/Header";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    cpf: "",
    telefone: "",
    email: "",
    senha: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const fields = [
    { name: "nome", label: "Nome", type: "text" },
    { name: "sobrenome", label: "Sobrenome", type: "text" },
    { name: "cpf", label: "CPF", type: "text" },
    { name: "telefone", label: "Telefone", type: "tel" },
    { name: "email", label: "E-mail", type: "email" },
    { name: "senha", label: "Senha", type: "password" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove erro do campo ao digitar
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nome) newErrors.nome = "Nome é obrigatório";
    if (!formData.sobrenome) newErrors.sobrenome = "Sobrenome é obrigatório";

    if (!/^\d{11}$/.test(formData.cpf)) {
      newErrors.cpf = "CPF deve ter 11 dígitos numéricos";
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "E-mail inválido";
    }

    if (formData.senha.length < 6) {
      newErrors.senha = "Senha deve ter no mínimo 6 caracteres";
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Cadastro realizado com sucesso:", formData);
    alert("Cadastro enviado!");
  };

  return (
    <div className="home-page">
      <Header />
      <h1>Venha fazer o Cadastro</h1>
      <h2>
        Para ter acesso total ao TimeFocus é necessário fazer o cadastro.
        Preencha corretamente o formulário.
      </h2>

      <form className="register-form" onSubmit={handleSubmit}>
        {fields.map(({ name, label, type }) => (
          <label key={name}>
            {label}:
            <input
              type={type}
              name={name}
              value={formData[name as keyof typeof formData]}
              onChange={handleChange}
              placeholder={`Digite seu ${label.toLowerCase()}`}
              required
            />
            {errors[name] && <span style={{ color: "red" }}>{errors[name]}</span>}
          </label>
        ))}

        <button type="submit">Cadastre-se</button>
      </form>
    </div>
  );
}
