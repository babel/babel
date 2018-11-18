// @flow

"use strict";

const getReferenceOrigin = require("../utils/get-reference-origin");
const getExportName = require("../utils/get-export-name");

function reportError(context, node, name) {
  const isMemberExpression = node.type === "MemberExpression";
  const id = isMemberExpression ? node.property : node;
  context.report({
    node: id,
    message: `t.${name}() is deprecated. Use t.cloneNode() instead.`,
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
  create(context) {
    return {
      CallExpression(node) {
        const scope = context.getScope();
        const origin = getReferenceOrigin(node.callee, scope);

        const report = () => reportError(context, node.callee, origin.name);

        if (!origin) return;

        if (
          origin.kind === "import" &&
          (origin.name === "clone" || origin.name === "cloneDeep") &&
          origin.source === "@babel/types"
        ) {
          // imported from @babel/types
          return report();
        }

        if (
          origin.kind === "property" &&
          (origin.path === "clone" || origin.path === "cloneDeep") &&
          origin.base.kind === "import" &&
          origin.base.name === "types" &&
          origin.base.source === "@babel/core"
        ) {
          // imported from @babel/core
          return report();
        }

        if (
          origin.kind === "property" &&
          (origin.path === "types.clone" ||
            origin.path === "types.cloneDeep") &&
          origin.base.kind === "param" &&
          origin.base.index === 0
        ) {
          const { functionNode } = origin.base;
          const { parent } = functionNode;

          if (parent.type === "CallExpression") {
            const calleeOrigin = getReferenceOrigin(parent.callee, scope);
            if (
              calleeOrigin &&
              calleeOrigin.kind === "import" &&
              calleeOrigin.name === "declare" &&
              calleeOrigin.source === "@babel/helper-plugin-utils"
            ) {
              // Using "declare" from "@babel/helper-plugin-utils"
              return report();
            }
          } else {
            const exportName = getExportName(functionNode);

            if (exportName === "default" || exportName === "module.exports") {
              // export default function ({ types: t }) {}
              // module.exports = function ({ types: t }) {}
              return report();
            }
          }
        }
      },
    };
  },
};
