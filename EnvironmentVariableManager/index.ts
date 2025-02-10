import { createElement, ReactElement } from "react";
import App from "./App";
import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class EnvironmentVariableManager
  implements ComponentFramework.ReactControl<IInputs, IOutputs>
{
  private control: ComponentFramework.ReactControl<IInputs, IOutputs>;

  constructor() {}

  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    _: ComponentFramework.Dictionary
  ): void {
    context.mode.trackContainerResize(true);
  }

  public updateView(context: ComponentFramework.Context<IInputs>): ReactElement {
    return createElement(App, {
      context,
      notificationPosition: context.parameters.notificationPosition?.raw,
    });
  }

  public getOutputs(): IOutputs {
    return {};
  }

  public destroy(): void {
    this.control.destroy();
  }
}
