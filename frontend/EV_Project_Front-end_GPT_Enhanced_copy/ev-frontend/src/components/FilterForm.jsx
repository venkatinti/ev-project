import { useState, useEffect } from "react";

function FilterForm({ onFilter, data }) {

  const [filters, setFilters] = useState({
    year: "",
    state: "",
    vehicleType: ""
  });

  const [years, setYears] = useState([]);
  const [states, setStates] = useState([]);
  const [types, setTypes] = useState([]);

  // ================= EXTRACT UNIQUE VALUES =================
  useEffect(() => {
    if (data && data.length > 0) {

      // 🔥 Clean + unique + sorted
      const uniqueYears = [...new Set(data.map(d => d.year).filter(Boolean))]
        .sort((a, b) => a - b);

      const uniqueStates = [...new Set(data.map(d => d.state).filter(Boolean))]
        .sort();

      const uniqueTypes = [...new Set(data.map(d => d.vehicleType).filter(Boolean))]
        .sort();

      setYears(uniqueYears);
      setStates(uniqueStates);
      setTypes(uniqueTypes);
    }
  }, [data]);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    setFilters(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // ================= APPLY FILTER =================
  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔥 Remove empty values before sending
    const cleanFilters = {};
    Object.keys(filters).forEach(key => {
      if (filters[key] !== "") {
        cleanFilters[key] = filters[key];
      }
    });

    onFilter(cleanFilters);
  };

  // ================= RESET FILTER =================
  const handleReset = () => {
    const resetFilters = {
      year: "",
      state: "",
      vehicleType: ""
    };

    setFilters(resetFilters);
    onFilter({}); // 🔥 send empty → backend returns ALL data
  };

  // ================= UI =================
  return (
    <form className="filter-form" onSubmit={handleSubmit}>

      {/* YEAR */}
      <select name="year" value={filters.year} onChange={handleChange}>
        <option value="">All Years</option>
        {years.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>

      {/* STATE */}
      <select name="state" value={filters.state} onChange={handleChange}>
        <option value="">All States</option>
        {states.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      {/* VEHICLE TYPE */}
      <select name="vehicleType" value={filters.vehicleType} onChange={handleChange}>
        <option value="">All Vehicle Types</option>
        {types.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      {/* BUTTONS */}
      <button type="submit">Apply</button>
      <button type="button" onClick={handleReset}>Reset</button>

    </form>
  );
}

export default FilterForm;