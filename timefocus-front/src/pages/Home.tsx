// src/pages/Home.tsx
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6">
      <div className="max-w-2xl text-center space-y-6 bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold">🎯 TimeFocus</h1>
        <p className="text-lg">
          Aumente sua produtividade com a técnica Pomodoro! O TimeFocus te ajuda a focar nos estudos,
          registrar seus temas, acompanhar seu progresso e construir uma rotina mais eficiente.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="bg-white text-indigo-600 font-semibold px-6 py-2 rounded-xl hover:bg-gray-100 transition"
          >
            Entrar
          </Link>
          <Link
            to="/register"
            className="bg-indigo-800 text-white px-6 py-2 rounded-xl hover:bg-indigo-900 transition"
          >
            Criar Conta
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
