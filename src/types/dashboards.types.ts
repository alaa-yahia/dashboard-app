export interface DashboardType {
  id: string;
  displayName: string;
  starred: boolean;
}

export type DashboardItemType = {
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
