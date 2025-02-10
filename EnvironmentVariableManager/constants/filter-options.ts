import { EnvTypes, EnvTypeNames } from "../interfaces/environment-variables";

export interface IFilterOption {
  key: string;
  label: string;
}

export const valueOptions: IFilterOption[] = [
  { key: "all", label: "All Values" },
  { key: "yes", label: "Yes" },
  { key: "no", label: "No" },
];

export const typeOptions: IFilterOption[] = [
  { key: "all", label: "All Types" },
  { key: EnvTypes.string.toString(), label: EnvTypeNames[EnvTypes.string] },
  { key: EnvTypes.number.toString(), label: EnvTypeNames[EnvTypes.number] },
  { key: EnvTypes.boolean.toString(), label: EnvTypeNames[EnvTypes.boolean] },
  { key: EnvTypes.json.toString(), label: EnvTypeNames[EnvTypes.json] }
];
