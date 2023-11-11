import { useState, useEffect } from "react";
import Dashboard from "./dashboard";

interface Data {
  id: string;
  displayName: string;
  starred: boolean;
}

const Dashboards = () => {
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedDashboardId, setExpandedDashboardId] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://gist.githubusercontent.com/kabaros/da79636249e10a7c991a4638205b1726/raw/fa044f54e7a5493b06bb51da40ecc3a9cb4cd3a5/dashboards.json"
        );
        const jsonData = await response.json();
        setData(jsonData?.dashboards);
        setExpandedDashboardId(jsonData?.dashboards[0]?.id);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboards</h1>
      <ul>
        {data.map((item) => (
          <Dashboard
            key={item.id}
            dashboardId={item.id}
            dashboardTitle={item.displayName}
            expandedDashboardId={expandedDashboardId}
            setExpandedDashboardId={setExpandedDashboardId}
          />
        ))}
      </ul>
    </div>
  );
};

export default Dashboards;
