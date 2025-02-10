import * as React from "react";
import { EnvTypes, IEnvironmentVariable } from "../../interfaces";
import { Input, Switch, Tooltip } from "@fluentui/react-components";
import { ValueBadge } from "../value-badge/value-badge";
import { EditDialog } from "../edit-dialog/edit-dialog";

interface ValueInputProps {
  variable: IEnvironmentVariable;
  currentValue: string;
  handleSwitchChange: (checked: boolean) => void;
  setCurrentValue: (savedValue: string) => void;
}

export const ValueInput = ({
  variable,
  currentValue,
  handleSwitchChange,
  setCurrentValue,
}: ValueInputProps) => {
  const { type, displayname, schemaname } = variable.definition;
  const varName = displayname || schemaname;

  if (type === EnvTypes.boolean) {
    return (
      <div className="boolean-container">
        <Switch
          checked={currentValue === "yes"}
          onChange={(_, data) => handleSwitchChange(data.checked)}
        />
        <ValueBadge value={currentValue} />
      </div>
    );
  }

  return (
    <div className="action-buttons">
      <Tooltip content={currentValue || "No Current Value"} relationship="description">
        <Input
          style={{ minWidth: 80 }}
          size="small"
          type={type === EnvTypes.number ? "number" : "text"}
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
        />
      </Tooltip>
      {type !== EnvTypes.number && (
        <EditDialog
          variableName={varName}
          variableType={type}
          variableValue={currentValue}
          onConfirm={(value) => setCurrentValue(value)}
        />
      )}
    </div>
  );
};
