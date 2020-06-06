// NOTE: this actually uses Scope from @babel/traverse, but we can't add a dependency on its types,
// because this would be cyclic dependency. Declare the structural subset that is required.
import * as types from "../types";

export type Scope = {
  push(value: { id: types.LVal; kind: "var"; init?: types.Expression }): void;
  buildUndefinedNode(): types.Node;
};
