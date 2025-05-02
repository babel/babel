/* eslint-disable unicorn/prefer-node-protocol */
/**
 * A plugin to check the scope info integrity after VoidPattern is transformed
 * @param {import("@babel/core").PluginAPI} api
 */
const assert = require("assert");

module.exports = function checkTransformScopeIntegrity() {
  /**
   * @type {import("@babel/core").PluginObject}
   */
  const plugin = {
    name: "check-discard-binding-transform-scope-integrity",
    visitor: {
      BindingIdentifier: {
        exit(path) {
          let { scope } = path;
          if (scope.path.isPattern()) scope = scope.getBlockParent();
          const binding = scope.getBinding(path.node.name);
          assert.ok(
            binding !== undefined,
            `'${path.node.name}' is not defined in the ${path.scope.path.type}'s scope`
          );
        }
      }
    }
  };
  return plugin;
};
