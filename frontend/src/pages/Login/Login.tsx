import Header from "../../components/Header/Header";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

export default function LoginPage() {
  return (
    <div className="home-page min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 p-6 bg-gray-50 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-2">Login</h1>
        <h2 className="text-lg text-gray-600 mb-6 text-center max-w-md">
          Faça login para acessar todos os recursos do TimeFocus.
        </h2>

        <form className="bg-white shadow rounded-lg p-6 w-full max-w-md flex flex-col gap-4">
          <Input label="E-mail" type="email" placeholder="seu@email.com" />
          <Input label="Senha" type="password" placeholder="********" />

          <Button variant="primary" size="lg">
            Entrar
          </Button>

          <div className="flex justify-between text-sm text-blue-500 mt-2">
            <button type="button">Esqueceu a senha?</button>
            <button type="button">Cadastro</button>
          </div>
        </form>
      </main>
    </div>
  );
}
