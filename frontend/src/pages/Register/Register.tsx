import Header from "../../components/Header/Header";
import RegisterForm from "../../components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="home-page">
      <Header />
      <h1>Cadastro</h1>
      <p>Preencha corretamente o formulário abaixo:</p>
      <RegisterForm />
    </div>
  );
}
