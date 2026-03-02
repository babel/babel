// NOTE: this actually uses Scope from @babel/traverse, but we can't add a dependency on its types,
// because this would be cyclic dependency. Declare the structural subset that is required.
import type * as t from "..";

export type Scope = {
  push(value: { id: t.LVal; kind: "var"; init?: t.Expression }): void;
  buildUndefinedNode(): t.Node;
};
