import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 text-white font-bold rounded-md w-8 h-8 flex items-center justify-center">
            T
          </div>
          <span className="font-bold text-lg">TimeFocus</span>
        </div>

        {/* Navegação */}
        <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
          <Link to="/features" className="hover:text-blue-600">Funcionalidades</Link>
          <Link to="/pricing" className="hover:text-blue-600">Preços</Link>
          <Link to="/about" className="hover:text-blue-600">Sobre</Link>
          <Link to="/contact" className="hover:text-blue-600">Contato</Link>
        </nav>

        {/* Botões */}
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-gray-700 hover:text-blue-600">Entrar</Link>
          <Link
            to="/register"
            className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors"
          >
            Cadastrar
          </Link>
        </div>
      </div>
    </header>
  );
}