import * as React from "react";
import {
  FluentProvider,
  webLightTheme,
  MessageBar,
  MessageBarBody,
  MessageBarTitle,
  useArrowNavigationGroup,
} from "@fluentui/react-components";
import { Toaster } from "react-hot-toast";
import { IInputs } from "./generated/ManifestTypes";
import PaginationControl from "./components/pagination/pagination";
import LoadingSpinner from "./components/loading/loading";
import { Header } from "./components/header/header";
import { TableComponent } from "./components/table/table";
import { FilterSection } from "./components/filter/filter";
import { useDataverse } from "./hooks/useDataverse";
import { useTableState } from "./hooks/useTableState";
import { EnvironmentVariableContext } from "./context/environmnet-variable-context";

interface IAppProps {
  context: ComponentFramework.Context<IInputs>;
  notificationPosition:
    | "top-right"
    | "bottom-right"
    | "top-center"
    | "bottom-center"
    | "top-left"
    | "bottom-left";
}

const App = ({ context, notificationPosition }: IAppProps) => {
  const { isLoading, variables, updateVariableValue, checkUserRoles } = useDataverse(context);
  const hasPermissions = checkUserRoles();
  const {
    filterText,
    setFilterText,
    setTypeFilter,
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
  } = useTableState(variables);

  return (
    <EnvironmentVariableContext.Provider value={{ context }}>
      <FluentProvider theme={webLightTheme}>
        <div className="app-container">
          <Toaster position={notificationPosition} />
          <Header />
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              {!hasPermissions && (
                <MessageBar intent="warning">
                  <MessageBarBody>
                    <MessageBarTitle>Warning</MessageBarTitle>
                    You may not have the necessary permissions to edit environment variables, as you
                    are not assigned the &quot;System Administrator&quot; or &quot;System
                    Customizer&quot; roles.
                  </MessageBarBody>
                </MessageBar>
              )}

              <FilterSection
                filterText={filterText}
                setFilterText={setFilterText}
                setTypeFilter={setTypeFilter}
                setValueFilter={setValueFilter}
              />

              <TableComponent
                data={paginatedData}
                filterText={filterText}
                handleSort={handleSort}
                sortConfig={sortConfig}
                updateVariableValue={updateVariableValue}
              />

              <PaginationControl
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              />
            </>
          )}
        </div>
      </FluentProvider>
    </EnvironmentVariableContext.Provider>
  );
};

export default App;
