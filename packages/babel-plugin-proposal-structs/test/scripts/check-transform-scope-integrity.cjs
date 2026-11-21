/* eslint-disable unicorn/prefer-node-protocol */
/**
 * A plugin to check the scope info integrity after struct declarations are transformed
 * @param {import("@babel/core").PluginAPI} api
 */
const assert = require("assert");

module.exports = function checkTransformScopeIntegrity({ types: t }) {
  /**
   * Check that the assignment of a pattern is registered as a constant
   * violation of the bindings it assigns.
   */
  function checkAssignedBindings(path, pattern) {
    for (const name of Object.keys(t.getAssignmentIdentifiers(pattern))) {
      const binding = path.scope.getBinding(name);
      if (binding === undefined) continue;
      assert.ok(
        binding.constantViolations.some(
          violation => violation.node === path.node,
        ),
        `The ${path.type} is not registered as an assignment of '${name}'`,
      );
    }
  }

  /**
   * @type {import("@babel/core").PluginObject}
   */
  const plugin = {
    name: "check-structs-transform-scope-integrity",
    visitor: {
      AssignmentExpression: {
        exit(path) {
          checkAssignedBindings(path, path.node.left);
        },
      },
      ForXStatement: {
        exit(path) {
          const { left } = path.node;
          if (!t.isVariableDeclaration(left)) checkAssignedBindings(path, left);
        },
      },
      BindingIdentifier: {
        exit(path) {
          // t.getBindingIdentifiers.keys lists these for backwards
          // compatibility, but they do not declare bindings: assignments are
          // checked above, labels are not tracked by the scope, and exported
          // names are not local names.
          // TODO(Babel 9): Remove, `isBinding` returns false for these.
          const { node, parent } = path;
          if (
            t.isUnaryExpression(parent) ||
            t.isUpdateExpression(parent) ||
            t.isAssignmentExpression(parent) ||
            t.isLabeledStatement(parent) ||
            (t.isExportSpecifier(parent) && parent.exported === node)
          ) {
            return;
          }
          let { scope } = path;
          if (scope.path.isPattern()) scope = scope.getBlockParent();
          const binding = scope.getBinding(path.node.name);
          assert.ok(
            binding !== undefined,
            `'${path.node.name}' is not defined in the ${path.scope.path.type}'s scope`,
          );
        },
      },
    },
  };
  return plugin;
};
