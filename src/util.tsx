import type { DashboardType } from "./types/dashboards.types";

export const getLocalStorage = (key: string) => {
  return JSON.parse(sessionStorage.getItem(key) || "[]");
};

export const setLocalStorage = (key: string, value: DashboardType[]) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};
