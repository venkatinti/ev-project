import axios from "axios";

// ================= BASE CONFIG =================
const AUTH_API = axios.create({
  baseURL: "http://localhost:9090/api/auth",
  timeout: 10000
});

const EV_API = axios.create({
  baseURL: "http://localhost:9090/api/ev",
  timeout: 15000
});

// ================= CACHE =================
const cache = {
  allData: {
    data: null,
    timestamp: null,
    TTL: 5 * 60 * 1000 // 5 minutes
  }
};

// ================= AUTH APIs =================
export const signup = (data) => AUTH_API.post("/signup", data);

export const login = (data) => AUTH_API.post("/login", data);

// ================= EV DATA APIs =================

// 👉 Fetch ALL data with caching
export const fetchAllEVData = async (forceRefresh = false) => {
  try {
    const now = Date.now();

    // ✅ Use cache if valid
    if (
      !forceRefresh &&
      cache.allData.data &&
      cache.allData.timestamp &&
      now - cache.allData.timestamp < cache.allData.TTL
    ) {
      console.log("Returning cached data");
      return cache.allData.data;
    }

    console.log("Fetching fresh data...");
    const response = await EV_API.get("/all");

    cache.allData.data = response.data;
    cache.allData.timestamp = now;

    return response.data;

  } catch (error) {
    console.error("Error fetching all EV data:", error);

    if (cache.allData.data) {
      console.log("Returning cached data (fallback)");
      return cache.allData.data;
    }

    return [];
  }
};

// ================= ALERT API (NEW 🔥) =================

// 👉 Fetch alerts based on filters
export const fetchAlerts = async (filters = {}) => {
  try {

    const payload = {
      year: filters?.year ?? null,
      state: filters?.state ?? null,
      vehicleType: filters?.vehicleType ?? null
    };

    // 🔥 GET USER EMAIL
    const user = JSON.parse(localStorage.getItem("user"));
    const email = user?.email;

    console.log("Sending email:", email);

    const response = await EV_API.post(
      `/alerts?email=${email}`,   // 🔥 ADD THIS
      payload,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    return response.data;

  } catch (error) {
    console.error("Error fetching alerts:", error.response?.data || error.message);
    return [];
  }
};

// ================= OPTIONAL (Future Use) =================

// 👉 Chart Data API (if needed later)
export const fetchChartData = async (filters) => {
  try {
    const response = await EV_API.post("/chart-data", filters);
    return response.data;
  } catch (error) {
    console.error("Error fetching chart data:", error);
    return {};
  }
};

// 👉 Summary Stats API
export const fetchSummaryStats = async (filters) => {
  try {
    const response = await EV_API.post("/stats", filters);
    return response.data;
  } catch (error) {
    console.error("Error fetching stats:", error);
    return {};
  }
};

// ================= DEPRECATED =================

// ❌ Not used anymore (client-side filtering)
export const fetchEVData = async () => {
  console.warn("fetchEVData is deprecated");
  return [];
};

export const fetchLiveAlerts = async () => {
  try {
    const res = await axios.get("http://localhost:9090/api/ev/live-alerts");
    return res.data;
  } catch (error) {
    console.error("Error fetching live alerts:", error);
    return {};
  }
};