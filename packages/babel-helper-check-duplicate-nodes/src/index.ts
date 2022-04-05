import { traverseFast } from "@babel/types";

export default function checkDuplicateNodes(ast) {
  if (arguments.length !== 1) {
    throw new Error("checkDuplicateNodes accepts only one argument: ast");
  }
  const nodes = new WeakSet();
  const parents = new WeakMap();

  const setParent = (child, parent) => {
    if (typeof child === "object" && child !== null) {
      let p = parents.get(child);
      if (!p) {
        p = [];
        parents.set(child, p);
      }
      p.unshift(parent);
    }
  };

  const registerChildren = node => {
    for (const key in node) {
      if (Array.isArray(node[key])) {
        node[key].forEach(child => setParent(child, node));
      } else {
        setParent(node[key], node);
      }
    }
  };

  const hidePrivateProperties = (key, val) => {
    // Hides properties like _shadowedFunctionLiteral,
    // which makes the AST circular
    if (key[0] === "_") return "[Private]";
    return val;
  };

  traverseFast(ast, node => {
    registerChildren(node);

    if (nodes.has(node)) {
      throw new Error(
        "Do not reuse nodes. Use `t.cloneNode` (or `t.clone`/`t.cloneDeep` if using babel@6) to copy them.\n" +
          JSON.stringify(node, hidePrivateProperties, 2) +
          "\nParent:\n" +
          JSON.stringify(parents.get(node), hidePrivateProperties, 2),
      );
    }

    nodes.add(node);
  });
}
