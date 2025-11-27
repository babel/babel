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

  function varDeclToExpr(decl) {
  const id = decl.id;
  if (t.isIdentifier(id)) return id.name;

  const ids = t.getBindingIdentifiers(id, false, true);
  const keys = Object.keys(ids);

  if (keys.length > 0) return keys[0];

  return null; // this prevents the undefined crash
}



  funPath.get("body").traverse({
    VariableDeclaration: {
      exit: function (path) {
        const exprs: t.Expression[] = [];

        path.get("declarations").forEach(decPath => {
          const dec = decPath.node;
          const name = varDeclToExpr(dec);
          if (name) {
            vars[name] = dec.id.type === "Identifier" ? dec.id : t.identifier(name);
          }

          if (dec.init) {
            exprs.push(t.assignmentExpression("=", dec.id, dec.init));
          }
        });

        if (exprs.length === 0) {
          path.remove();
        } else {
          for (const name of Object.keys(vars)) {
            // Remove the binding, to avoid "duplicate declaration" errors when it will
            // be injected again.
            path.scope.removeBinding(name);
          }

          // We don't need to traverse this expression any further because
          // there can't be any new declarations inside an expression.
          const expr =
            exprs.length === 1 ? exprs[0] : t.sequenceExpression(exprs);
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
        const exprs: t.Expression[] = [];
        init.get("declarations").forEach(decPath => {
          const dec = decPath.node;
          const name = varDeclToExpr(dec);
          if (name) {
            vars[name] = dec.id.type === "Identifier" ? dec.id : t.identifier(name);
          }

          if (dec.init) {
            exprs.push(t.assignmentExpression("=", dec.id, dec.init));
          }
        });

        if (exprs.length === 0) {
          init.remove();
        } else {
          const expr =
            exprs.length === 1 ? exprs[0] : t.sequenceExpression(exprs);
          init.replaceWith(expr);
        }
      }
    },

    ForXStatement: function (path) {
      const left = path.get("left");
      if (left.isVariableDeclaration()) {
        const dec = left.node.declarations[0];
        const name = varDeclToExpr(dec);
        if (name) {
          vars[name] = dec.id.type === "Identifier" ? dec.id : t.identifier(name);
        }

        left.replaceWith(dec.id);
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
