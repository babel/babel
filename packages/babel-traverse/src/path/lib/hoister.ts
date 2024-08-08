// Remove this file in Babel 8

import { react } from "@babel/types";
import {
  cloneNode,
  jsxExpressionContainer,
  variableDeclaration,
  variableDeclarator,
} from "@babel/types";
import type * as t from "@babel/types";
import type Scope from "../../scope/index.ts";
import type NodePath from "../index.ts";
import type Binding from "../../scope/binding.ts";
import type { Visitor } from "../../types.ts";

const referenceVisitor: Visitor<PathHoister> = {
  // This visitor looks for bindings to establish a topmost scope for hoisting.
  ReferencedIdentifier(path, state) {
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
    if (path.node.name === "this") {
      let scope = path.scope;
      do {
        if (
          scope.path.isFunction() &&
          !scope.path.isArrowFunctionExpression()
        ) {
          break;
        }
      } while ((scope = scope.parent));
      if (scope) state.breakOnScopePaths.push(scope.path);
    }

    // direct references that we need to track to hoist this to the highest scope we can
    const binding = path.scope.getBinding(path.node.name);
    if (!binding) return;

    // we can handle reassignments only if they happen in the same scope as the declaration
    for (const violation of binding.constantViolations) {
      if (violation.scope !== binding.path.scope) {
        state.mutableBinding = true;
        path.stop();
        return;
      }
    }

    // this binding isn't accessible from the parent scope so we can safely ignore it
    // eg. it's in a closure etc
    if (binding !== state.scope.getBinding(path.node.name)) return;

    state.bindings[path.node.name] = binding;
  },
};

export default class PathHoister<T extends t.Node = t.Node> {
  breakOnScopePaths: NodePath[];
  bindings: { [k: string]: Binding };
  mutableBinding: boolean;
  private scopes: Scope[];
  scope: Scope;
  private path: NodePath<T>;
  private attachAfter: boolean;

  constructor(path: NodePath<T>, scope: Scope) {
    // Storage for scopes we can't hoist above.
    this.breakOnScopePaths = [];
    // Storage for bindings that may affect what path we can hoist to.
    this.bindings = {};
    // "true" if the current path contains a reference to a binding whose
    // value can change and thus can't be safely hoisted.
    this.mutableBinding = false;
    // Storage for eligible scopes.
    this.scopes = [];
    // Our original scope and path.
    this.scope = scope;
    this.path = path;
    // By default, we attach as far up as we can; but if we're trying
    // to avoid referencing a binding, we may have to go after.
    this.attachAfter = false;
  }

  // A scope is compatible if all required bindings are reachable.
  isCompatibleScope(scope: Scope) {
    for (const key of Object.keys(this.bindings)) {
      const binding = this.bindings[key];
      if (!scope.bindingIdentifierEquals(key, binding.identifier)) {
        return false;
      }
    }

    return true;
  }

  // Look through all scopes and push compatible ones.
  getCompatibleScopes() {
    let scope = this.path.scope;
    do {
      if (this.isCompatibleScope(scope)) {
        this.scopes.push(scope);
      } else {
        break;
      }

      // deopt: These scopes are set in the visitor on const violations
      if (this.breakOnScopePaths.includes(scope.path)) {
        break;
      }
    } while ((scope = scope.parent));
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
      for (const name of Object.keys(this.bindings)) {
        // check binding is a direct child of this paths scope
        if (!targetScope.hasOwnBinding(name)) continue;

        const binding = this.bindings[name];

        // allow parameter references and expressions in params (like destructuring rest)
        if (binding.kind === "param" || binding.path.parentKey === "params") {
          continue;
        }

        // For each binding, get its attachment parent. This gives us an idea of where we might
        // introduce conflicts.
        const bindingParentPath = this.getAttachmentParentForPath(binding.path);

        // If the binding's attachment appears at or after our attachment point, then we move after it.
        if (bindingParentPath.key >= path.key) {
          this.attachAfter = true;
          path = binding.path;

          // We also move past any constant violations.
          for (const violationPath of binding.constantViolations) {
            if (this.getAttachmentParentForPath(violationPath).key > path.key) {
              path = violationPath;
            }
          }
        }
      }
    }

    return path;
  }

  _getAttachmentPath() {
    const scopes = this.scopes;

    const scope = scopes.pop();
    // deopt: no compatible scopes
    if (!scope) return;

    if (scope.path.isFunction()) {
      if (this.hasOwnParamBindings(scope)) {
        // deopt: should ignore this scope since it's ourselves
        if (this.scope === scope) return;

        // needs to be attached to the body
        const bodies = scope.path.get("body").get("body") as NodePath[];
        for (let i = 0; i < bodies.length; i++) {
          // Don't attach to something that's going to get hoisted,
          // like a default parameter
          // @ts-expect-error todo(flow->ts): avoid mutating the node, introducing new fields
          if (bodies[i].node._blockHoist) continue;
          return bodies[i];
        }
        // deopt: If here, no attachment path found
      } else {
        // doesn't need to be be attached to this scope
        return this.getNextScopeAttachmentParent();
      }
    } else if (scope.path.isProgram()) {
      return this.getNextScopeAttachmentParent();
    }
  }

  getNextScopeAttachmentParent() {
    const scope = this.scopes.pop();
    if (scope) return this.getAttachmentParentForPath(scope.path);
  }

  // Find an attachment for this path.
  getAttachmentParentForPath(path: NodePath) {
    do {
      if (
        // Beginning of the scope
        !path.parentPath ||
        // Has siblings and is a statement
        (Array.isArray(path.container) && path.isStatement())
      ) {
        return path;
      }
    } while ((path = path.parentPath));
  }

  // Returns true if a scope has param bindings.
  hasOwnParamBindings(scope: Scope) {
    for (const name of Object.keys(this.bindings)) {
      if (!scope.hasOwnBinding(name)) continue;

      const binding = this.bindings[name];
      // Ensure constant; without it we could place behind a reassignment
      if (binding.kind === "param" && binding.constant) return true;
    }
    return false;
  }

  run(): NodePath<t.Expression> | undefined {
    this.path.traverse(referenceVisitor, this);

    if (this.mutableBinding) return;

    this.getCompatibleScopes();

    const attachTo = this.getAttachmentPath();
    if (!attachTo) return;

    // don't bother hoisting to the same function as this will cause multiple branches to be
    // evaluated more than once leading to a bad optimisation
    if (attachTo.getFunctionParent() === this.path.getFunctionParent()) return;

    // generate declaration and insert it to our point
    let uid: t.Identifier | t.JSXExpressionContainer =
      attachTo.scope.generateUidIdentifier("ref");

    // @ts-expect-error todo(flow->ts): more specific type for this.path
    const declarator = variableDeclarator(uid, this.path.node);

    const insertFn = this.attachAfter ? "insertAfter" : "insertBefore";
    const [attached] = attachTo[insertFn]([
      attachTo.isVariableDeclarator()
        ? declarator
        : variableDeclaration("var", [declarator]),
    ]);

    const parent = this.path.parentPath;
    if (parent.isJSXElement() && this.path.container === parent.node.children) {
      // turning the `span` in `<div><span /></div>` to an expression so we need to wrap it with
      // an expression container
      uid = jsxExpressionContainer(uid);
    }

    this.path.replaceWith(cloneNode(uid));

    // @ts-expect-error TS cannot refine the type of `attached`
    // TODO: Should we use `attached.isVariableDeclaration()`?
    return attachTo.isVariableDeclarator()
      ? attached.get("init")
      : attached.get("declarations.0.init");
  }
}
