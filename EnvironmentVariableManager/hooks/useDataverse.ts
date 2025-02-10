import { useEffect, useState, useCallback } from "react";
import { IInputs } from "../generated/ManifestTypes";
import { IEnvironmentVariable } from "../interfaces";

interface IDataverseHookResult {
  checkUserRoles: () => Promise<boolean>;
  isLoading: boolean;
  error: Error | null;
  variables: IEnvironmentVariable[];
  updateVariableValue: (definitionId: string, newValue: string) => Promise<void>;
  refresh?: () => Promise<void>;
}

export const useDataverse = (
  context?: ComponentFramework.Context<IInputs>
): IDataverseHookResult => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [variables, setVariables] = useState<IEnvironmentVariable[]>([]);
  const { webAPI } = context!;

  const checkUserRoles = useCallback(async (): Promise<boolean> => {
    if (!context) return false;

    const userRoleIds = context.userSettings.securityRoles;
    if (userRoleIds.length === 0) {
      console.warn("User has no assigned roles.");
      return false;
    }
    const filterQuery = userRoleIds.map((roleId) => `roleid eq ${roleId}`).join(" or ");

    try {
      const rolesResponse = await context.webAPI.retrieveMultipleRecords(
        "role",
        `?$select=roleid,name&$filter=(${filterQuery})`
      );
      const targetRoles = ["System Administrator", "System Customizer"];
      const userRoleNames = rolesResponse.entities.map((role) => role.name);
      return userRoleNames.some((roleName) => targetRoles.includes(roleName));
    } catch (error) {
      console.error("Error retrieving roles:", error);
      return false;
    }
  }, [context]);

  const getEnvironmentVariables = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const environmentVariables = await webAPI.retrieveMultipleRecords(
        "environmentvariabledefinition",
        "?$select=environmentvariabledefinitionid,defaultvalue,description,displayname,schemaname,type&$expand=environmentvariabledefinition_environmentvariablevalue($select=environmentvariablevalueid,modifiedon,value)&$filter=(type ne 100000004 and type ne 100000005)"
      );

      const combined = environmentVariables.entities.map((envDefinition) => {
        const envValue = envDefinition.environmentvariabledefinition_environmentvariablevalue?.[0];
        return {
          definition: {
            environmentvariabledefinitionid: envDefinition.environmentvariabledefinitionid,
            schemaname: envDefinition.schemaname,
            displayname: envDefinition.displayname,
            description: envDefinition.description,
            defaultvalue: envDefinition.defaultvalue,
            type: envDefinition.type,
          },
          value: envValue
            ? {
                environmentvariablevalueid: envValue.environmentvariablevalueid,
                environmentvariabledefinitionid: envDefinition.environmentvariabledefinitionid,
                value: envValue.value,
                modifiedon: new Date(envValue.modifiedon).toISOString(),
              }
            : null,
        };
      });

      setVariables(combined);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error occurred"));
    } finally {
      setIsLoading(false);
    }
  }, [webAPI]);

  useEffect(() => {
    getEnvironmentVariables();
  }, [getEnvironmentVariables]);

  const updateVariableValue = useCallback(
    async (definitionId: string, newValue: string) => {
      try {
        setError(null);
        const definition = await webAPI.retrieveRecord(
          "environmentvariabledefinition",
          definitionId,
          "?$expand=environmentvariabledefinition_environmentvariablevalue"
        );
        const existingValue =
          definition.environmentvariabledefinition_environmentvariablevalue?.[0];

        if (existingValue) {
          await webAPI.updateRecord(
            "environmentvariablevalue",
            existingValue.environmentvariablevalueid,
            { value: newValue }
          );
        } else {
          await webAPI.createRecord("environmentvariablevalue", {
            "@odata.type": "Microsoft.Dynamics.CRM.environmentvariablevalue",
            "EnvironmentVariableDefinitionId@odata.bind": `/environmentvariabledefinitions(${definitionId})`,
            value: newValue,
          });
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
        const error = new Error(`Failed to update variable: ${errorMessage}`);
        setError(error);
        throw error;
      }
    },
    [webAPI]
  );

  return {
    checkUserRoles,
    isLoading,
    error,
    variables,
    refresh: getEnvironmentVariables,
    updateVariableValue,
  };
};
