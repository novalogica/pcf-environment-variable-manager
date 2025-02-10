import { IEnvironmentVariable } from "../interfaces";

export const filterVariables = (
  variables: IEnvironmentVariable[],
  filterText: string,
  typeFilter: string,
  valueFilter: string
): IEnvironmentVariable[] => {
  return variables.filter((variable) => {
    const matchesText =
      variable.definition.schemaname.toLowerCase().includes(filterText.toLowerCase()) ||
      variable.definition.displayname.toLowerCase().includes(filterText.toLowerCase());

    const matchesType =
      typeFilter === "all" || variable.definition.type.toString() === typeFilter.toLowerCase();
    const matchesValue = valueFilter === "all" || variable.value?.value === valueFilter;

    return matchesText && matchesType && matchesValue;
  });
};

export const sortVariables = (variables: IEnvironmentVariable[]): IEnvironmentVariable[] => {
  return variables.sort((a, b) => {
    const dateA = new Date(a.value?.modifiedon || 0);
    const dateB = new Date(b.value?.modifiedon || 0);
    return dateB.getTime() - dateA.getTime();
  });
};
