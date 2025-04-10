// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota padrão: redireciona para login se estiver na raiz */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Rotas principais */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Exemplo de rota 404 opcional */}
        <Route path="*" element={<div className="text-center mt-10 text-red-500">Página não encontrada</div>} />
      </Routes>
    </Router>
  );
}

export default App;
