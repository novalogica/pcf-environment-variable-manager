import { Badge } from "@fluentui/react-components";
import * as React from "react";

export const Header = () => {
  return (
    <header className="page-header">
      <div className="header-content">
        <h1 className="page-title">Environment Variable Manager</h1>
        <p className="page-description">Manage your Environment Variables across different types</p>
        <div className="badge-container">
          <Badge className="info-badge" appearance="outline" color="informative">
            String
          </Badge>
          <Badge className="info-badge" appearance="outline" color="informative">
            Number
          </Badge>
          <Badge className="info-badge" appearance="outline" color="informative">
            Boolean
          </Badge>
          <Badge className="info-badge" appearance="outline" color="informative">
            JSON
          </Badge>
        </div>
      </div>
    </header>
  );
};

export default Header;
