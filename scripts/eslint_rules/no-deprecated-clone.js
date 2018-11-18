// @flow

"use strict";

const getReferenceOrigin = require("./utils/get-reference-origin");

function reportError(context /*: Context */, node /*: Node */) {
  const isMemberExpression = node.type === "MemberExpression";
  const id = isMemberExpression ? node.property : node;
  context.report({
    node: id,
    message: `t.${id.name}() is deprecated. Use t.cloneNode() instead.`,
    fix(fixer) {
      if (isMemberExpression) {
        return fixer.replaceText(id, "cloneNode");
      }
    },
  });
}

module.exports = {
  meta: {
    schema: [],
    fixable: "code",
  },
  create(context /*: Context */) {
    return {
      CallExpression(node /*: Node */) {
        const origin = getReferenceOrigin(node.callee, context.getScope());

        if (!origin) return;

        if (
          origin.kind === "import" &&
          (origin.name === "clone" || origin.name === "cloneDeep") &&
          origin.source === "@babel/types"
        ) {
          // imported from @babel/types
          return reportError(context, node.callee);
        }

        if (
          origin.kind === "property" &&
          (origin.path === "clone" || origin.path === "cloneDeep") &&
          origin.base.kind === "import" &&
          origin.base.name === "types" &&
          origin.base.source === "@babel/core"
        ) {
          // imported from @babel/core
          return reportError(context, node.callee);
        }

        if (
          origin.kind === "property" &&
          (origin.path === "types.clone" ||
            origin.path === "types.cloneDeep") &&
          origin.base.kind === "export param" &&
          (origin.base.exportName === "default" ||
            origin.base.exportName === "module.exports") &&
          origin.base.index === 0
        ) {
          // export default function ({ types: t }) {}
          // module.exports = function ({ types: t }) {}
          return reportError(context, node.callee);
        }
      },
    };
  },
};

/*:: // ESLint types

type Node = { type: string, [string]: any };

type Definition = {
  type: "ImportedBinding",
  name: Node,
  node: Node,
  parent: Node,
};

type Variable = {
  defs: Definition[],
};

type Scope = {
  set: Map<string, Variable>,
  upper: ?Scope,
};

type Context = {
  report(options: {
    node: Node,
    message: string,
    fix?: (fixer: Fixer) => ?Fixer,
  }): void,

  getScope(): Scope,
};

type Fixer = {
  replaceText(node: Node, replacement: string): Fixer,
};
*/
