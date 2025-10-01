import { Link } from "react-router-dom";

export default function Header() {
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
          <Link to="/Community" className="hover:text-emerald-500">Comunidade</Link>
        </nav>

        {/* Botões */}
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-gray-700 hover:text-emerald-500">Entrar</Link>
          <Link
            to="/register"
            className="bg-emerald-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-emerald-600 transition-colors"
          >
            Cadastrar
          </Link>
        </div>
      </div>
    </header>
  );
}
