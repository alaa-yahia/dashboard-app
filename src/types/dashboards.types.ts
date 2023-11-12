export interface DashboardType {
  id: string;
  displayName: string;
  starred: boolean;
}

export type DashboardItemType = {
  id: string;
  type: "TEXT" | "VISUALIZATION" | "MAP" | "MESSAGES";
  text: string;
  visualization: {
    name: string;
  };
  map: {
    name: string;
  };
  messages: boolean;
};

export interface DashboardPropsType {
  dashboardData: DashboardType;
  expandedDashboardId: string;
  setExpandedDashboardId: React.Dispatch<React.SetStateAction<string>>;
  allDashboards: DashboardType[];
  selectedFilter: string;
}

export interface DashboardItemsPropsType {
  isDashboardOpen: boolean;
  data: DashboardItemType[];
  selectedFilter: string;
}
