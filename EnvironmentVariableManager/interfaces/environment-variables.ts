export enum EnvTypes {
  string = 100000000,
  number = 100000001,
  boolean = 100000002,
  json = 100000003
}

export const EnvTypeNames: Record<EnvTypes, string> = {
  [EnvTypes.string]: "String",
  [EnvTypes.number]: "Number",
  [EnvTypes.boolean]: "Boolean",
  [EnvTypes.json]: "JSON"
};

export interface IEnvironmentVariableDefinition {
  environmentvariabledefinitionid: string;
  schemaname: string;
  displayname: string;
  description?: string;
  defaultvalue?: string;
  type: EnvTypes;
}

export interface IEnvironmentVariableValue {
  environmentvariablevalueid: string;
  environmentvariabledefinitionid: string;
  value: string;
  modifiedon: string;
}

export interface IEnvironmentVariable {
  definition: IEnvironmentVariableDefinition;
  value: IEnvironmentVariableValue | null;
}
