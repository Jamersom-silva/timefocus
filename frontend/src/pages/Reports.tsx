import Header from "../../components/Header";
import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell
} from "recharts";

export default function ReportsPage() {
  const [filter, setFilter] = useState("week"); // semana ou mês

  // Dados mockados
  const cyclesData = [
    { day: "Seg", ciclos: 3 },
    { day: "Ter", ciclos: 5 },
    { day: "Qua", ciclos: 4 },
    { day: "Qui", ciclos: 6 },
    { day: "Sex", ciclos: 2 },
    { day: "Sáb", ciclos: 0 },
    { day: "Dom", ciclos: 1 },
  ];

  const subjectsData = [
    { name: "Matemática", value: 8 },
    { name: "História", value: 5 },
    { name: "Inglês", value: 3 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <div className="reports-page min-h-screen">
      <Header />

      <div className="reports-content p-4">
        <h1 className="text-3xl font-bold mb-2">Relatórios</h1>
        <p>Acompanhe sua produtividade com gráficos e filtros.</p>

        {/* Filtro */}
        <div className="mt-4 mb-6 flex gap-2">
          <button
            className={`px-4 py-2 rounded ${filter === "week" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setFilter("week")}
          >
            Semana
          </button>
          <button
            className={`px-4 py-2 rounded ${filter === "month" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setFilter("month")}
          >
            Mês
          </button>
        </div>

        {/* Gráfico de ciclos */}
        <div className="mb-6 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Ciclos concluídos</h2>
          <BarChart width={500} height={250} data={cyclesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="ciclos" fill="#8884d8" />
          </BarChart>
        </div>

        {/* Gráfico de assuntos */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Assuntos estudados</h2>
          <PieChart width={400} height={250}>
            <Pie
              data={subjectsData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#82ca9d"
              label
            >
              {subjectsData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>
    </div>
  );
}
