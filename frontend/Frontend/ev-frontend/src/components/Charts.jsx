import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
  LineChart, Line,
  PieChart, Pie, Cell,
  ResponsiveContainer
} from "recharts";

import "../styles/dashboard.css";

function Charts({ data }) {

  // 👉 No data case
  if (!data || data.length === 0) {
    return <p className="no-data">No data for charts</p>;
  }

  // ================= DATA PREPARATION =================

  // 🔹 EV Growth by Year (Sorted)
  const yearData = Object.values(
    data.reduce((acc, item) => {
      const year = item.year || "Unknown";

      if (!acc[year]) {
        acc[year] = { year, totalEV: 0 };
      }

      acc[year].totalEV += item.evSales || 0;
      return acc;
    }, {})
  )
  .filter(d => d.year !== "Unknown")
  .sort((a, b) => a.year - b.year);

  // 🔹 State-wise EV Sales (Top 5)
  const stateData = Object.values(
    data.reduce((acc, item) => {
      const state = item.state || "Unknown";

      if (!acc[state]) {
        acc[state] = { state, totalEV: 0 };
      }

      acc[state].totalEV += item.evSales || 0;
      return acc;
    }, {})
  )
  .filter(d => d.state !== "Unknown")
  .sort((a, b) => b.totalEV - a.totalEV)
  .slice(0, 5); // 🔥 Top 5 only

  // 🔹 Vehicle Type Distribution
  const vehicleData = Object.values(
    data.reduce((acc, item) => {
      const type = item.vehicleType || "Other";

      if (!acc[type]) {
        acc[type] = { name: type, value: 0 };
      }

      acc[type].value += item.evSales || 0;
      return acc;
    }, {})
  )
  .filter(d => d.value > 0);

  const COLORS = ["#38bdf8", "#22c55e", "#f472b6", "#a78bfa", "#facc15"];

  // ================= UI =================

  return (
    <div className="charts-container">

      {/* ===== LINE CHART ===== */}
      <div className="chart-box">
        <h3 className="chart-title">📈 EV Growth Over Time</h3>

        {yearData.length > 1 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={yearData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="year" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="totalEV"
                stroke="#38bdf8"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="no-data">Not enough data for trend</p>
        )}
      </div>

      {/* ===== BAR CHART ===== */}
      <div className="chart-box">
        <h3 className="chart-title">📊 Top 5 States by EV Sales</h3>

        {stateData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stateData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="state" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="totalEV"
                fill="#22c55e"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="no-data">No state data available</p>
        )}
      </div>

      {/* ===== PIE CHART ===== */}
      <div className="chart-box">
        <h3 className="chart-title">🚗 Vehicle Type Distribution</h3>

        {vehicleData.length > 1 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={vehicleData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {vehicleData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="no-data">Not enough distribution data</p>
        )}
      </div>

    </div>
  );
}

export default Charts;