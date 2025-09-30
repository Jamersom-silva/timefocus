import Header from "../../components/Header/Header";
import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer
} from "recharts";
import { Calendar, TrendingUp, Clock, Target, Award, Filter } from "lucide-react";

export default function ReportsPage() {
  const [filter, setFilter] = useState("week");
  const [selectedMetric, setSelectedMetric] = useState("cycles");

  // Dados mockados mais elaborados
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

  return (
    <div className="reports-page min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Relatórios</h1>
          <p className="text-gray-600">Acompanhe sua produtividade com análises detalhadas</p>
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
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Ciclos</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalCycles}</p>
              </div>
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-teal-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+15% vs semana anterior</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Horas Focadas</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalHours.toFixed(1)}h</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+8% vs semana anterior</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Exercícios</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalExercises}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+25% vs semana anterior</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Produtividade</p>
                <p className="text-3xl font-bold text-gray-900">{stats.avgProductivity}%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+12% vs semana anterior</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Daily Activity Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Atividade Diária</h2>
              <div className="flex bg-gray-100 rounded-lg p-1">
                {[
                  { key: 'cycles', label: 'Ciclos' },
                  { key: 'hours', label: 'Horas' },
                  { key: 'exercises', label: 'Exercícios' }
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setSelectedMetric(item.key)}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                      selectedMetric === item.key
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cyclesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar 
                  dataKey={selectedMetric === 'cycles' ? 'ciclos' : selectedMetric === 'hours' ? 'horas' : 'exercicios'} 
                  fill="#0cfabe" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Subjects Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Distribuição por Matéria</h2>
            
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={subjectsData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={40}
                    paddingAngle={2}
                  >
                    {subjectsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 space-y-3">
              {subjectsData.map((subject, index) => (
                <div key={subject.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-sm font-medium text-gray-900">{subject.name}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {subject.value} ciclos ({Math.round((subject.value / subjectsData.reduce((acc, s) => acc + s.value, 0)) * 100)}%)
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Productivity Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Tendência de Produtividade</h2>
          
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={productivityTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis 
                dataKey="week" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }}
                domain={[0, 100]}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value) => [`${value}%`, 'Produtividade']}
              />
              <Line 
                type="monotone" 
                dataKey="produtividade" 
                stroke="#0cfabe" 
                strokeWidth={3}
                dot={{ fill: '#0cfabe', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: '#0cfabe', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Insights Section */}
        <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl border border-teal-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">💡 Insights da Semana</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <p className="text-sm text-gray-700">
                  <strong>Melhor dia:</strong> Quinta-feira com 6 ciclos concluídos e 3h de foco.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <p className="text-sm text-gray-700">
                  <strong>Matéria favorita:</strong> Matemática representa 40% do seu tempo de estudo.
                </p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <p className="text-sm text-gray-700">
                  <strong>Oportunidade:</strong> Fins de semana têm baixa atividade. Considere sessões mais curtas.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <p className="text-sm text-gray-700">
                  <strong>Tendência:</strong> Sua produtividade aumentou 12% nas últimas 4 semanas!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}