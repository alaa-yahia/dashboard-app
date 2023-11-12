import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StarRateOutlinedIcon from "@mui/icons-material/StarRateOutlined";
import StarRateIcon from "@mui/icons-material/StarRate";
import IconButton from "@mui/material/IconButton";
import DashboardItems from "./dashboardItems";
import { setLocalStorage } from "../util";
import type {
  DashboardType,
  DashboardItemType,
  DashboardPropsType,
} from "../types/dashboards.types";

const Dashboard: React.FC<DashboardPropsType> = ({
  dashboardData,
  expandedDashboardId,
  setExpandedDashboardId,
  allDashboards,
  selectedFilter,
}) => {
  const dashboardId = dashboardData.id;
  const dashboardTitle = dashboardData.displayName;
  const [data, setData] = useState<DashboardItemType[]>([]);
  const [isStarred, setIsStarred] = useState(dashboardData.starred);
  const [loading, setLoading] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);

  const handleStarToggle = () => {
    const dashboards = [...allDashboards];
    const savedDashboardIndex = dashboards.findIndex(
      (data: DashboardType) => data.id === dashboardId
    );

    dashboards[savedDashboardIndex].starred = !isStarred;
    setLocalStorage("dashboard", dashboards);
    setIsStarred((isStarred) => !isStarred);
  };

  useEffect(() => {
    if (dashboardId === expandedDashboardId && !dataFetched) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await fetch(
            `https://gist.githubusercontent.com/kabaros/da79636249e10a7c991a4638205b1726/raw/fa044f54e7a5493b06bb51da40ecc3a9cb4cd3a5/${dashboardId}.json`
          );
          const jsonData = await response.json();
          setData(jsonData?.dashboardItems);
          setLoading(false);
          setDataFetched(true);
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [dashboardId, expandedDashboardId, dataFetched]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <li style={{ listStyleType: "none" }}>
      <Accordion
        expanded={dashboardId === expandedDashboardId}
        style={{ marginBottom: "60px" }}
      >
        <AccordionSummary
          sx={{
            pointerEvents: "none",
          }}
          expandIcon={
            <ExpandMoreIcon
              onClick={() => {
                setExpandedDashboardId(dashboardId);
              }}
              sx={{
                pointerEvents: "auto",
              }}
            />
          }
          id="accordion-header"
        >
          <Typography
            sx={{ width: "100%", textAlign: "center", fontWeight: "bold" }}
          >
            {dashboardTitle}
          </Typography>
          {isStarred ? (
            <IconButton
              sx={{
                pointerEvents: "auto",
              }}
              onClick={handleStarToggle}
            >
              <StarRateIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={handleStarToggle}
              sx={{
                pointerEvents: "auto",
              }}
            >
              <StarRateOutlinedIcon />
            </IconButton>
          )}
        </AccordionSummary>
        <AccordionDetails>
          <DashboardItems
            data={data}
            isDashboardOpen={dashboardId === expandedDashboardId}
            selectedFilter={selectedFilter}
          />
        </AccordionDetails>
      </Accordion>
    </li>
  );
};

export default Dashboard;
