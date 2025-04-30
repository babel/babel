/**
 * A plugin to check the scope info integrity after VoidPattern is transformed
 * @param {import("@babel/core").PluginAPI} api
 */
const assert = require("node:assert");

module.exports = function checkTransformScopeIntegrity() {
  /**
   * @type {import("@babel/core").PluginObject}
   */
  const plugin = {
    name: "check-discard-binding-transform-scope-integrity",
    visitor: {
      Identifier: {
        exit(path) {
          if (path.scope.hasUid(path.node.name)) {
            const blockParent = path.scope.getBlockParent();
            assert.ok(
              blockParent.hasOwnBinding(path.node.name),
              `'${path.node.name}' is not defined in the ${blockParent.path.type}'s scope`,
            );
          }
        },
      },
    },
  };
  return plugin;
};
