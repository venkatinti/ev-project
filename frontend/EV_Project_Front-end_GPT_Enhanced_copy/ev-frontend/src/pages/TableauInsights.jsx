import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TableauView from "../components/TableauView";
import "../styles/dashboard.css";

function TableauInsights() {

  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("growth");
  const [isTransitioning, setIsTransitioning] = useState(false);

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // ================= BACK =================
  const handleBack = () => {
    navigate("/dashboard");
  };

  // ================= SECTION CHANGE =================
  const handleSectionChange = useCallback((section) => {
    if (section === activeSection) return;

    setIsTransitioning(true);

    setTimeout(() => {
      setActiveSection(section);
      setIsTransitioning(false);
    }, 150);
  }, [activeSection]);

  // ================= PREFETCH =================
  useEffect(() => {
    const sections = [
      "growth",
      "environment",
      "infrastructure",
      "economy",
      "fuel",
      "story1",
      "story2"
    ];

    const currentIndex = sections.indexOf(activeSection);
    const nextIndex = (currentIndex + 1) % sections.length;

    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = `https://public.tableau.com/views/EV_Book2_Dashboards/${getDashboardName(sections[nextIndex])}`;
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [activeSection]);

  // ================= DASHBOARD / STORY MAP =================
  const getDashboardName = (section) => {
    const names = {
      growth: "EVGROWTHDASHBOARD",
      environment: "ENVIRONMENTIMPACTDASHBOARD",
      infrastructure: "INFRASTRUCTURETECHNOLOGYDASHBOARD",
      economy: "ECONOMICFACTORSDASHBOARD",
      fuel: "EFFECTOFEVADOPTIONONFUELDASHBOARD",

      story1: "EVAdoptionJourney",
      story2: "storydashboard"
    };
    return names[section] || names.growth;
  };

  return (
    <div className="dashboard-container tableau-page">

      <div className="dashboard-content">

        {/* ===== HEADER ===== */}
        <div className="dashboard-header">

          {/* 🔴 LOGOUT */}
          <button className="logout-btn header-logout" onClick={handleLogout}>
            Logout
          </button>

          <h1 className="dashboard-title">⚡ EV Intelligence Hub</h1>
          <p className="dashboard-subtitle">
            Advanced Tableau Insights
          </p>
        </div>

        {/* ===== SECTION TABS ===== */}
        <div className="dashboard-sections">

          <div
            className={`section-card ${activeSection === "growth" ? "active" : ""}`}
            onClick={() => handleSectionChange("growth")}
          >
            📈 Growth
          </div>

          <div
            className={`section-card ${activeSection === "environment" ? "active" : ""}`}
            onClick={() => handleSectionChange("environment")}
          >
            🌱 Environment
          </div>

          <div
            className={`section-card ${activeSection === "infrastructure" ? "active" : ""}`}
            onClick={() => handleSectionChange("infrastructure")}
          >
            🔌 Infra
          </div>

          <div
            className={`section-card ${activeSection === "economy" ? "active" : ""}`}
            onClick={() => handleSectionChange("economy")}
          >
            💰 Economy
          </div>

          <div
            className={`section-card ${activeSection === "fuel" ? "active" : ""}`}
            onClick={() => handleSectionChange("fuel")}
          >
            ⛽ Fuel
          </div>

          <div
            className={`section-card ${activeSection === "story1" ? "active" : ""}`}
            onClick={() => handleSectionChange("story1")}
          >
            📖 Adoption Journey
          </div>

          <div
            className={`section-card ${activeSection === "story2" ? "active" : ""}`}
            onClick={() => handleSectionChange("story2")}
          >
            📊 Market Insights
          </div>

        </div>

        {/* ===== TABLEAU VIEW ===== */}
        <div className={`tableau-wrapper ${isTransitioning ? "transitioning" : ""}`}>
          <TableauView section={activeSection} />
        </div>

        {/* 🔽 BACK BUTTON MOVED TO BOTTOM */}
        <div className="back-btn-container">
          <button className="back-dashboard-btn" onClick={handleBack}>
            ← Back to Dashboard
          </button>
        </div>

      </div>
    </div>
  );
}

export default TableauInsights;