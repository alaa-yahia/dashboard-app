import React, { useState, useEffect } from "react";
import DashboardItems from "./dashboardItems";

interface DashboardCardProps {
  id: string;
  title: string;
  expandedDashboardId: string;
  setExpandedDashboardId: React.Dispatch<React.SetStateAction<string>>;
}
type Item = {
  id: string;
  type: "TEXT" | "VISUALIZATION" | "MAP";
  text: string;
  visualization: {
    name: string;
  };
  map: {
    name: string;
  };
};

const Dashboard: React.FC<DashboardCardProps> = ({
  id,
  title,
  expandedDashboardId,
  setExpandedDashboardId,
}) => {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://gist.githubusercontent.com/kabaros/da79636249e10a7c991a4638205b1726/raw/fa044f54e7a5493b06bb51da40ecc3a9cb4cd3a5/${id}.json`
        );
        const jsonData = await response.json();
        setData(jsonData?.dashboardItems);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p
        onClick={() => {
          setExpandedDashboardId(id);
        }}
      >
        {title}
      </p>
      <DashboardItems
        id={id}
        data={data}
        expandedDashboardId={expandedDashboardId}
      />
    </div>
  );
};

export default Dashboard;
