import type { Rule, Scope } from "eslint";
import type { Node } from "estree";
import getReferenceOrigin from "./get-reference-origin.ts";
import isDefaultExport from "./is-default-export.ts";

export default function isBabelPluginFactory(
  node: Node & Rule.NodeParentExtension,
  scope: Scope.Scope,
) {
  const { parent } = node;

  if (parent.type === "CallExpression") {
    const calleeOrigin = getReferenceOrigin(parent.callee, scope);

    // Using "declare" from "@babel/helper-plugin-utils"
    return !!(
      calleeOrigin?.kind === "import" &&
      calleeOrigin.name === "declare" &&
      calleeOrigin.source === "@babel/helper-plugin-utils"
    );
  }

  // export default function ({ types: t }) {}
  // module.exports = function ({ types: t }) {}
  return isDefaultExport(parent);
}
