import { useMemo } from "react";
import indiaGeo from "../assets/india.json";
import { geoPath, geoMercator } from "d3-geo";

function IndiaHeatMap({ data = [] }) {

  // ✅ Normalize state names (FINAL FIX)
  const normalizeState = (name) => {
    if (!name) return "";

    let clean = name
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z ]/g, "")
      .trim();

    const aliasMap = {
      "andaman nicobar islands": "andaman and nicobar",
      "andaman & nicobar islands": "andaman and nicobar",
      "nct of delhi": "delhi",
      "delhi ncr": "delhi",
      "orissa": "odisha",
      "pondicherry": "puducherry",

      // 🔥 IMPORTANT: Telangana merged into AP (GeoJSON limitation)
      "telangana": "andhra pradesh",
    };

    return aliasMap[clean] || clean;
  };

  // ✅ Aggregate CO2 data
  const stateData = useMemo(() => {
    const map = {};

    data.forEach((d) => {
      const state = normalizeState(d.state);
      map[state] = (map[state] || 0) + Number(d.co2SavedTons || 0);
    });

    return map;
  }, [data]);

  // ✅ Dynamic color scale
  const maxValue = Math.max(...Object.values(stateData), 1);

  const getColor = (value) => {
    if (!value) return "#0f172a";

    const intensity = value / maxValue;

    if (intensity > 0.75) return "#00f5d4";
    if (intensity > 0.5) return "#38bdf8";
    if (intensity > 0.25) return "#818cf8";
    return "#6366f1";
  };

  // ✅ Auto-fit projection (perfect map positioning)
  const width = 600;
  const height = 400;

  const projection = geoMercator().fitSize([width, height], indiaGeo);
  const pathGenerator = geoPath().projection(projection);

  return (
    <div className="chart-card">
      <h3>Regional Pollution Reduction (CO₂ Saved)</h3>

      <svg width="100%" height={height}>
        {indiaGeo.features.map((geo, i) => {
          const geoState = normalizeState(geo.properties.NAME_1);

          // ✅ Smart matching
          const matchedKey = Object.keys(stateData).find(
            (key) =>
              geoState.includes(key) || key.includes(geoState)
          );

          const value = matchedKey ? stateData[matchedKey] : 0;

          const [x, y] = pathGenerator.centroid(geo);

          return (
            <g key={i}>
              {/* ✅ Map shape */}
              <path
                d={pathGenerator(geo)}
                fill={getColor(value)}
                stroke="#1e293b"
                strokeWidth={0.5}
                onMouseEnter={(e) => (e.target.style.opacity = 0.7)}
                onMouseLeave={(e) => (e.target.style.opacity = 1)}
              >
                <title>
                  {geo.properties.NAME_1}: {value.toFixed(0)} tons
                </title>
              </path>

              {/* ✅ Value label */}
              {value > 0 && (
                <text
                  x={x}
                  y={y}
                  fontSize="7"
                  fill="#ffffff"
                  textAnchor="middle"
                >
                  {Math.round(value)}
                </text>
              )}

              {/* ✅ State name (optional, small) */}
              <text
                x={x}
                y={y + 10}
                fontSize="6"
                fill="#94a3b8"
                textAnchor="middle"
              >
                {geo.properties.NAME_1}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default IndiaHeatMap;