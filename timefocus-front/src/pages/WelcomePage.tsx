// src/pages/WelcomePage.tsx
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Bem-vindo ao TimeFocus ⏱️</h1>
      <p className="text-lg text-gray-700 max-w-xl mb-6">
        Este aplicativo foi desenvolvido para ajudar você a organizar seus estudos usando a técnica Pomodoro.
        Registre temas de estudo, acompanhe seu progresso com gráficos e veja seu histórico de sessões.
      </p>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Entrar
        </Link>
        <Link
          to="/register"
          className="bg-gray-300 text-gray-800 px-6 py-2 rounded-xl hover:bg-gray-400 transition"
        >
          Criar Conta
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
