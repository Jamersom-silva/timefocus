import Header from "../components/Header";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer
} from "recharts";
import { Calendar, TrendingUp, Clock, Target, Award, Filter, Grid3X3, Home } from "lucide-react";

export default function ReportsPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("week");
  const [selectedMetric, setSelectedMetric] = useState("cycles");

  // Dados mockados
  const cyclesData = [
    { day: "Seg", ciclos: 3, horas: 1.5, exercicios: 5 },
    { day: "Ter", ciclos: 5, horas: 2.5, exercicios: 8 },
    { day: "Qua", ciclos: 4, horas: 2.0, exercicios: 6 },
    { day: "Qui", ciclos: 6, horas: 3.0, exercicios: 10 },
    { day: "Sex", ciclos: 2, horas: 1.0, exercicios: 3 },
    { day: "Sáb", ciclos: 0, horas: 0, exercicios: 0 },
    { day: "Dom", ciclos: 1, horas: 0.5, exercicios: 2 },
  ];

  const subjectsData = [
    { name: "Matemática", value: 8, color: "#0cfabe" },
    { name: "História", value: 5, color: "#3b82f6" },
    { name: "Inglês", value: 3, color: "#8b5cf6" },
    { name: "Física", value: 4, color: "#f59e0b" },
  ];

  const productivityTrend = [
    { week: "Sem 1", produtividade: 65 },
    { week: "Sem 2", produtividade: 72 },
    { week: "Sem 3", produtividade: 68 },
    { week: "Sem 4", produtividade: 85 },
  ];

  const stats = {
    totalCycles: cyclesData.reduce((acc, day) => acc + day.ciclos, 0),
    totalHours: cyclesData.reduce((acc, day) => acc + day.horas, 0),
    totalExercises: cyclesData.reduce((acc, day) => acc + day.exercicios, 0),
    avgProductivity: 78
  };

  const COLORS = ["#0cfabe", "#3b82f6", "#8b5cf6", "#f59e0b"];

  // Menu de navegação "Outras Opções"
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigationOptions = [
    { name: 'Dashboard', icon: Home, description: 'Voltar ao painel', link: '/' },
    { name: 'Relatórios', icon: Grid3X3, description: 'Ver todos os relatórios', link: '/reports' },
    { name: 'Matérias', icon: Grid3X3, description: 'Organizar suas matérias', link: '/subjects' },
  ];

  const handleNavigation = (link: string) => {
    navigate(link);
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="reports-page min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top bar: título + menu */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Relatórios</h1>
            <p className="text-gray-600">Acompanhe sua produtividade com análises detalhadas</p>
          </div>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition"
            >
              <Grid3X3 size={18} /> Outras Opções
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white border rounded-xl shadow-lg z-20 p-2">
                {navigationOptions.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleNavigation(item.link)}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-emerald-50 transition w-full text-left"
                  >
                    <item.icon size={20} className="text-emerald-600 mt-1" />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-gray-400" />
              <div className="flex bg-gray-100 rounded-lg p-1">
                {[
                  { key: 'week', label: 'Esta Semana' },
                  { key: 'month', label: 'Este Mês' },
                  { key: 'quarter', label: 'Trimestre' }
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setFilter(item.key)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      filter === item.key
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">
                {filter === 'week' ? '23 - 29 Set 2024' : 
                 filter === 'month' ? 'Setembro 2024' : 
                 'Jul - Set 2024'}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total de Ciclos */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Ciclos</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalCycles}</p>
            </div>
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-teal-600" />
            </div>
          </div>
          {/* Horas Focadas */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Horas Focadas</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalHours.toFixed(1)}h</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          {/* Exercícios */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Exercícios</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalExercises}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          {/* Produtividade */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Produtividade</p>
              <p className="text-3xl font-bold text-gray-900">{stats.avgProductivity}%</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Aqui você continua com gráficos e insights... */}
      </main>
    </div>
  );
}
