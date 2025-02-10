import * as React from "react";
import { useContext, useEffect, useState } from "react";
import {
  Button,
  TableRow,
  TableCell,
  Spinner,
  Tooltip,
  Badge,
  Link,
} from "@fluentui/react-components";
import { SaveRegular } from "@fluentui/react-icons";
import { ValueBadge } from "../value-badge/value-badge";
import { formatDateTime } from "../../utils";
import { IEnvironmentVariable } from "../../interfaces";
import { toast } from "react-hot-toast";
import { EnvTypeNames, EnvTypes } from "../../interfaces/environment-variables";
import { ValueInput } from "../value-input/value-input";
import { EnvironmentVariableContext } from "../../context/environmnet-variable-context";

interface EnvironmentVariableRowProps {
  variable: IEnvironmentVariable;
  onUpdate: (definitionId: string, newValue: string) => Promise<void>;
}

export const EnvironmentVariableRow = ({ variable, onUpdate }: EnvironmentVariableRowProps) => {
  const { context } = useContext(EnvironmentVariableContext);
  const [savedValue, setSavedValue] = useState(variable.value?.value || "");
  const [currentValue, setCurrentValue] = useState(savedValue);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const newValue = variable.value?.value || "";
    setSavedValue(newValue);
    setCurrentValue(newValue);
  }, [variable]);

  const handleSwitchChange = (checked: boolean) => {
    setCurrentValue(checked ? "yes" : "no");
  };

  const handleSave = async () => {
    if (currentValue === savedValue) return;

    setIsSaving(true);
    try {
      await toast.promise(
        onUpdate(variable.definition.environmentvariabledefinitionid, currentValue),
        {
          loading: "Updating environment variable...",
          success: "Environment variable updated successfully!",
          error: "Failed to update environment variable.",
        }
      );
      setSavedValue(currentValue);
    } catch (error) {
      console.error("Failed to update environment variable: ", error);
      toast.error("Failed to update environment variable.");
    } finally {
      setIsSaving(false);
    }
  };

  const discardChanges = () => {
    setCurrentValue(savedValue);
  };

  const handleSchemaNameClick = () => {
    const entityFormOptions = {
      entityName: "environmentvariabledefinition",
      entityId: variable.definition.environmentvariabledefinitionid,
      openInNewWindow: true,
    };
    context.navigation.openForm(entityFormOptions);
  };

  return (
    <TableRow key={variable.definition.environmentvariabledefinitionid}>
      <TableCell data-label="Schema Name">
        <Link
          as="button"
          onClick={handleSchemaNameClick}
          className="text-primary hover:underline cursor-pointer"
        >
          {variable.definition.schemaname}
        </Link>
      </TableCell>

      <TableCell data-label="Display Name" className="font-medium">
        {variable.definition.displayname}
      </TableCell>

      <Tooltip
        content={variable.definition.description ?? "No Description"}
        relationship="description"
      >
        <TableCell data-label="Description" className="text-gray-600">
          {variable.definition.description}
        </TableCell>
      </Tooltip>
      <TableCell data-label="Type">
        <Badge appearance="outline" color="informative">
          {EnvTypeNames[variable.definition.type]}
        </Badge>
      </TableCell>
      <TableCell data-label="Default Value">
        {variable.definition.type === EnvTypes.boolean ? (
          <ValueBadge value={variable.definition.defaultvalue} />
        ) : (
          <Tooltip
            content={variable.definition.defaultvalue ?? "No Default Value"}
            relationship="description"
          >
            <p className="text-gray-600">{variable.definition.defaultvalue}</p>
          </Tooltip>
        )}
      </TableCell>
      <TableCell data-label="Current Value">
        <ValueInput
          disabled={isSaving}
          variable={variable}
          currentValue={currentValue}
          handleSwitchChange={handleSwitchChange}
          setCurrentValue={setCurrentValue}
        />
      </TableCell>
      <TableCell data-label="Modified On">{formatDateTime(variable.value?.modifiedon)}</TableCell>
      <TableCell data-label="Actions">
        <div className="action-buttons">
          <Button
            appearance="primary"
            onClick={handleSave}
            disabled={currentValue === savedValue || isSaving}
            icon={isSaving ? <Spinner size="extra-tiny" /> : <SaveRegular />}
            aria-label="Save changes"
          />
          {currentValue !== savedValue && (
            <Button
              className="discard-button"
              appearance="secondary"
              onClick={discardChanges}
              aria-label="Discard"
            >
              Discard
            </Button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};
