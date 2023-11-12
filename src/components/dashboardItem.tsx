import { ReactElement } from "react";
import Divider from "@mui/material/Divider";
import PublicIcon from "@mui/icons-material/Public";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";
import TextFieldsOutlinedIcon from "@mui/icons-material/TextFieldsOutlined";
import MessageIcon from "@mui/icons-material/Message";
import type { DashboardItemPropsType } from "../types/dashboards.types";

const icons: Record<string, ReactElement> = {
  VISUALIZATION: <QueryStatsOutlinedIcon />,
  TEXT: <TextFieldsOutlinedIcon />,
  MAP: <PublicIcon />,
  MESSAGES: <MessageIcon />,
};

const DashboardItem: React.FC<DashboardItemPropsType> = ({
  itemType,
  itemContent,
  selectedFilter,
}) => {
  console.log(itemType);

  return (
    <>
      {(!selectedFilter || itemType === selectedFilter) && (
        <div>
          <p
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{ marginRight: "5px" }}>{icons[itemType]}</span>
            <span>{itemContent}</span>
          </p>
          <Divider />
        </div>
      )}
    </>
  );
};

export default DashboardItem;
