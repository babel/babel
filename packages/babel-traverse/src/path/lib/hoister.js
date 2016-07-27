import { react } from "babel-types";
import * as t from "babel-types";

let referenceVisitor = {
  ReferencedIdentifier(path, state) {
    if (path.isJSXIdentifier() && react.isCompatTag(path.node.name)) {
      return;
    }

    // direct references that we need to track to hoist this to the highest scope we can
    let binding = path.scope.getBinding(path.node.name);
    if (!binding) return;

    // this binding isn't accessible from the parent scope so we can safely ignore it
    // eg. it's in a closure etc
    if (binding !== state.scope.getBinding(path.node.name)) return;

    if (binding.constant) {
      state.bindings[path.node.name] = binding;
    } else {
      for (let violationPath of (binding.constantViolations: Array)) {
        state.breakOnScopePaths = state.breakOnScopePaths.concat(violationPath.getAncestry());
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
    for (let key in this.bindings) {
      let binding = this.bindings[key];
      if (!scope.bindingIdentifierEquals(key, binding.identifier)) {
        return false;
      }
    }

    return true;
  }

  getCompatibleScopes() {
    let scope = this.path.scope;
    do {
      if (this.isCompatibleScope(scope)) {
        this.scopes.push(scope);
      } else {
        break;
      }

      if (this.breakOnScopePaths.indexOf(scope.path) >= 0) {
        break;
      }
    } while (scope = scope.parent);
  }

  getAttachmentPath() {
    let path = this._getAttachmentPath();
    if (!path) return;

    let targetScope = path.scope;

    // don't allow paths that have their own lexical environments to pollute
    if (targetScope.path === path) {
      targetScope = path.scope.parent;
    }

    // avoid hoisting to a scope that contains bindings that are executed after our attachment path
    if (targetScope.path.isProgram() || targetScope.path.isFunction()) {
      for (let name in this.bindings) {
        // check binding is a direct child of this paths scope
        if (!targetScope.hasOwnBinding(name)) continue;

        let binding = this.bindings[name];

        // allow parameter references
        if (binding.kind === "param") continue;

        // if this binding appears after our attachment point then don't hoist it
        if (binding.path.getStatementParent().key > path.key) return;
      }
    }

    return path;
  }

  _getAttachmentPath() {
    let scopes = this.scopes;

    let scope = scopes.pop();
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
    let scope = this.scopes.pop();
    if (scope) return scope.path.getStatementParent();
  }

  hasOwnParamBindings(scope) {
    for (let name in this.bindings) {
      if (!scope.hasOwnBinding(name)) continue;

      let binding = this.bindings[name];
      if (binding.kind === "param") return true;
    }
    return false;
  }

  run() {
    let node = this.path.node;
    if (node._hoisted) return;
    node._hoisted = true;

    this.path.traverse(referenceVisitor, this);

    this.getCompatibleScopes();

    let attachTo = this.getAttachmentPath();
    if (!attachTo) return;

    // don't bother hoisting to the same function as this will cause multiple branches to be evaluated more than once leading to a bad optimisation
    if (attachTo.getFunctionParent() === this.path.getFunctionParent()) return;

    // generate declaration and insert it to our point
    let uid = attachTo.scope.generateUidIdentifier("ref");
    attachTo.insertBefore([
      t.variableDeclaration("var", [
        t.variableDeclarator(uid, this.path.node)
      ])
    ]);

    let parent = this.path.parentPath;
    if (parent.isJSXElement() && this.path.container === parent.node.children) {
      // turning the `span` in `<div><span /></div>` to an expression so we need to wrap it with
      // an expression container
      uid = t.JSXExpressionContainer(uid);
    }

    this.path.replaceWith(uid);
  }
}
