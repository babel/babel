"use strict";

const getReferenceOrigin = require("./get-reference-origin");
const getExportName = require("./get-export-name");

// Check if a ReferenceOrigin (returned by ./get-reference-origin.js)
// is a reference to a @babel/types export.
module.exports = function isFromBabelTypes(
  origin /*: ReferenceOrigin */,
  scope /*: Scope */,
) {
  if (origin.kind === "import" && origin.source === "@babel/types") {
    // imported from @babel/types
    return true;
  }

  if (
    origin.kind === "property" &&
    origin.base.kind === "import" &&
    origin.base.name === "types" &&
    origin.base.source === "@babel/core"
  ) {
    // imported from @babel/core
    return true;
  }

  if (
    origin.kind !== "property" ||
    origin.base.kind !== "param" ||
    origin.base.index !== 0
  ) {
    // Not a parameter of the plugin factory function
    return false;
  }

  const { functionNode } = origin.base;
  const { parent } = functionNode;

  if (parent.type === "CallExpression") {
    const calleeOrigin = getReferenceOrigin(parent.callee, scope);

    // Using "declare" from "@babel/helper-plugin-utils"
    return !!(
      calleeOrigin &&
      calleeOrigin.kind === "import" &&
      calleeOrigin.name === "declare" &&
      calleeOrigin.source === "@babel/helper-plugin-utils"
    );
  }

  const exportName = getExportName(functionNode);

  // export default function ({ types: t }) {}
  // module.exports = function ({ types: t }) {}
  return exportName === "default" || exportName === "module.exports";
};
