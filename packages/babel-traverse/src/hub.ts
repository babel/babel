import type Scope from "./scope";

export interface HubInterface {
  getCode(): string | undefined | null | void;
  getScope(): Scope | undefined | null | void;
  addHelper(name: string): any;
  buildError(
    node: any,
    msg: string,
    Error: {
      new (...args: any): Error;
    },
  ): Error;
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
