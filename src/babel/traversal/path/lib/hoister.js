import * as react from "../../../transformation/helpers/react";
import * as t from "../../../types";

var referenceVisitor = {
  ReferencedIdentifier(node, parent, scope, state) {
    if (this.isJSXIdentifier() && react.isCompatTag(node.name)) {
      return;
    }

    // direct references that we need to track to hoist this to the highest scope we can
    var bindingInfo = scope.getBinding(node.name);
    if (!bindingInfo) return;

    // this binding isn't accessible from the parent scope so we can safely ignore it
    // eg. it's in a closure etc
    if (bindingInfo !== state.scope.getBinding(node.name)) return;

    if (bindingInfo.constant) {
      state.bindings[node.name] = bindingInfo;
    } else {
      for (var violationPath of (bindingInfo.constantViolations: Array)) {
        state.breakOnScopePaths.push(violationPath.scope.path);
      }
    }
  }
};

export default class PathHoister {
  constructor(path, scope) {
    this.breakOnScopePaths = [];
    this.bindings          = {};
    this.scopes            = [];
    this.scope             = scope;
    this.path              = path;
  }

  isCompatibleScope(scope) {
    for (var key in this.bindings) {
      var binding = this.bindings[key];
      if (!scope.bindingIdentifierEquals(key, binding.identifier)) {
        return false;
      }
    }

    return true;
  }

  getCompatibleScopes() {
    var scope = this.path.scope;
    do {
      if (this.isCompatibleScope(scope)) {
        this.scopes.push(scope);
      } else {
        break;
      }

      if (this.breakOnScopePaths.indexOf(scope.path) >= 0) {
        break;
      }
    } while(scope = scope.parent);
  }

  getAttachmentPath() {
    var scopes = this.scopes;

    var scope = scopes.pop();
    if (!scope) return;

    if (scope.path.isFunction()) {
      if (this.hasOwnParamBindings(scope)) {
        // should ignore this scope since it's ourselves
        if (this.scope === scope) return;

        // needs to be attached to the body
        return scope.path.get("body").get("body")[0];
      } else {
        // doesn't need to be be attached to this scope
        return this.getNextScopeStatementParent();
      }
    } else if (scope.path.isProgram()) {
      return this.getNextScopeStatementParent();
    }
  }

  getNextScopeStatementParent() {
    var scope = this.scopes.pop();
    if (scope) return scope.path.getStatementParent();
  }

  hasOwnParamBindings(scope) {
    for (var name in this.bindings) {
      if (!scope.hasOwnBinding(name)) continue;

      var binding = this.bindings[name];
      if (binding.kind === "param") return true;
    }
    return false;
  }

  run() {
    var node = this.path.node;
    if (node._hoisted) return;
    node._hoisted = true;

    this.path.traverse(referenceVisitor, this);

    this.getCompatibleScopes();

    var path = this.getAttachmentPath();
    if (!path) return;

    var uid = path.scope.generateUidIdentifier("ref");

    path.insertBefore([
      t.variableDeclaration("var", [
        t.variableDeclarator(uid, this.path.node)
      ])
    ]);

    var parent = this.path.parentPath;

    if (parent.isJSXElement() && this.path.container === parent.node.children) {
      // turning the `span` in `<div><span /></div>` to an expression so we need to wrap it with
      // an expression container
      uid = t.jSXExpressionContainer(uid);
    }

    this.path.replaceWith(uid);
  }
}
