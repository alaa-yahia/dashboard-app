import { useState, useEffect } from "react";
import Dashboard from "./dashboard";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/NativeSelect";
import { setLocalStorage, getLocalStorage } from "../util";
import type { DashboardType } from "../types/dashboards.types";

const Dashboards = () => {
  const [data, setData] = useState<DashboardType[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedDashboardId, setExpandedDashboardId] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState("");

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(event.target.value);
  };
  const savedData = getLocalStorage("dashboard");
  const isDataSaved = savedData.length > 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://gist.githubusercontent.com/kabaros/da79636249e10a7c991a4638205b1726/raw/fa044f54e7a5493b06bb51da40ecc3a9cb4cd3a5/dashboards.json"
        );
        const jsonData = await response.json();
        setData(jsonData?.dashboards);
        setLocalStorage("dashboard", jsonData?.dashboards);
        setExpandedDashboardId(jsonData?.dashboards[0]?.id);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    if (isDataSaved) {
      setData(savedData);
      setExpandedDashboardId(savedData[0]?.id);
    } else {
      fetchData();
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboards</h1>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <label htmlFor="selectInput">Filter items 👇</label>
          <Select
            inputProps={{
              name: "filter",
              id: "selectInput",
            }}
            value={selectedFilter}
            onChange={handleFilterChange}
          >
            <option value={""}>All</option>
            <option value={"VISUALIZATION"}>Visulizations</option>
            <option value={"MAP"}>Maps</option>
            <option value={"MESSAGES"}>Messages</option>
            <option value={"TEXT"}>Text</option>
          </Select>
        </FormControl>
      </Box>
      <ul id="dashboards">
        {data.map((item) => (
          <Dashboard
            key={item.id}
            dashboardData={item}
            allDashboards={data}
            expandedDashboardId={expandedDashboardId}
            setExpandedDashboardId={setExpandedDashboardId}
            selectedFilter={selectedFilter}
          />
        ))}
      </ul>
    </div>
  );
};

export default Dashboards;
