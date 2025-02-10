import { Spinner } from "@fluentui/react-components";
import * as React from "react";

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <Spinner label="Loading..." size="large" />
    </div>
  );
};

export default LoadingSpinner;
