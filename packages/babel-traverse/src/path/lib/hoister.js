import { react } from "babel-types";
import * as t from "babel-types";

/**
 * @private
 */

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

/**
 * @private
 */

export default class PathHoister {
  constructor(path, scope) {
    this.breakOnScopePaths = [];
    this.bindings          = {};
    this.scopes            = [];
    this.scope             = scope;
    this.path              = path;
  }

  /**
   * @private
   */

  isCompatibleScope(scope) {
    for (let key in this.bindings) {
      let binding = this.bindings[key];
      if (!scope.bindingIdentifierEquals(key, binding.identifier)) {
        return false;
      }
    }

    return true;
  }

  /**
   * @private
   */

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

  /**
   * @private
   */

  getAttachmentPath() {
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

  /**
   * @private
   */

  getNextScopeStatementParent() {
    let scope = this.scopes.pop();
    if (scope) return scope.path.getStatementParent();
  }

  /**
   * @private
   */

  hasOwnParamBindings(scope) {
    for (let name in this.bindings) {
      if (!scope.hasOwnBinding(name)) continue;

      let binding = this.bindings[name];
      if (binding.kind === "param") return true;
    }
    return false;
  }

  /**
   * @private
   */

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
