import { useState, useMemo } from "react";
import { IEnvironmentVariable } from "../interfaces";
import { filterVariables, paginateVariables, calculateTotalPages, sortByDate } from "../utils";

interface SortConfig {
  key: string;
  direction: "asc" | "desc" | "none";
}

export const useTableState = (data: IEnvironmentVariable[]) => {
  const [filterText, setFilterText] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [valueFilter, setValueFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "modifiedon",
    direction: "desc",
  });

  const filteredData = useMemo(
    () => filterVariables(data, filterText, typeFilter, valueFilter),
    [data, filterText, typeFilter, valueFilter]
  );


  const sortedData = useMemo(() => {
    if (sortConfig.direction === "none") return filteredData;
    return sortByDate(filteredData, sortConfig.key, sortConfig.direction);
  }, [filteredData, sortConfig]);

  const paginatedData = useMemo(
    () => paginateVariables(sortedData, currentPage, itemsPerPage),
    [sortedData, currentPage, itemsPerPage]
  );

  const totalItems = sortedData.length;
  const totalPages = calculateTotalPages(totalItems, itemsPerPage);

  const handleSort = (columnKey: string) => {
    setSortConfig((prev) => {
      if (prev.key === columnKey) {
        const newDirection =
          prev.direction === "desc" ? "asc" : prev.direction === "asc" ? "none" : "desc";
        return { key: columnKey, direction: newDirection };
      }
      return { key: columnKey, direction: "desc" };
    });
  };

  return {
    filterText,
    setFilterText,
    typeFilter,
    setTypeFilter,
    valueFilter,
    setValueFilter,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    paginatedData,
    totalItems,
    totalPages,
    sortConfig,
    handleSort,
  };
};
