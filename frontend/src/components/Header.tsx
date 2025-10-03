// frontend/src/components/Header.tsx
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function Header() {
  const { user, logout } = useContext(UserContext)!;
  const navigate = useNavigate();

  return (
    <header className="w-full bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-emerald-500 text-white font-bold rounded-md w-8 h-8 flex items-center justify-center">
            T
          </div>
          <span className="font-bold text-lg">TimeFocus</span>
        </Link>

        {/* Navegação */}
        <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
          <Link to="/features" className="hover:text-emerald-500">Funcionalidades</Link>
          <Link to="/pricing" className="hover:text-emerald-500">Preços</Link>
          <Link to="/articles" className="hover:text-emerald-500">Artigos</Link>
          <Link to="/about" className="hover:text-emerald-500">Sobre</Link>
          <Link to="/contact" className="hover:text-emerald-500">Contato</Link>
          <Link to="/community" className="hover:text-emerald-500">Comunidade</Link>
        </nav>

        {/* Botões de login/logout */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-gray-700">Olá, {user.username || "Usuário"}</span>
              <button
                aria-label="Logout"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-600 hover:shadow-md transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-emerald-500">Entrar</Link>
              <Link
                to="/register"
                className="bg-emerald-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-emerald-600 hover:shadow-md transition-all"
              >
                Cadastrar
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
