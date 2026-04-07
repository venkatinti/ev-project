import "../styles/dashboard.css";

function Insights({ data }) {

  // 👉 No data case
  if (!data || data.length === 0) {
    return <p className="no-data">No data available</p>;
  }

  // ================= SAFE CALCULATIONS =================

  const totalEV = data.reduce((sum, item) => sum + (item.evSales || 0), 0);

  const avgAdoption =
    data.length > 0
      ? data.reduce((sum, item) => sum + (item.evAdoptionRate || 0), 0) / data.length
      : 0;

  const totalCO2 =
    data.reduce((sum, item) => sum + (item.co2SavedTons || 0), 0);

  const avgPrice =
    data.length > 0
      ? data.reduce((sum, item) => sum + (item.averageEvPriceLakhs || 0), 0) / data.length
      : 0;

  // ================= FORMAT HELPERS =================

  const formatNumber = (num) => {
    if (!num || isNaN(num)) return "0";
    return num.toLocaleString();
  };

  const formatDecimal = (num) => {
    if (!num || isNaN(num)) return "0.00";
    return num.toFixed(2);
  };

  // ================= ADDITIONAL INSIGHT (BONUS) =================

  const highestState = (() => {
    const map = {};

    data.forEach(item => {
      if (!item.state) return;

      if (!map[item.state]) map[item.state] = 0;
      map[item.state] += item.evSales || 0;
    });

    let maxState = "";
    let maxValue = 0;

    for (let state in map) {
      if (map[state] > maxValue) {
        maxValue = map[state];
        maxState = state;
      }
    }

    return maxState;
  })();

  // ================= UI =================

  return (
    <div className="insights-container">

      {/* CARD 1 */}
      <div className="card">
        <div className="card-icon">⚡</div>
        <h2>{formatNumber(totalEV)}</h2>
        <p>Total EV Sales</p>
      </div>

      {/* CARD 2 */}
      <div className="card">
        <div className="card-icon">📈</div>
        <h2>{formatDecimal(avgAdoption)}%</h2>
        <p>Avg Adoption Rate</p>
      </div>

      {/* CARD 3 */}
      <div className="card">
        <div className="card-icon">🌱</div>
        <h2>{formatDecimal(totalCO2)}</h2>
        <p>CO₂ Saved (Tons)</p>
      </div>

      {/* CARD 4 */}
      <div className="card">
        <div className="card-icon">💰</div>
        <h2>{formatDecimal(avgPrice)}</h2>
        <p>Avg EV Price (Lakhs)</p>
      </div>

      {/* BONUS CARD */}
      <div className="card">
        <div className="card-icon">🏆</div>
        <h2>{highestState || "N/A"}</h2>
        <p>Top Performing State</p>
      </div>

    </div>
  );
}

export default Insights;