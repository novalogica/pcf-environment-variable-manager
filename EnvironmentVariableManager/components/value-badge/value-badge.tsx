import * as React from "react";
import { Badge } from "@fluentui/react-components";

interface IValueBadgeProps {
  value?: string | null;
  labels?: { invalid: string; truthy: string; falsy: string };
}

export const ValueBadge = ({
  value,
  labels = { invalid: "No Value", truthy: "Yes", falsy: "No" },
}: IValueBadgeProps) => {
  const normalizedValue = value?.toLowerCase().trim() ?? "";
  const isValid = normalizedValue !== "";
  const isTruthy = isValid && normalizedValue === "yes";

  return (
    <Badge appearance="tint" color={!isValid ? "danger" : isTruthy ? "success" : "warning"}>
      {!isValid ? labels.invalid : isTruthy ? labels.truthy : labels.falsy}
    </Badge>
  );
};
