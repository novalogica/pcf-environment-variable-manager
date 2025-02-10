import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@fluentui/react-components";
import { ArrowDownRegular, ArrowUpRegular } from "@fluentui/react-icons";
import { IColumn, IEnvironmentVariable } from "../../interfaces";
import EmptyState from "../empty-state/empty-state";
import { EnvironmentVariableRow } from "../table-row/table-row";

interface ITableComponentProps {
  data: IEnvironmentVariable[];
  filterText?: string;
  handleSort: (columnKey: string) => void;
  sortConfig: { key: string; direction: "asc" | "desc" | "none" };
  updateVariableValue: (definitionId: string, newValue: string) => Promise<void>;
}

const columns: IColumn[] = [
  { columnKey: "schemaname", label: "Schema Name", sortable: false },
  { columnKey: "displayname", label: "Display Name", sortable: false },
  { columnKey: "description", label: "Description", sortable: false },
  { columnKey: "type", label: "Type", sortable: false },
  { columnKey: "defaultvalue", label: "Default Value", sortable: false },
  { columnKey: "value", label: "Current Value", sortable: false },
  { columnKey: "modifiedon", label: "Modified On", sortable: true },
  { columnKey: "actions", label: "Actions", sortable: false },
];

const SortIndicator = ({ direction }: { direction: "asc" | "desc" | "none" }) => {
  if (direction === "asc") return <ArrowUpRegular />;
  if (direction === "desc") return <ArrowDownRegular />;
  return null;
};

export const TableComponent = ({
  data,
  filterText,
  handleSort,
  sortConfig,
  updateVariableValue,
}: ITableComponentProps) => {
  return (
    <main className="table-container">
      <Table className="env-vars-table" aria-label="Environment variables table">
        <TableHeader>
          <TableRow>
            {columns.map(({ columnKey, label, sortable }) => (
              <TableHeaderCell
                key={columnKey}
                onClick={sortable ? () => handleSort(columnKey) : undefined}
                aria-sort={
                  sortable && sortConfig.key === columnKey
                    ? sortConfig.direction === "asc"
                      ? "ascending"
                      : sortConfig.direction === "desc"
                      ? "descending"
                      : "none"
                    : undefined
                }
              >
                <div className="header-cell-content">
                  {label}
                  {sortable && (
                    <SortIndicator
                      direction={sortConfig.key === columnKey ? sortConfig.direction : "none"}
                    />
                  )}
                </div>
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((variable) => (
              <EnvironmentVariableRow
                key={variable.definition.environmentvariabledefinitionid}
                variable={variable}
                onUpdate={updateVariableValue}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length}>
                <EmptyState filterText={filterText} />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </main>
  );
};
