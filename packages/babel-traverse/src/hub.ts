import type Scope from "./scope";
import type * as t from "@babel/types";

export interface HubInterface {
  getCode(): string | void;
  getScope(): Scope | void;
  addHelper(name: string): any;
  buildError(node: t.Node, msg: string, Error: ErrorConstructor): Error;
}

export default class Hub implements HubInterface {
  getCode() {}

  getScope() {}

  addHelper() {
    throw new Error("Helpers are not supported by the default hub.");
  }

  buildError(node, msg: string, Error = TypeError): Error {
    return new Error(msg);
  }
}
