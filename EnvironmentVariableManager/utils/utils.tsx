import { EnvTypes, IEnvironmentVariable } from "../interfaces";

type NotificationPosition =
  | "top-right"
  | "bottom-right"
  | "top-center"
  | "bottom-center"
  | "top-left"
  | "bottom-left";

export const getNotificationPosition = (position: string): NotificationPosition => {
  const validPositions: NotificationPosition[] = [
    "top-right",
    "bottom-right",
    "top-center",
    "bottom-center",
    "top-left",
    "bottom-left",
  ];

  return validPositions.includes(position as NotificationPosition)
    ? (position as NotificationPosition)
    : "top-right";
};

export const filterVariables = (
  variables: IEnvironmentVariable[],
  filterText: string,
  typeFilter: string,
  valueFilter: string
): IEnvironmentVariable[] => {
  return variables.filter((variable) => {
    const matchesText =
      variable.definition.schemaname.toLowerCase().includes(filterText.toLowerCase()) ||
      variable.definition.displayname.toLowerCase().includes(filterText.toLowerCase());
    const matchesType =
      typeFilter === "all" || variable.definition.type.toString() === typeFilter.toLowerCase();
    const matchesValue = valueFilter === "all" || variable.value?.value === valueFilter;
    return matchesText && matchesType && matchesValue;
  });
};

export const paginateVariables = (
  variables: IEnvironmentVariable[],
  currentPage: number,
  itemsPerPage: number
): IEnvironmentVariable[] => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  return variables.slice(startIndex, startIndex + itemsPerPage);
};

export const calculateTotalPages = (totalItems: number, itemsPerPage: number): number => {
  return Math.ceil(totalItems / itemsPerPage);
};

export const sortByDate = <T extends Record<string, any>>(
  items: T[],
  dateKey: string,
  direction: "asc" | "desc" = "desc"
): T[] => {
  return [...items].sort((a, b) => {
    const dateA = new Date(a.value?.[dateKey] || 0).getTime();
    const dateB = new Date(b.value?.[dateKey] || 0).getTime();
    if (isNaN(dateA) && isNaN(dateB)) return 0;
    if (isNaN(dateA)) return direction === "asc" ? 1 : -1;
    if (isNaN(dateB)) return direction === "asc" ? -1 : 1;
    return direction === "asc" ? dateA - dateB : dateB - dateA;
  });
};

export const formatDateTime = (
  dateString?: string | null,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  },
  locale: string = "en-US",
  fallbackText: string = "N/A"
): string => {
  if (!dateString) return fallbackText;
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return fallbackText;
  return new Intl.DateTimeFormat(locale, options).format(date);
};

export const formatJSONContent = (value: string): string => {
  if (!value.trim().startsWith("{") && !value.trim().startsWith("[")) return value;
  try {
    return JSON.stringify(JSON.parse(value), null, 2);
  } catch {
    return value;
  }
};

export const validateVariableValue = (value: string, type: EnvTypes): boolean => {
  switch (type) {
    case EnvTypes.string:
      return typeof value === "string";
    case EnvTypes.number:
      return validateNumber(value);
    case EnvTypes.boolean:
      return value.toLowerCase() === "true" || value.toLowerCase() === "false";
    case EnvTypes.json:
      return validateJSON(value);
    default:
      return false;
  }
};

export const validateJSON = (value: string): boolean => {
  if (!value.trim().startsWith("{") && !value.trim().startsWith("[")) return true;
  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
};

export const validateNumber = (value: string): boolean => {
  return !isNaN(Number(value)) && value.trim() !== "";
};

export const getPageRange = (currentPage: number, totalPages: number): (number | string)[] => {
  const delta = 2;
  const range: number[] = [];
  const rangeWithDots: (number | string)[] = [];
  let l: number | undefined;

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
      range.push(i);
    }
  }

  range.forEach((i) => {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  });

  return rangeWithDots;
};
