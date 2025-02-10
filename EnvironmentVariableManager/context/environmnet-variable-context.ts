import { createContext } from "react";
import { IInputs } from "../generated/ManifestTypes";

interface IEnvironmentVariableContext {
  context: ComponentFramework.Context<IInputs>;
}

export const EnvironmentVariableContext = createContext<IEnvironmentVariableContext>(undefined!);
