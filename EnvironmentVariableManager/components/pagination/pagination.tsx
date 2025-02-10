import * as React from "react";
import { Button, Select } from "@fluentui/react-components";
import { ChevronLeft24Regular, ChevronRight24Regular } from "@fluentui/react-icons";
import { Fragment } from "react";
import { getPageRange } from "../../utils";

interface IPaginationControlProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  loading?: boolean;
  pageSizeOptions?: number[];
}

const PaginationControl = ({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
  onItemsPerPageChange,
  loading = false,
  pageSizeOptions = [10, 20, 30, 50],
}: IPaginationControlProps) => {
  const startItem = Math.min((currentPage - 1) * itemsPerPage + 1, totalItems);
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="pagination-container">
      <div className="pagination-section">
        <label htmlFor="items-per-page" className="text-sm text-gray-600">
          Items per page
        </label>
        <Select
          id="items-per-page"
          value={itemsPerPage.toString()}
          onChange={onItemsPerPageChange}
          className="pagination-select"
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </Select>
      </div>

      <div className="pagination-section">
        <Button
          appearance="subtle"
          icon={<ChevronLeft24Regular />}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || loading}
          className="pagination-button"
          aria-label="Previous page"
        />

        {getPageRange(currentPage, totalPages).map((page, idx) => (
          <Fragment key={idx}>
            {page === "..." ? (
              <span className="pagination-dots">•••</span>
            ) : (
              <Button
                appearance={currentPage === page ? "primary" : "subtle"}
                onClick={() => onPageChange(Number(page))}
                disabled={loading}
                className={`pagination-button ${
                  currentPage === page ? "pagination-button-current" : ""
                }`}
              >
                {page}
              </Button>
            )}
          </Fragment>
        ))}

        <Button
          appearance="subtle"
          icon={<ChevronRight24Regular />}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || loading}
          className="pagination-button"
          aria-label="Next page"
        />
      </div>

      <div className="pagination-section">
        <span className="pagination-info">
          {totalItems > 0
            ? `Showing ${startItem} to ${endItem} of ${totalItems} results`
            : "No results"}
        </span>
      </div>
    </div>
  );
};

export default PaginationControl;
