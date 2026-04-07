import { useState, useEffect } from "react";

function TableauView({ section }) {

  const [loading, setLoading] = useState(true);
  const [iframeSrc, setIframeSrc] = useState("");

  // ================= URL MAP =================
  const getDashboardUrl = (sectionType) => {
    const urls = {
      growth: "https://public.tableau.com/views/EV_Book2_Dashboards/EVGROWTHDASHBOARD",
      environment: "https://public.tableau.com/views/EV_Book2_Dashboards/ENVIRONMENTIMPACTDASHBOARD",
      infrastructure: "https://public.tableau.com/views/EV_Book2_Dashboards/INFRASTRUCTURETECHNOLOGYDASHBOARD",
      economy: "https://public.tableau.com/views/EV_Book2_Dashboards/ECONOMICFACTORSDASHBOARD",
      fuel: "https://public.tableau.com/views/EV_Book2_Dashboards/EFFECTOFEVADOPTIONONFUELDASHBOARD",

      // ✅ STORIES (IMPORTANT)
      story1: "https://public.tableau.com/views/EV_Book2_Dashboards/EVAdoptionJourney",
      story2: "https://public.tableau.com/views/EV_Book2_Dashboards/EVADOPTIONANALYTICSSTORY"
    };

    return urls[sectionType] || urls.growth;
  };

  // ================= LOAD HANDLER =================
  useEffect(() => {
    setLoading(true);

    const baseUrl = getDashboardUrl(section);

    // ✅ ENHANCED EMBED SETTINGS
    const fullUrl = `${baseUrl}?:embed=y&:showVizHome=no&:toolbar=no`;

    setIframeSrc(fullUrl);

  }, [section]);

  return (
    <div className="tableau-container">

      {/* ===== LOADER ===== */}
      {loading && (
        <div className="tableau-loader">
          <div className="loader-content">
            <div className="spinner"></div>
            <p>Loading insights...</p>
          </div>
        </div>
      )}

      {/* ===== IFRAME ===== */}
      {iframeSrc && (
        <iframe
          key={iframeSrc}   // 🔥 VERY IMPORTANT (forces reload)
          src={iframeSrc}
          title="Tableau Dashboard"
          className="tableau-iframe"
          onLoad={() => setLoading(false)}
          allowFullScreen
        />
      )}

    </div>
  );
}

export default TableauView;