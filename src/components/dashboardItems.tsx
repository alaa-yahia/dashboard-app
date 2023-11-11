import React from "react";

interface DashboardItemsProps {
  id: string;
  expandedDashboardId: string;
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
  id,
  data,
  expandedDashboardId,
}) => {
  const itemComponent = (item: Item) => {
    if (item.type === "TEXT") {
      return item.text && <p key={item.id}>{item.text}</p>;
    }
    if (item.type === "VISUALIZATION") {
      return (
        item.visualization && <p key={item.id}>{item.visualization.name}</p>
      );
    }
    if (item.type === "MAP") {
      return item.map && <p key={item.id}>{item.map.name}</p>;
    }
  };

  return (
    <>
      {id === expandedDashboardId &&
        data &&
        data.map((item) => itemComponent(item))}
    </>
  );
};

export default DashboardItems;
