import getBindingIdentifiers from "./getBindingIdentifiers";
import type * as t from "../types";

export default function getOuterBindingIdentifiers(
  node: t.Node,
  duplicates: true,
): Record<string, Array<t.Identifier>>;

export default function getOuterBindingIdentifiers(
  node: t.Node,
  duplicates?: false,
): Record<string, t.Identifier>;

export default function getOuterBindingIdentifiers(
  node: t.Node,
  duplicates: boolean,
): Record<string, t.Identifier | Array<t.Identifier>>;

export default function getOuterBindingIdentifiers(
  node: t.Node,
  duplicates: boolean,
): Record<string, t.Identifier | Array<t.Identifier>> {
  return getBindingIdentifiers(node, duplicates, true);
}
