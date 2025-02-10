import * as React from "react";
import { Database48Regular } from "@fluentui/react-icons";

interface IEmptyStateProps {
  filterText?: string;
}

const EmptyState = ({ filterText }: IEmptyStateProps) => (
  <div className="empty-state">
    <Database48Regular
      aria-label={filterText ? "Empty search results" : "No data available"}
      className="empty-icon"
    />
    <div className="empty-message">
      <h3>No Environment Variables Found</h3>
      <p>
        {filterText ? `No results matching "${filterText}"` : "No environment variables available."}
      </p>
    </div>
  </div>
);

export default EmptyState;
