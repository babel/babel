import { declare } from "@babel/helper-plugin-utils";
import { types as t, type NodePath } from "@babel/core";

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION(7));

  function stableSort(
    body: t.Statement[],
    priority: (node: t.Statement) => number,
  ) {
    // By default, we use priorities of 0-4.
    const buckets = Object.create(null);

    // By collecting into buckets, we can guarantee a stable sort.
    for (let i = 0; i < body.length; i++) {
      const n = body[i];
      const p = priority(n);

      // In case some plugin is setting an unexpected priority.
      const bucket = buckets[p] || (buckets[p] = []);
      bucket.push(n);
    }

    // Sort our keys in descending order. Keys are unique, so we don't have to
    // worry about stability.
    const keys = Object.keys(buckets)
      .map(k => +k)
      .sort((a, b) => b - a);

    let index = 0;
    for (const key of keys) {
      const bucket = buckets[key];
      for (const n of bucket) {
        body[index++] = n;
      }
    }
    return body;
  }

  function transformStatementList(paths: NodePath<t.Statement>[]) {
    const priorities = new Map();
    for (const path of paths) {
      if (!path.isFunctionDeclaration()) continue;
      const func = path.node;
      const declar = t.variableDeclaration("let", [
        t.variableDeclarator(func.id, t.toExpression(func)),
      ]);

      // hoist it up above everything else
      priorities.set(declar, 2);

      // todo: name this
      func.id = null;

      path.replaceWith(declar);
    }
    return priorities;
  }

  return {
    name: "transform-block-scoped-functions",

    visitor: {
      BlockStatement(path) {
        const { node, parent } = path;
        if (
          t.isFunction(parent, { body: node }) ||
          t.isExportDeclaration(parent)
        ) {
          return;
        }

        transformStatementList(path.get("body"));
      },

      SwitchCase(path) {
        // In case statements, hoisting is difficult to perform correctly due to
        // functions that are declared and referenced in different blocks.
        // Nevertheless, hoisting the statements *inside* of each case should at
        // least mitigate the failure cases.
        const priorities = transformStatementList(path.get("consequent"));
        if (priorities.size) {
          path.node.consequent = stableSort(
            path.node.consequent,
            node => priorities.get(node) ?? 1,
          );
        }
      },
    },
  };
});
