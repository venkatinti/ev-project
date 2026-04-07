import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import FilterForm from "../components/FilterForm";
import Insights from "../components/Insights";
import NewCharts from "../components/NewCharts";
import { useNavigate } from "react-router-dom";
import { fetchAllEVData, fetchAlerts } from "../services/api";
import "../styles/dashboard.css";

function Dashboard() {

  const navigate = useNavigate();
  const dropdownRef = useRef();

  const [filters, setFilters] = useState({});
  const [allData, setAllData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [hasAlerts, setHasAlerts] = useState(false);
  const [hasFetchedAlerts, setHasFetchedAlerts] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // ================= FILTERED DATA =================
  const filteredData = useMemo(() => {
    if (!allData || allData.length === 0) return [];

    if (Object.keys(filters).length === 0) return allData;

    return allData.filter(item => {
      if (filters.year && item.year !== parseInt(filters.year)) return false;

      if (
        filters.state &&
        item.state &&
        !item.state.toLowerCase().includes(filters.state.toLowerCase())
      ) return false;

      if (
        filters.vehicleType &&
        item.vehicle_type &&
        !item.vehicle_type.toLowerCase().includes(filters.vehicleType.toLowerCase())
      ) return false;

      return true;
    });
  }, [allData, filters]);

  // ================= FILTER HANDLER =================
  const handleFilter = useCallback(async (filterData) => {
    const cleanFilters = {};
    Object.keys(filterData).forEach(key => {
      if (filterData[key]) cleanFilters[key] = filterData[key];
    });

    setFilters(cleanFilters);

    try {
      const alertData = await fetchAlerts(cleanFilters);
      setAlerts(alertData);
      setHasAlerts(alertData.length > 0);
      setHasFetchedAlerts(true);
    } catch (err) {
      console.error("Alert fetch error:", err);
    }
  }, []);

  // ================= RESET =================
  const handleReset = useCallback(() => {
    setFilters({});
    setAlerts([]);
    setHasAlerts(false);
    setHasFetchedAlerts(false);
    setShowNotifications(false);
  }, []);

  // ================= INITIAL LOAD =================
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const fullData = await fetchAllEVData();
        setAllData(fullData);
      } catch (error) {
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // ================= CLOSE DROPDOWN =================
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ================= BELL CLICK =================
  const handleBellClick = () => {
    setShowNotifications(prev => !prev);
  };

  // ================= LOADING =================
  if (loading) {
    return <div className="dashboard-container">Loading...</div>;
  }

  if (error) {
    return <div className="dashboard-container">{error}</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">

        {/* ===== HEADER ===== */}
        <div className="dashboard-header" style={{ position: "relative" }}>

          <h1 className="dashboard-title">⚡ EV Analytics Dashboard</h1>

          {/* ✅ RIGHT SIDE ACTIONS */}
          <div className="header-actions">

            {/* 🔔 NOTIFICATION (UPDATED) */}
            <button
              className="notification-wrapper"
              onClick={handleBellClick}
            >
              🔔
              {hasFetchedAlerts && hasAlerts && (
                <span className="notification-dot"></span>
              )}
            </button>

            {/* 👤 LOGOUT */}
            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              👤 Logout
            </button>

          </div>

          {/* 🔽 DROPDOWN */}
          {showNotifications && (
            <div className="notification-dropdown" ref={dropdownRef}>

              <h4>⚡ Alerts</h4>

              {!hasFetchedAlerts ? (
                <p>ℹ️ Apply filters to check alerts</p>
              ) : alerts.length === 0 ? (
                <p>✅ No alerts available</p>
              ) : (
                alerts.slice(0, 5).map((alert, i) => (
                  <p key={i}>
                    {alert.severity === "CRITICAL" ? "🔴" :
                     alert.severity === "MODERATE" ? "🟡" : "🟢"}{" "}
                    {alert.message}
                  </p>
                ))
              )}

              {alerts.length > 0 && (
                <button
                  className="view-all-btn"
                  onClick={() =>
                    navigate("/insights", { state: { alerts } })
                  }
                >
                  View All
                </button>
              )}

            </div>
          )}

          <p className="dashboard-subtitle">
            Analyze EV adoption, growth trends, and regional performance
          </p>

          <button
            className="insights-nav-btn"
            onClick={() => navigate("/tableau")}
          >
            🔍 Open EV Intelligence Hub
          </button>

          <button
            className="insights-nav-btn"
            onClick={() => navigate("/insights", { state: { alerts } })}
          >
            🔔 Real Time Alerts
          </button>

        </div>

        {/* ===== FILTER ===== */}
        <div className="filter-section">
          <FilterForm
            onFilter={handleFilter}
            onReset={handleReset}
            data={allData}
          />
        </div>

        {/* ===== DATA INFO ===== */}
        <p className="record-count">
          Showing {filteredData.length} of {allData.length} records
        </p>

        {/* ===== INSIGHTS ===== */}
        <h2 className="section-title">⚡ Key Insights</h2>
        <Insights data={filteredData} />

        {/* ===== NEW CHARTS ===== */}
        <h2 className="section-title">📊 EV Analytics</h2>
        <NewCharts data={filteredData} />

      </div>
    </div>
  );
}

export default Dashboard;