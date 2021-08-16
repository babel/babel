import type Scope from "./scope";
import type * as t from "@babel/types";

export interface HubInterface {
  getCode(): string | void;
  getScope(): Scope | void;
  addHelper(name: string): t.Identifier;
  buildError(node: t.Node, msg: string, Error: new () => Error): Error;
}

export default class Hub implements HubInterface {
  getCode() {}

  getScope() {}

  addHelper(): t.Identifier {
    throw new Error("Helpers are not supported by the default hub.");
  }

  buildError(node, msg, Error = TypeError): Error {
    return new Error(msg);
  }
}
