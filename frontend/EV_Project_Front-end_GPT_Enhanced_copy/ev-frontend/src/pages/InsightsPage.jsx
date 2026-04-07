import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAlerts, fetchAllEVData, fetchLiveAlerts } from "../services/api";
import FilterForm from "../components/FilterForm";
import "../styles/dashboard.css";
import "../styles/insights.css";

function InsightsPage() {

  const navigate = useNavigate();
  const dropdownRef = useRef();

  const [alerts, setAlerts] = useState([]);
  const [allData, setAllData] = useState([]);
  const [hasAlerts, setHasAlerts] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const [liveAlerts, setLiveAlerts] = useState({});
  const [hasApiCritical, setHasApiCritical] = useState(false);

  // ================= LOAD DB DATA =================
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await fetchAllEVData();
      setAllData(data);
    } catch (err) {
      console.error("Error loading data:", err);
    }
  };

  // ================= LOAD API ALERTS =================
  useEffect(() => {

    const loadLiveAlerts = async () => {
      const data = await fetchLiveAlerts();
      setLiveAlerts(data);

      const hasCritical = Object.values(data).includes("CRITICAL");
      setHasApiCritical(hasCritical);
    };

    loadLiveAlerts();

    const interval = setInterval(loadLiveAlerts, 10000);
    return () => clearInterval(interval);

  }, []);

  // ================= HANDLE FILTER =================
  const handleFilter = async (filters) => {
    try {
      const data = await fetchAlerts(filters);
      setAlerts(data);
      setHasAlerts(data.length > 0);
      setHasFetched(true);
    } catch (err) {
      console.error("Insights alert error:", err);
    }
  };

  // ================= BELL =================
  const handleBellClick = () => {
    if (!hasFetched && !hasApiCritical) return;
    setShowNotifications(prev => !prev);
  };

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

  // ================= FORMAT DB ALERTS =================
  const formatAlerts = (alerts) => {
    return alerts.map((a, index) => {

      let icon = "🟡";
      let className = "moderate";

      if (a.severity === "CRITICAL") {
        icon = "🔴";
        className = "critical";
      }

      if (a.severity === "GOOD") {
        icon = "🟢";
        className = "good";
      }

      return {
        id: index,
        text: a.message,
        severity: `${icon} ${a.severity}`,
        className
      };
    });
  };

  const formattedAlerts = formatAlerts(alerts);

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">

        {/* ===== HEADER ===== */}
        <div className="dashboard-header" style={{ position: "relative" }}>

          <h1 className="dashboard-title">⚡ Actionable Insights</h1>

          {/* 🔔 BELL */}
          <div
            className="notification-wrapper"
            onClick={handleBellClick}
            style={{
              cursor: (hasFetched || hasApiCritical) ? "pointer" : "not-allowed",
              opacity: (hasFetched || hasApiCritical) ? 1 : 0.5
            }}
          >
            🔔

            {((hasFetched && hasAlerts) || hasApiCritical) && (
              <span className="notification-dot"></span>
            )}
          </div>

          {/* 🔽 DROPDOWN */}
          {showNotifications && (hasFetched || hasApiCritical) && (
            <div className="notification-dropdown" ref={dropdownRef}>

              <h4>⚡ Alerts</h4>

              {/* DB ALERTS */}
              {alerts.length > 0 && alerts.slice(0, 3).map((a, i) => (
                <p key={"db-" + i}>
                  {a.severity === "CRITICAL" ? "🔴" :
                   a.severity === "MODERATE" ? "🟡" : "🟢"}{" "}
                  {a.message}
                </p>
              ))}

              {/* API ALERTS */}
              {Object.entries(liveAlerts).map(([state, status], i) => (
                <p key={"api-" + i}>
                  {status === "CRITICAL" ? "🔴" :
                   status === "MODERATE" ? "🟡" : "🟢"}{" "}
                  {state} - {status}
                </p>
              ))}

              {/* EMPTY */}
              {alerts.length === 0 && Object.keys(liveAlerts).length === 0 && (
                <p>✅ No issues detected</p>
              )}

            </div>
          )}

          <p className="dashboard-subtitle">
            Smart recommendations based on EV data analysis
          </p>
        </div>

        {/* ===== FILTER ===== */}
        <div className="filter-section">
          <FilterForm onFilter={handleFilter} data={allData} />
        </div>

        {/* ===== LIVE API ALERTS ===== */}
        <h2 className="section-title">⚡ Live API Alerts</h2>

        <div className="alerts-container">

          {Object.keys(liveAlerts).length === 0 ? (
            <div className="alert-card moderate">
              ℹ️ Loading live data...
            </div>
          ) : (
            Object.entries(liveAlerts).map(([state, status]) => (
              <div
                key={state}
                className={`alert-card ${
                  status === "CRITICAL"
                    ? "critical"
                    : status === "MODERATE"
                    ? "moderate"
                    : "good"
                }`}
              >
                <h3>
                  {status === "CRITICAL" ? "🔴" :
                   status === "MODERATE" ? "🟡" : "🟢"} {status}
                </h3>
                <p>{state} infrastructure status</p>
              </div>
            ))
          )}

        </div>

        {/* ===== DB ALERTS ===== */}
        <h2 className="section-title">📊 Data-Based Alerts</h2>

        <div className="alerts-container">

          {!hasFetched ? (
            <div className="alert-card moderate">
              ℹ️ Apply filters to see insights
            </div>
          ) : formattedAlerts.length === 0 ? (
            <div className="alert-card good">
              🟢 No issues detected. Infrastructure is balanced.
            </div>
          ) : (
            formattedAlerts.map(alert => (
              <div key={alert.id} className={`alert-card ${alert.className}`}>
                <h3>{alert.severity}</h3>
                <p>{alert.text}</p>
              </div>
            ))
          )}

        </div>

        {/* ===== BACK ===== */}
        <button
          className="back-btn"
          onClick={() => navigate("/dashboard")}
        >
          ⬅ Back to Dashboard
        </button>

      </div>
    </div>
  );
}

export default InsightsPage;