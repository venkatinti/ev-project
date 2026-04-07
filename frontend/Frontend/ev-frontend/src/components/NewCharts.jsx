import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  ScatterChart, Scatter,
  BarChart, Bar,
  AreaChart, Area, Legend
} from "recharts";

import IndiaHeatMap from "./IndiaHeatMap"; // ✅ ADD THIS

const COLORS = ["#00f5d4", "#82ca9d", "#ffc658", "#ff7f50"];

function NewCharts({ data = [] }) {

  if (!data || data.length === 0) {
    return <p style={{ color: "white" }}>No data available</p>;
  }

  // ================= LINE =================
  const lineData = Object.values(
    data.reduce((acc, d) => {
      acc[d.year] = acc[d.year] || { year: d.year, total: 0 };
      acc[d.year].total += Number(d.evSales) || 0;
      return acc;
    }, {})
  );

  // ================= DONUT =================
  const totalEV = data.reduce((sum, d) => sum + Number(d.evSales || 0), 0);

  const donutData = Object.values(
    data.reduce((acc, d) => {
      const type = d.vehicleType || d.vehicle_type || "Other";

      if (!acc[type]) {
        acc[type] = { name: type, value: 0 };
      }

      acc[type].value += Number(d.evSales) || 0;
      return acc;
    }, {})
  ).map(d => ({
    ...d,
    percent: ((d.value / totalEV) * 100).toFixed(1)
  }));

  // ================= AREA =================
  const areaData = Object.values(
    data.reduce((acc, d) => {
      const year = d.year;
      const type = d.vehicleType || d.vehicle_type || "Other";

      if (!acc[year]) acc[year] = { year };

      acc[year][type] =
        (acc[year][type] || 0) + Number(d.evSales);

      return acc;
    }, {})
  );

  // ================= SCATTER =================
  const scatterData = data.map(d => ({
    ev: Number(d.evSales) || 0,
    co2: Number(d.co2SavedTons) || 0
  }));

  // ================= FUEL SAVINGS =================
  const fuelData = Object.values(
    data.reduce((acc, d) => {
      const type = d.vehicleType || d.vehicle_type || "Other";

      if (!acc[type]) {
        acc[type] = { name: type, value: 0 };
      }

      acc[type].value += Number(d.fuelConsumptionReductionLitres || 0);
      return acc;
    }, {})
  );

  return (
    <div className="charts-grid">

      {/* 🔹 LINE */}
      <div className="chart-card">
        <h3>EV Growth Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData} margin={{ top: 20, right: 30, left: 50, bottom: 50 }}>
            <XAxis dataKey="year" tick={{ fontSize: 12 }}
              label={{ value: "Year", position: "bottom", offset: 20 }} />
            <YAxis tick={{ fontSize: 12 }}
              label={{ value: "EV Sales", angle: -90, position: "left", offset: 10 }} />
            <Tooltip />
            <Line dataKey="total" stroke="#00f5d4" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 🔹 DONUT */}
      <div className="chart-card">
        <h3>Vehicle Type Distribution (%)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={donutData}
              dataKey="value"
              innerRadius={60}
              outerRadius={100}
              label={({ percent }) => `${percent}%`}
            >
              {donutData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 🔹 AREA */}
      <div className="chart-card">
        <h3>Vehicle Trend by Type</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={areaData} margin={{ top: 20, right: 30, left: 50, bottom: 50 }}>
            <XAxis dataKey="year" tick={{ fontSize: 12 }}
              label={{ value: "Year", position: "bottom", offset: 20 }} />
            <YAxis tick={{ fontSize: 12 }}
              label={{ value: "EV Sales", angle: -90, position: "left", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="2-Wheeler" stackId="1" stroke="#00f5d4" fill="#00f5d4" />
            <Area type="monotone" dataKey="3-Wheeler" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
            <Area type="monotone" dataKey="4-Wheeler" stackId="1" stroke="#ffc658" fill="#ffc658" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* 🔹 SCATTER */}
      <div className="chart-card">
        <h3>EV vs CO₂ Reduction</h3>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart margin={{ top: 20, right: 30, left: 50, bottom: 50 }}>
            <XAxis dataKey="ev" tick={{ fontSize: 12 }}
              label={{ value: "EV Sales", position: "bottom", offset: 20 }} />
            <YAxis dataKey="co2" tick={{ fontSize: 12 }}
              label={{ value: "CO₂ Saved", angle: -90, position: "left", offset: 10 }} />
            <Tooltip />
            <Scatter data={scatterData} fill="#ff7f50" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* 🔹 FUEL SAVINGS */}
      <div className="chart-card">
        <h3>Fuel Savings by Vehicle Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={fuelData} margin={{ top: 20, right: 30, left: 50, bottom: 50 }}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }}
              label={{ value: "Vehicle Type", position: "bottom", offset: 20 }} />
            <YAxis tick={{ fontSize: 12 }}
              label={{ value: "Fuel Saved (Litres)", angle: -90, position: "left", offset: 10 }} />
            <Tooltip />
            <Bar dataKey="value" fill="#00c49f" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 🔹 INDIA HEAT MAP (6th CHART) */}
      <div className="chart-card">
        <IndiaHeatMap data={data} />
      </div>

    </div>
  );
}

export default NewCharts;