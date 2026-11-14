import type { NodePath, Scope } from "@babel/core";
import { types as t } from "@babel/core";

// The hoist function takes a FunctionExpression or FunctionDeclaration
// and replaces any Declaration nodes in its body with assignments, then
// returns a VariableDeclaration containing just the names of the removed
// declarations.
function removeHoistedVarBindings(
  path: NodePath<t.VariableDeclaration>,
  funScope: Scope,
) {
  // `var` declarations are hoisted to `funScope`, even when nested inside a
  // `catch (x)` clause whose scope holds its own catch parameter binding.
  const ownerScope = t.isVar(path.node)
    ? funScope
    : path.scope.getBlockParent();
  const isCatchScope = ownerScope.path.isCatchClause();

  for (const name of Object.keys(path.getBindingIdentifiers())) {
    const binding = ownerScope.getOwnBinding(name);
    if (!binding || binding.kind === "param") continue;
    if (isCatchScope && !binding.path.isVariableDeclarator()) continue;
    ownerScope.removeOwnBinding(name);
  }
}

function removeWithoutScopeBindingRemoval(path: NodePath) {
  // NodePath#remove invokes scope.removeBinding(), which climbs out of nested
  // scopes and removes enclosing catch parameter bindings when `var x` shadows `catch (x)`.
  const opts = path.opts as { noScope?: boolean } | undefined;
  if (!opts) {
    path.remove();
    return;
  }
  const prevNoScope = opts.noScope;
  opts.noScope = true;
  try {
    path.remove();
  } finally {
    opts.noScope = prevNoScope;
  }
}

export function hoist(
  funPath: NodePath<t.FunctionExpression | t.FunctionDeclaration>,
) {
  t.assertFunction(funPath.node);

  const vars: Record<string, t.Identifier> = {
    // @ts-expect-error __proto__: null
    __proto__: null,
  };

  function varDeclToExpr(
    { node: vdec }: NodePath,
    includeIdentifiers: boolean,
  ) {
    t.assertVariableDeclaration(vdec);
    // TODO assert.equal(vdec.kind, "var");
    const exprs: t.Expression[] = [];

    (
      vdec.declarations as (t.VariableDeclarator & { id: t.Identifier })[]
    ).forEach(function (dec) {
      // Note: We duplicate 'dec.id' here to ensure that the variable declaration IDs don't
      // have the same 'loc' value, since that can make sourcemaps and retainLines behave poorly.
      vars[dec.id.name] = t.identifier(dec.id.name);

      if (dec.init) {
        exprs.push(t.assignmentExpression("=", dec.id, dec.init));
      } else if (includeIdentifiers) {
        exprs.push(dec.id);
      }
    });

    if (exprs.length === 0) return null;

    if (exprs.length === 1) return exprs[0];

    return t.sequenceExpression(exprs);
  }

  funPath.get("body").traverse({
    VariableDeclaration: {
      exit: function (path) {
        const expr = varDeclToExpr(path, false);
        removeHoistedVarBindings(path, funPath.scope);
        if (expr === null) {
          removeWithoutScopeBindingRemoval(path);
        } else {
          // We don't need to traverse this expression any further because
          // there can't be any new declarations inside an expression.
          path.replaceWith(t.expressionStatement(expr));
        }

        // Since the original node has been either removed or replaced,
        // avoid traversing it any further.
        path.skip();
      },
    },

    ForStatement: function (path) {
      const init = path.get("init");
      if (init.isVariableDeclaration()) {
        const expr = varDeclToExpr(init, false);
        if (expr) {
          if (t.isVar(init.node)) {
            removeHoistedVarBindings(init, funPath.scope);
          }
          init.replaceWith(expr);
        } else {
          removeHoistedVarBindings(init, funPath.scope);
          removeWithoutScopeBindingRemoval(init);
        }
      }
    },

    ForXStatement: function (path) {
      const left = path.get("left");
      if (left.isVariableDeclaration()) {
        if (t.isVar(left.node)) {
          removeHoistedVarBindings(left, funPath.scope);
        }
        left.replaceWith(varDeclToExpr(left, true)!);
      }
    },

    FunctionDeclaration: function (path) {
      const node = path.node;
      vars[node.id!.name] = node.id!;

      const assignment = t.expressionStatement(
        t.assignmentExpression(
          "=",
          t.cloneNode(node.id!),
          t.functionExpression(
            path.scope.generateUidIdentifierBasedOnNode(node),
            node.params,
            node.body,
            node.generator,
            node.async,
          ),
        ),
      );

      if (path.parentPath.isBlockStatement()) {
        // Insert the assignment form before the first statement in the
        // enclosing block.
        path.parentPath.unshiftContainer("body", assignment);

        // Remove the function declaration now that we've inserted the
        // equivalent assignment form at the beginning of the block.
        path.remove();
      } else {
        // If the parent node is not a block statement, then we can just
        // replace the declaration with the equivalent assignment form
        // without worrying about hoisting it.
        path.replaceWith(assignment);

        // Remove the binding, to avoid "duplicate declaration" errors when it will
        // be injected again.
        path.scope.removeBinding(node.id!.name);
      }

      // Don't hoist variables out of inner functions.
      path.skip();
    },

    FunctionExpression: function (path) {
      // Don't descend into nested function expressions.
      path.skip();
    },

    ArrowFunctionExpression: function (path) {
      // Don't descend into nested function expressions.
      path.skip();
    },
  });

  const paramNames: Record<string, t.Identifier> = {
    // @ts-expect-error __proto__: null
    __proto__: null,
  };
  funPath.get("params").forEach(function (paramPath) {
    const param = paramPath.node;
    if (t.isIdentifier(param)) {
      paramNames[param.name] = param;
    } else {
      // Variables declared by destructuring parameter patterns will be
      // harmlessly re-declared.
    }
  });

  const declarations: t.VariableDeclarator[] = [];

  Object.keys(vars).forEach(function (name) {
    if (!Object.hasOwn(paramNames, name)) {
      declarations.push(t.variableDeclarator(vars[name], null));
    }
  });

  return declarations;
}
