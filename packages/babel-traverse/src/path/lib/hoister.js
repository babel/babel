import { react } from "babel-types";
import * as t from "babel-types";

const referenceVisitor = {
  // This visitor looks for bindings to establish a topmost scope for hoisting.
  "BindingIdentifier|ReferencedIdentifier"(path, state) {
    const { name } = path.node;

    // Don't hoist regular JSX identifiers ('div', 'span', etc).
    // We do have to consider member expressions for hoisting (e.g. `this.component`)
    if (
      path.isJSXIdentifier() &&
      react.isCompatTag(path.node.name) &&
      !path.parentPath.isJSXMemberExpression()
    ) {
      return;
    }

    // If the identifier refers to `this`, we need to break on the closest non-arrow scope.
    if (name === "this") {
      let scope = path.scope;
      do {
        if (scope.path.isFunction() && !scope.path.isArrowFunctionExpression()) break;
      } while (scope = scope.parent);
      if (scope) state.breakOnScopePaths.push(scope.path);
    }

    // direct references that we need to track to hoist this to the highest scope we can
    const binding = path.scope.getBinding(name);
    if (!binding) return;

    // this binding isn't accessible from the parent scope so we can safely ignore it
    // eg. it's in a closure etc
    // This explicitly uses `state.path.scope` instead of `state.scope`, since functions
    // may redefine bindings and they are still hoistable.
    if (binding !== state.path.scope.getBinding(name)) return;

    state.bindings[name] = binding;
  },
};

export default class PathHoister {
  constructor(path) {
    // Storage for scopes we can't hoist above.
    this.breakOnScopePaths = [];
    // Storage for bindings that may affect what path we can hoist to.
    this.bindings = {};
    // Storage for eligible scopes.
    this.scopes = [];
    // Our original scope and path.
    this.path = path;
    this.scope = this.getImportantScopeParent(path);
    // By default, we attach as far up as we can; but if we're trying
    // to avoid referencing a binding, we may have to go after.
    this.attachAfter = false;
  }

  // A scope is compatible if all required bindings are reachable.
  isCompatibleScope(scope) {
    for (const key in this.bindings) {
      const binding = this.bindings[key];
      if (binding.scope.path === this.path) {
        continue;
      }
      if (scope.getBinding(key) !== binding) {
        return false;
      }
    }

    return true;
  }

  // Look through all scopes and push compatible ones.
  getCompatibleScopes() {
    let scope = this.scope;
    do {
      if (this.isCompatibleScope(scope)) {
        this.scopes.push(scope);
      } else {
        break;
      }

      // deopt: These scopes are set in the visitor on const violations
      if (this.breakOnScopePaths.indexOf(scope.path) >= 0) {
        break;
      }
    } while (scope = scope.parent);
  }

  getAttachmentPath() {
    let path = this._getAttachmentPath();
    if (!path) return;

    // don't allow paths that have their own lexical environments to pollute
    const oldScope = this.scope;
    const targetScope = this.getImportantScopeParent(path);

    // don't bother hoisting to the same function as this will cause multiple branches to be
    // evaluated more than once leading to a bad optimisation
    if (oldScope === targetScope) {
      return;
    }

    // avoid hoisting to a scope that contains bindings that are executed after our attachment path
    if (targetScope.path.isProgram() || targetScope.path.isFunction()) {
      for (const name in this.bindings) {
        // check binding is a direct child of this paths scope
        if (!targetScope.hasOwnBinding(name)) continue;

        const binding = this.bindings[name];

        // allow parameter references and expressions in params (like destructuring rest)
        if (binding.kind === "param" || binding.path.parentKey === "params") continue;

        // For each binding, get its attachment parent. This gives us an idea of where we might
        // introduce conflicts.
        const bindingParentPath = this.getAttachmentParentForPath(binding.path);

        // If the binding's attachment appears at or after our attachment point, then we move after it.
        if (bindingParentPath.key >= path.key) {
          this.attachAfter = true;
          path = binding.path;

          // We also move past any constant violations.
          for (const violationPath of (binding.constantViolations: Array)) {
            if (this.getAttachmentParentForPath(violationPath).key > path.key) {
              path = violationPath;
            }
          }
        }
      }
    }

    if (this.scope === this.getImportantScopeParent(path)) return;

    // We can't insert before/after a child of an export declaration, so move up
    // to the declaration itself.
    if (path.parentPath.isExportDeclaration()) {
      path = path.parentPath;
    }

    return path;
  }

  _getAttachmentPath() {
    const scope = this.scopes.pop();
    // deopt: no compatible scopes
    if (!scope) return;

    const { path } = scope;
    if (path.isFunction() || path.isProgram()) {
      return this.getNextScopeAttachmentParent();
    }
  }

  getNextScopeAttachmentParent() {
    const scope = this.scopes.pop();
    if (scope) return this.getAttachmentParentForPath(scope.path);
  }

  // Find an attachment for this path.
  getAttachmentParentForPath(path) {
    do {
      const { parentPath } = path;
      if (
        // Beginning of the scope
        !parentPath ||
        parentPath.isArrowFunctionExpression() ||
        // Has siblings and is a statement
        (Array.isArray(path.container) && path.isStatement())
      ) {
        return path;
      }
    } while ((path = path.parentPath));
  }

  getImportantScopeParent(path) {
    let scope = path.scope.path === path ? path.scope.parent : path.scope;
    let scopePath = scope.path;
    while (!scopePath.isFunction() && !scopePath.isProgram() && !scopePath.isLoop()) {
      scope = scope.parent;
      scopePath = scope.path;
    }
    return scope;
  }

  run() {
    const node = this.path.node;
    if (node._hoisted) return;
    node._hoisted = true;

    this.path.traverse(referenceVisitor, this);

    this.getCompatibleScopes();

    let attachTo = this.getAttachmentPath();
    if (!attachTo) return;

    const { parentPath } = attachTo;
    if (parentPath.isArrowFunctionExpression()) {
      parentPath.ensureBlock();
      attachTo = parentPath.get("body.body.0");
    }

    // generate declaration and insert it to our point
    let uid = attachTo.scope.generateUidIdentifier("ref");
    const declarator = t.variableDeclarator(uid, this.path.node);

    const insertFn = this.attachAfter ? "insertAfter" : "insertBefore";
    attachTo[insertFn]([
      attachTo.isVariableDeclarator() ? declarator : t.variableDeclaration("var", [declarator]),
    ]);

    const parent = this.path.parentPath;
    if (parent.isJSXElement() && this.path.container === parent.node.children) {
      // turning the `span` in `<div><span /></div>` to an expression so we need to wrap it with
      // an expression container
      uid = t.JSXExpressionContainer(uid);
    }

    this.path.replaceWith(uid);
  }
}
