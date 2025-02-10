import * as React from "react";
import { useEffect, useState } from "react";
import { formatJSONContent, validateVariableValue } from "../../utils";
import { ArrowExpandRegular } from "@fluentui/react-icons";
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  Button,
  Textarea,
  Tooltip,
  Field,
  Input,
} from "@fluentui/react-components";
import { EnvTypes } from "../../interfaces";

interface IDialogProps {
  variableName: string;
  variableType: EnvTypes;
  variableValue: any;
  onConfirm: (value: any) => void;
  disabled?: boolean;
}

export const EditDialog = ({
  variableName,
  variableType,
  variableValue,
  onConfirm,
  disabled,
}: IDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempValue, setTempValue] = useState(variableValue);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setTempValue(variableType === EnvTypes.json ? formatJSONContent(variableValue) : variableValue);
  }, [variableValue, variableType]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    setTempValue(value);
    setIsValid(validateVariableValue(value, variableType));
  };

  const handleConfirm = () => {
    if (isValid && tempValue !== variableValue) {
      onConfirm(variableType === EnvTypes.number ? Number(tempValue) : tempValue);
      setIsOpen(false);
    }
  };

  const handleDiscard = () => {
    setTempValue(variableType === EnvTypes.json ? formatJSONContent(variableValue) : variableValue);
    setIsValid(true);
    setIsOpen(false);
  };

  return (
    <Dialog modalType="modal" open={isOpen} onOpenChange={(_, { open }) => setIsOpen(open)}>
      <Tooltip content="Open editor" relationship="label">
        <DialogTrigger disableButtonEnhancement>
          <Button disabled={disabled} size="small" icon={<ArrowExpandRegular />} />
        </DialogTrigger>
      </Tooltip>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Edit &quot;{variableName}&quot;</DialogTitle>
          <DialogContent>
            <Field label={`Edit your Environment Variable ("${variableName}")`}>
              {variableType === EnvTypes.json || variableType === EnvTypes.string ? (
                <Textarea
                  resize="vertical"
                  value={tempValue}
                  onChange={handleChange}
                  style={{
                    minHeight: "250px",
                    border: isValid ? undefined : "1px solid #d13438",
                  }}
                />
              ) : (
                <span style={{ color: "#605e5c" }}>Unsupported variable type</span>
              )}
            </Field>
            {!isValid && (
              <div style={{ color: "#d13438", fontSize: "12px", marginTop: "4px" }}>
                Invalid {EnvTypes[variableType]?.toLowerCase()} format
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              appearance="primary"
              onClick={handleConfirm}
              disabled={!isValid || tempValue === variableValue}
            >
              Confirm
            </Button>
            <Button appearance="secondary" onClick={handleDiscard}>
              Discard
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
