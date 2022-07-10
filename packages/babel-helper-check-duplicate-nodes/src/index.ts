import { VISITOR_KEYS } from "@babel/types";
import type * as t from "@babel/types";

type StackItem = {
  node: t.Node;
  parent: t.Node | null;
};
export default function checkDuplicateNodes(ast: t.Node) {
  if (arguments.length !== 1) {
    throw new Error("checkDuplicateNodes accepts only one argument: ast");
  }
  // A Map from node to its parent
  const parentsMap = new Map();

  const hidePrivateProperties = (key: string, val: unknown) => {
    // Hides properties like _shadowedFunctionLiteral,
    // which makes the AST circular
    if (key[0] === "_") return "[Private]";
    return val;
  };

  const stack: StackItem[] = [{ node: ast, parent: null }];
  let item;

  while ((item = stack.pop()) !== undefined) {
    const { node, parent } = item;
    if (!node) continue;

    const keys = VISITOR_KEYS[node.type];
    if (!keys) continue;

    if (parentsMap.has(node)) {
      const parents = [parentsMap.get(node), parent];
      throw new Error(
        "Do not reuse nodes. Use `t.cloneNode` (or `t.clone`/`t.cloneDeep` if using babel@6) to copy them.\n" +
          JSON.stringify(node, hidePrivateProperties, 2) +
          "\nParent:\n" +
          JSON.stringify(parents, hidePrivateProperties, 2),
      );
    }
    parentsMap.set(node, parent);

    for (const key of keys) {
      const subNode =
        // @ts-expect-error visitor keys must present in node
        node[key];

      if (Array.isArray(subNode)) {
        for (const child of subNode) {
          stack.push({ node: child, parent: node });
        }
      } else if (typeof subNode === "object" && subNode !== null) {
        stack.push({ node: subNode, parent: node });
      }
    }
  }
}
