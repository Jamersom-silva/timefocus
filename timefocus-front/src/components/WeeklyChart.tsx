import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { getWeeklyData } from "../utils/getWeeklyData";

const WeeklyChart = () => {
  const data = getWeeklyData();

  return (
    <div className="bg-white p-4 rounded-2xl shadow w-full max-w-xl mx-auto my-6">
      <h2 className="text-lg font-semibold mb-4">Sessões da Semana</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="day" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="sessions" fill="#3b82f6" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyChart;
