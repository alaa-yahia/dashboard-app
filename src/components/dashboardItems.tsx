import React from "react";
import Divider from "@mui/material/Divider";
interface DashboardItemsProps {
  isDashboardOpen: boolean;
  data: Item[];
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

const DashboardItems: React.FC<DashboardItemsProps> = ({
  data,
  isDashboardOpen,
}) => {
  const itemComponent = (item: Item) => {
    if (item.type === "TEXT") {
      return (
        item.text && (
          <div key={item.id}>
            <Divider />
            <p>{item.text}</p>
          </div>
        )
      );
    }
    if (item.type === "VISUALIZATION") {
      return (
        item.visualization && (
          <div key={item.id}>
            <Divider />
            <p>{item.visualization.name}</p>
          </div>
        )
      );
    }
    if (item.type === "MAP") {
      return (
        item.map && (
          <div key={item.id}>
            <Divider />
            <p>{item.map.name}</p>
          </div>
        )
      );
    }
  };

  return (
    <>{isDashboardOpen && data && data.map((item) => itemComponent(item))}</>
  );
};

export default DashboardItems;
