import type Scope from "./scope";

export interface HubInterface {
  getCode(): string | void;
  getScope(): Scope | void;
  addHelper(name: string): any;
  buildError(node: any, msg: string, Error: new () => Error): Error;
}

export default class Hub implements HubInterface {
  getCode() {}

  getScope() {}

  addHelper() {
    throw new Error("Helpers are not supported by the default hub.");
  }

  buildError(node, msg, Error = TypeError): Error {
    return new Error(msg);
  }
}
