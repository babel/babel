import * as react from "../../transformation/helpers/react";
import * as t from "../../types";

var referenceVisitor = {
  enter(node, parent, scope, state) {
    if (this.isJSXIdentifier() && react.isCompatTag(node.name)) {
      return;
    }

    if (this.isJSXIdentifier() || this.isIdentifier()) {
      // direct references that we need to track to hoist this to the highest scope we can
      if (this.isReferenced()) {
        var bindingInfo = scope.getBinding(node.name);

        // this binding isn't accessible from the parent scope so we can safely ignore it
        // eg. it's in a closure etc
        if (bindingInfo !== state.scope.getBinding(node.name)) return;

        if (bindingInfo && bindingInfo.constant) {
          state.bindings[node.name] = bindingInfo;
        } else {
          scope.dump();
          state.foundIncompatible = true;
          this.stop();
        }
      }
    }
  }
};

export default class PathHoister {
  constructor(path, scope) {
    this.foundIncompatible = false;
    this.bindings          = {};
    this.scope             = scope;
    this.scopes            = [];
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
    var checkScope = this.path.scope;
    do {
      if (this.isCompatibleScope(checkScope)) {
        this.scopes.push(checkScope);
      } else {
        break;
      }
    } while(checkScope = checkScope.parent);
  }

  getAttachmentPath() {
    var scopes = this.scopes;

    var scope = scopes.pop();

    if (scope.path.isFunction()) {
      if (this.hasNonParamBindings()) {
        // can't be attached to this scope
        return this.getNextScopeStatementParent();
      } else {
        // needs to be attached to the body
        return scope.path.get("body").get("body")[0];
      }
    } else if (scope.path.isProgram()) {
      return this.getNextScopeStatementParent();
    }
  }

  getNextScopeStatementParent() {
    var scope = this.scopes.pop();
    if (scope) return scope.path.getStatementParent();
  }

  hasNonParamBindings() {
    for (var name in this.bindings) {
      var binding = this.bindings[name];
      if (binding.kind !== "param") return true;
    }
    return false;
  }

  run() {
    this.path.traverse(referenceVisitor, this);
    if (this.foundIncompatible) return;

    this.getCompatibleScopes();

    var path = this.getAttachmentPath();
    if (!path) return;

    var uid = path.scope.generateUidIdentifier("ref");

    path.insertBefore([
      t.variableDeclaration("var", [
        t.variableDeclarator(uid, this.path.node)
      ])
    ]);

    this.path.replaceWith(uid);
  }
}
