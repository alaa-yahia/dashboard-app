import React from "react";
import ItemContainer from "./itemContainer";
import PublicIcon from "@mui/icons-material/Public";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";
import TextFieldsOutlinedIcon from "@mui/icons-material/TextFieldsOutlined";

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
          <ItemContainer>
            <>
              <TextFieldsOutlinedIcon style={{ marginRight: "5px" }} />
              <span>{item.text}</span>
            </>
          </ItemContainer>
        )
      );
    }
    if (item.type === "VISUALIZATION") {
      return (
        item.visualization && (
          <ItemContainer>
            <>
              <QueryStatsOutlinedIcon style={{ marginRight: "5px" }} />
              <span>{item.visualization.name}</span>
            </>
          </ItemContainer>
        )
      );
    }
    if (item.type === "MAP") {
      return (
        item.map && (
          <ItemContainer>
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
