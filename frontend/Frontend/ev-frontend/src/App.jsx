import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TableauInsights from "./pages/TableauInsights";
import InsightsPage from "./pages/InsightsPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/tableau" element={<TableauInsights />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/insights" element={<InsightsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;