import getBindingIdentifiers from "./getBindingIdentifiers";
import type * as t from "..";

export default getOuterBindingIdentifiers as {
  (node: t.Node, duplicates: true): Record<string, Array<t.Identifier>>;
  (node: t.Node, duplicates?: false): Record<string, t.Identifier>;
  (
    node: t.Node,
    duplicates?: boolean,
  ): Record<string, t.Identifier> | Record<string, Array<t.Identifier>>;
};

function getOuterBindingIdentifiers(
  node: t.Node,
  duplicates: boolean,
): Record<string, t.Identifier> | Record<string, Array<t.Identifier>> {
  return getBindingIdentifiers(node, duplicates, true);
}
