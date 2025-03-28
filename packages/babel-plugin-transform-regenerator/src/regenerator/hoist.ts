import * as util from "./util.ts";
const hasOwn = Object.prototype.hasOwnProperty;

// The hoist function takes a FunctionExpression or FunctionDeclaration
// and replaces any Declaration nodes in its body with assignments, then
// returns a VariableDeclaration containing just the names of the removed
// declarations.
export function hoist(funPath: any) {
  const t = util.getTypes();
  t.assertFunction(funPath.node);

  const vars: Record<string, any> = {};

  function varDeclToExpr({ node: vdec, scope }: any, includeIdentifiers: any) {
    t.assertVariableDeclaration(vdec);
    // TODO assert.equal(vdec.kind, "var");
    const exprs: any[] = [];

    vdec.declarations.forEach(function (dec: any) {
      // Note: We duplicate 'dec.id' here to ensure that the variable declaration IDs don't
      // have the same 'loc' value, since that can make sourcemaps and retainLines behave poorly.
      vars[dec.id.name] = t.identifier(dec.id.name);

      // Remove the binding, to avoid "duplicate declaration" errors when it will
      // be injected again.
      scope.removeBinding(dec.id.name);

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
      exit: function (path: any) {
        const expr = varDeclToExpr(path, false);
        if (expr === null) {
          path.remove();
        } else {
          // We don't need to traverse this expression any further because
          // there can't be any new declarations inside an expression.
          util.replaceWithOrRemove(path, t.expressionStatement(expr));
        }

        // Since the original node has been either removed or replaced,
        // avoid traversing it any further.
        path.skip();
      },
    },

    ForStatement: function (path: any) {
      const init = path.get("init");
      if (init.isVariableDeclaration()) {
        util.replaceWithOrRemove(init, varDeclToExpr(init, false));
      }
    },

    ForXStatement: function (path: any) {
      const left = path.get("left");
      if (left.isVariableDeclaration()) {
        util.replaceWithOrRemove(left, varDeclToExpr(left, true));
      }
    },

    FunctionDeclaration: function (path: any) {
      const node = path.node;
      vars[node.id.name] = node.id;

      const assignment = t.expressionStatement(
        t.assignmentExpression(
          "=",
          t.clone(node.id),
          t.functionExpression(
            path.scope.generateUidIdentifierBasedOnNode(node),
            node.params,
            node.body,
            node.generator,
            node.expression,
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
        util.replaceWithOrRemove(path, assignment);
      }

      // Remove the binding, to avoid "duplicate declaration" errors when it will
      // be injected again.
      path.scope.removeBinding(node.id.name);

      // Don't hoist variables out of inner functions.
      path.skip();
    },

    FunctionExpression: function (path: any) {
      // Don't descend into nested function expressions.
      path.skip();
    },

    ArrowFunctionExpression: function (path: any) {
      // Don't descend into nested function expressions.
      path.skip();
    },
  });

  const paramNames: Record<string, any> = {};
  funPath.get("params").forEach(function (paramPath: any) {
    const param = paramPath.node;
    if (t.isIdentifier(param)) {
      paramNames[param.name] = param;
    } else {
      // Variables declared by destructuring parameter patterns will be
      // harmlessly re-declared.
    }
  });

  const declarations: any[] = [];

  Object.keys(vars).forEach(function (name: any) {
    if (!hasOwn.call(paramNames, name)) {
      declarations.push(t.variableDeclarator(vars[name], null));
    }
  });

  if (declarations.length === 0) {
    return null; // Be sure to handle this case!
  }

  return t.variableDeclaration("var", declarations);
}
