import React from "react";
import ItemContainer from "./itemContainer";
import PublicIcon from "@mui/icons-material/Public";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";
import TextFieldsOutlinedIcon from "@mui/icons-material/TextFieldsOutlined";
import type {
  DashboardItemsPropsType,
  DashboardItemType,
} from "../types/dashboards.types";

const DashboardItems: React.FC<DashboardItemsPropsType> = ({
  data,
  isDashboardOpen,
  selectedFilter,
}) => {
  const itemComponent = (item: DashboardItemType) => {
    if (
      (!selectedFilter && item.type === "TEXT") ||
      selectedFilter === "TEXT"
    ) {
      return (
        item.text && (
          <ItemContainer key={item.id}>
            <>
              <TextFieldsOutlinedIcon style={{ marginRight: "5px" }} />
              <span>{item.text}</span>
            </>
          </ItemContainer>
        )
      );
    }
    if (
      (!selectedFilter && item.type === "VISUALIZATION") ||
      selectedFilter === "VISUALIZATION"
    ) {
      return (
        item.visualization && (
          <ItemContainer key={item.id}>
            <>
              <QueryStatsOutlinedIcon style={{ marginRight: "5px" }} />
              <span>{item.visualization.name}</span>
            </>
          </ItemContainer>
        )
      );
    }
    if ((!selectedFilter && item.type === "MAP") || selectedFilter === "MAP") {
      return (
        item.map && (
          <ItemContainer key={item.id}>
            <>
              <PublicIcon style={{ marginRight: "5px" }} />
              <span>{item.map.name}</span>
            </>
          </ItemContainer>
        )
      );
    }
  };

  return (
    <>{isDashboardOpen && data && data.map((item) => itemComponent(item))}</>
  );
};

export default DashboardItems;
