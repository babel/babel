import type { NodePath } from "@babel/core";
import { types as t } from "@babel/core";

// The hoist function takes a FunctionExpression or FunctionDeclaration
// and replaces any Declaration nodes in its body with assignments, then
// returns a VariableDeclaration containing just the names of the removed
// declarations.
export function hoist(
  funPath: NodePath<t.FunctionExpression | t.FunctionDeclaration>,
) {
  t.assertFunction(funPath.node);

  const vars: Record<string, t.Identifier> = { __proto__: null };

  function varDeclToExpr(
    path: NodePath,
    includeIdentifiers: false,
  ): t.Expression | null;
  function varDeclToExpr(
    path: NodePath,
    includeIdentifiers: true,
  ): t.Expression | t.LVal | null;
  function varDeclToExpr(
    { node: vdec }: NodePath,
    includeIdentifiers: boolean,
  ) {
    t.assertVariableDeclaration(vdec);
    // TODO assert.equal(vdec.kind, "var");
    const exprs: (t.Expression | t.LVal)[] = [];

    vdec.declarations.forEach(function (dec: t.VariableDeclarator) {
      if (t.isVoidPattern(dec.id)) {
        throw new Error("Must transform void patterns before regenerator.");
      }
      // Note: We duplicate 'dec.id' here to ensure that the variable declaration IDs don't
      // have the same 'loc' value, since that can make sourcemaps and retainLines behave poorly.
      const names = t.getBindingIdentifiers(vdec, false, true, true);
      for (const name of Object.keys(names)) {
        vars[name] = t.identifier(name);
      }

      if (includeIdentifiers) {
        exprs.push(dec.id);
      } else if (dec.init) {
        exprs.push(t.assignmentExpression("=", dec.id, dec.init));
      }
    });

    if (exprs.length === 0) return null;

    if (exprs.length === 1) return exprs[0];

    return t.sequenceExpression(exprs as t.Expression[]);
  }

  funPath.get("body").traverse({
    VariableDeclaration: {
      exit: function (path) {
        const expr = varDeclToExpr(path, false);
        if (expr === null) {
          path.remove();
        } else {
          for (const name of Object.keys(vars)) {
            // Remove the binding, to avoid "duplicate declaration" errors when it will
            // be injected again.
            path.scope.removeBinding(name);
          }

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
          init.replaceWith(expr);
        } else {
          init.remove();
        }
      }
    },

    ForXStatement: function (path) {
      const left = path.get("left");
      if (left.isVariableDeclaration()) {
        left.replaceWith(varDeclToExpr(left, true));
      }
    },

    FunctionDeclaration: function (path) {
      const node = path.node;
      vars[node.id.name] = node.id;

      const assignment = t.expressionStatement(
        t.assignmentExpression(
          "=",
          t.cloneNode(node.id),
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
        path.scope.removeBinding(node.id.name);
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

  const paramNames: Record<string, t.Identifier> = { __proto__: null };
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
