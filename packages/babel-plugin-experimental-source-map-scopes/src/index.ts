import { declare } from "@babel/helper-plugin-utils";
import type { NodePath } from "@babel/core";

export default declare(api => {
  // TODO: Update min version
  api.assertVersion(REQUIRED_VERSION(7));

  const nodesToScope = new WeakMap();
  const scopesToInfo = new WeakMap();

  function scopeVisitor(path: NodePath) {
    let { scope } = path;
    if (path.isFunction()) {
      scope = scope.parent;
    } else if (scope.path.isFunction()) {
      const functionChild = path.find(p => p.parentPath.isFunction());
      if (functionChild.key !== "body" && functionChild.listKey !== "params") {
        scope = scope.parent;
      }
    }
    let info = scopesToInfo.get(scope);
    if (!info) {
      let { loc } = scope.path.node;
      if (scope.path.isFunction()) {
        loc = scope.path.node.body.loc;
      }
      let name;
      if (scope.path.isFunction() && "id" in scope.path.node) {
        name = scope.path.node.id.name;
      }
      info = {
        kind: scope.path.isProgram() ? "program" : "function",
        name,
        loc,
        source: "unknown",
        bindings: Object.keys(scope.bindings),
        isScope: true,
      };
      scopesToInfo.set(scope, info);
    }
    nodesToScope.set(path.node.loc, info);
  }
  const visitor = { enter: scopeVisitor };

  return {
    name: "experimental-source-map-scopes",
    pre(file) {
      scopeVisitor(file.path);
      file.path.traverse(visitor);
    },
    manipulateOptions(opts) {
      opts.generatorOpts.getScopeInfo = node => nodesToScope.get(node.loc);
    },
  };
});
