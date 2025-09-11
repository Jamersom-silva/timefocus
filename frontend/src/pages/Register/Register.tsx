import Header from "../../components/Header/Header";

export default function RegisterPage() {
  return (
    <div className="home-page">
      <Header />
      <h1>Venha fazer o Cadastro </h1>
      <h2>Para ter acesso total ao timesfocus é necessario fazer o cadastro, preenchar corretamente o formulario</h2>
      <p>Nome</p>
      <p>sobrenome</p>
      <p>Cpf</p>
      <p>telefone</p>
      <p>E-mail</p>
      <p>senha</p>
      <button>Cadastre-se</button>
    </div>
  );
}
