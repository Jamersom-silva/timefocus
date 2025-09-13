import Header from "../../components/Header/Header";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

export default function RegisterPage() {
  return (
    <div className="home-page min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 p-6 bg-gray-50 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-2">Cadastro</h1>
        <h2 className="text-lg text-gray-600 mb-6 text-center max-w-lg">
          Para ter acesso total ao TimeFocus é necessário se cadastrar.
          Preencha corretamente o formulário abaixo:
        </h2>

        {/* Formulário */}
        <form className="bg-white shadow rounded-lg p-6 w-full max-w-md">
          <Input label="Nome" type="text" placeholder="Digite seu nome" />
          <Input label="Sobrenome" type="text" placeholder="Digite seu sobrenome" />
          <Input label="CPF" type="text" placeholder="000.000.000-00" />
          <Input label="Telefone" type="tel" placeholder="(00) 00000-0000" />
          <Input label="E-mail" type="email" placeholder="seu@email.com" />
          <Input label="Senha" type="password" placeholder="********" />

          <div className="mt-4">
            <Button variant="primary" size="lg">
              Cadastre-se
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
