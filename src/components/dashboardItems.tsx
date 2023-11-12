import React from "react";
import DashboardItem from "./dashboardItem";

import type { DashboardItemsPropsType } from "../types/dashboards.types";

const DashboardItems: React.FC<DashboardItemsPropsType> = ({
  data,
  isDashboardOpen,
  selectedFilter,
}) => {
  return (
    <>
      {isDashboardOpen &&
        data &&
        data.map((item) => (
          <DashboardItem
            itemType={item.type}
            itemContent={
              item.type === "TEXT"
                ? item.text
                : item.type === "MESSAGES"
                ? String(item.messages)
                : item.type === "VISUALIZATION"
                ? item.visualization.name
                : item.type === "MAP"
                ? item.map.name
                : ""
            }
            selectedFilter={selectedFilter}
          />
        ))}
    </>
  );
};

export default DashboardItems;
