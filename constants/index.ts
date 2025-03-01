import { STATUS_TYPE, USER_ROLE, UTILITY_TYPE } from "./enums";

export const USER_ROLE_OPTIONS = [
  { label: "Admin", value: USER_ROLE.ADMIN },
  { label: "User", value: USER_ROLE.USER },
];

export const UTILITY_TYPE_OPTIONS = [
  { label: "Water", value: UTILITY_TYPE.WATER },
  { label: "Electricity", value: UTILITY_TYPE.ELECTRICITY },
  { label: "Waste", value: UTILITY_TYPE.WASTE },
  { label: "Air Quality", value: UTILITY_TYPE.AIRQUALITY },
];

export const TIME_RANGES = [
  { label: "Last 24 hours", value: "24h" },
  { label: "Last 7 days", value: "7d" },
  { label: "Last 30 days", value: "30d" },
];

export const STATUS_OPTIONS = [
  { label: "Active", value: STATUS_TYPE.ACTIVE },
  { label: "Inactive", value: STATUS_TYPE.INACTIVE },
  { label: "Blocked", value: STATUS_TYPE.BLOCKED },
  { label: "Deleted", value: STATUS_TYPE.DELETED },
  { label: "Pending", value: STATUS_TYPE.PENDING },
  { label: "Resolved", value: STATUS_TYPE.RESOLVED },
];

export const CATEGORY_OPTIONS = [
  { label: "Water", value: UTILITY_TYPE.WATER },
  { label: "Electricity", value: UTILITY_TYPE.ELECTRICITY },
  { label: "Waste", value: UTILITY_TYPE.WASTE },
  { label: "General", value: UTILITY_TYPE.GENERAL },
];

export const ACCESS_TOKEN_KEY = "ACCESS_TOKEN";
export const REFRESH_TOKEN_KEY = "REFRESH_TOKEN";

export const SERVICE_ID = "6e8c3458-3712-4ed6-b6d6-f40d5505f577";
