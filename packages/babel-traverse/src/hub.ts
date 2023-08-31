import type Scope from "./scope/index.ts";
import type { Node } from "@babel/types";

export interface HubInterface {
  getCode(): string | void;
  getScope(): Scope | void;
  addHelper(name: string): any;
  buildError(node: Node, msg: string, Error: new () => Error): Error;
}

export default class Hub implements HubInterface {
  getCode() {}

  getScope() {}

  addHelper() {
    throw new Error("Helpers are not supported by the default hub.");
  }

  buildError(node: Node, msg: string, Error = TypeError): Error {
    return new Error(msg);
  }
}
