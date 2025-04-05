import { declare } from "@babel/helper-plugin-utils";
import type { types as t, NodePath } from "@babel/core";

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION(7));
  const { types: t, traverse } = api;

  return {
    name: "proposal-do-expressions",
    manipulateOptions: (_, parser) => parser.plugins.push("doExpressions"),

    visitor: {
      DoExpression: {
        exit(path) {
          if (path.node.async) {
            // Async do expressions are not yet supported
            return;
          }
          transformDoExpression(path);
        },
      },
    },
  };

  function transformDoExpression(doExprPath: NodePath<t.DoExpression>) {
    let path: NodePath = doExprPath;
    do {
      if (!path.parentPath) {
        throw new Error("DoExpression must be in a statement");
      }
      if (path.isFunction()) {
        let body = path.get("body");
        if (path.isArrowFunctionExpression()) {
          // Do expression within parameters declarations OR expression body
          if (
            body.isExpression() &&
            traverse.hasType(body.node, "DoExpression")
          ) {
            [body] = body.replaceWith(
              t.blockStatement([t.returnStatement(body.node)]),
            );
            flattenStatement(body.get("body")[0]);
          }
        }

        // Do expression within function parameter lists
        let foundDoExpression = false;
        const deferredPatterns: t.LVal[] = [];
        const deferredUIDs: t.Identifier[] = [];
        for (const param of path.get("params")) {
          const actualParam = param.isRestElement()
            ? param.get("argument")
            : param;
          foundDoExpression ||= traverse.hasType(
            actualParam.node,
            "DoExpression",
          );
          if (foundDoExpression && !isParamSideEffectFree(actualParam.node)) {
            const pattern = actualParam.node;
            const uid = body.scope.generateUidIdentifier("do");
            actualParam.replaceWith(t.cloneNode(uid));
            deferredPatterns.push(pattern);
            deferredUIDs.push(uid);
          }
        }
        if (deferredPatterns.length) {
          let blockBody: NodePath<t.BlockStatement>;
          if (body.isBlockStatement()) {
            blockBody = body;
          } else {
            [blockBody] = body.replaceWith(
              t.blockStatement([t.expressionStatement(body.node)]),
            );
          }

          blockBody.unshiftContainer(
            "body",
            t.variableDeclaration("var", [
              t.variableDeclarator(
                t.arrayPattern(deferredPatterns),
                t.arrayExpression(deferredUIDs),
              ),
            ]),
          );
          flattenStatement(blockBody.get("body")[0]);
        }
        break;
      }
      if (Array.isArray(path.container) && path.isStatement()) {
        // Flatten the closest parent statement
        flattenStatement(path);
        break;
      }
      path = path.parentPath;
    } while (path);
  }

  function flattenStatement(path: NodePath<t.Statement>) {
    const effects: t.Statement[] = [];
    switch (path.type) {
      case "ForStatement": {
        // Example:       for (var i = do { f1(); }; do { f2(); }; do { f3(); }) { ... }
        // Transform to:  var temp1 = f1();
        //                for (var i = temp1; ;) {
        //                  var temp2 = f2();
        //                  if (!temp2) break;
        //                  ...
        //                  f3();
        //                }
        const init = path.get("init");
        if (traverse.hasType(init.node, "DoExpression")) {
          throw new Error("todo");
        }
        effects.length = 0;
        const test = path.get("test");
        if (traverse.hasType(test.node, "DoExpression")) {
          pushEffect(test, true);
          effects.push(
            t.ifStatement(
              t.unaryExpression("!", test.node),
              t.breakStatement(),
            ),
          );
          test.replaceWith(null);
        }
        effects.push(path.node.body);
        const update = path.get("update");
        if (traverse.hasType(update.node, "DoExpression")) {
          pushEffect(update, true, false);
        }
        path.set("body", t.blockStatement(effects));
        break;
      }
      case "WhileStatement": {
        // Example:      while (do { foo(); }) { ... }
        // Transform to: while (true) { var temp = foo(); if (!temp) break; ... }
        const test = path.get("test");
        pushEffect(test, true);
        path.set("test", t.booleanLiteral(true));
        path.set(
          "body",
          t.blockStatement([
            ...effects,
            t.ifStatement(
              t.unaryExpression("!", test.node),
              t.breakStatement(),
            ),
            path.node.body,
          ]),
        );
        break;
      }
      case "DoWhileStatement": {
        // Example:      do { ... } while (do { foo(); })
        // Transform to: do { ...; var temp = foo(); if (!temp) break; } while (true)
        const test = path.get("test");
        pushEffect(test, true);
        path.set("test", t.booleanLiteral(true));
        path.set(
          "body",
          t.blockStatement([
            path.node.body,
            ...effects,
            t.ifStatement(
              t.unaryExpression("!", test.node),
              t.breakStatement(),
            ),
          ]),
        );
        break;
      }
      case "ExpressionStatement":
        pushEffect(path.get("expression"), true, false);
        path.replaceWithMultiple(effects);
        break;
      default:
        flattenNormal(path, true);
        path.replaceWithMultiple([...effects, path.node]);
    }

    function pushEffect(
      path: NodePath<t.Expression>,
      skipTrailing: boolean,
      needResult = true,
    ) {
      const { node } = path;
      if (node.type === "DoExpression") {
        effects.push(node.body);
        if (needResult) {
          const completions = path
            .get("body")
            .getCompletionRecords(/* shouldPreserveBreak */ true)
            .filter(completion => completion.isExpressionStatement());
          if (completions.length === 0) {
            path.replaceWith(path.scope.buildUndefinedNode());
            return;
          }
          const uid = path
            .get("body")
            .scope.generateDeclaredUidIdentifier("do");
          for (const completion of completions) {
            completion.replaceWith(
              t.assignmentExpression(
                "=",
                t.cloneNode(uid),
                completion.node.expression,
              ),
            );
          }
          path.replaceWith(uid);
        }
      } else {
        if (isTopLevelSideEffectFree(node)) {
          flattenNormal(path, skipTrailing);
        } else {
          if (traverse.hasType(node, "DoExpression")) {
            flattenNormal(path, skipTrailing);
          }
          if (needResult) {
            const uid = path.scope.generateDeclaredUidIdentifier("do");
            effects.push(
              t.expressionStatement(
                t.assignmentExpression("=", t.cloneNode(uid), node),
              ),
            );
            path.replaceWith(uid);
          } else {
            effects.push(t.expressionStatement(node));
          }
        }
      }
    }

    function flattenNormal(path: NodePath, skipTrailing: boolean) {
      // Collect immediate descendant expressions
      const expressions: NodePath<t.Expression>[] = [];
      path.traverse({
        Statement(path) {
          path.skip();
        },
        Expression(path) {
          expressions.push(path);
          path.skip();
        },
      });

      // Skip flattening trailing expressions that are after all the DoExpressions
      let lastDoExpression: NodePath<t.Expression>;
      if (skipTrailing) {
        while (expressions.length) {
          const path = expressions.pop();
          if (traverse.hasType(path.node, "DoExpression")) {
            lastDoExpression = path;
            break;
          }
        }
      }

      // Flatten the expressions
      expressions.forEach(path => pushEffect(path, false));
      if (lastDoExpression) {
        pushEffect(lastDoExpression, true);
      }
    }
  }

  function isTopLevelSideEffectFree(node: t.Node): boolean {
    return (
      t.isLiteral(node) ||
      t.isIdentifier(node) ||
      t.isBinaryExpression(node) ||
      t.isLogicalExpression(node) ||
      t.isConditionalExpression(node) ||
      t.isObjectExpression(node) ||
      t.isArrayExpression(node) ||
      t.isClassExpression(node) ||
      t.isFunctionExpression(node) ||
      t.isArrowFunctionExpression(node) ||
      t.isParenthesizedExpression(node) ||
      t.isRecordExpression(node) ||
      t.isTupleExpression(node) ||
      t.isSequenceExpression(node) ||
      (t.isUnaryExpression(node) &&
        node.operator !== "throw" &&
        node.operator !== "delete")
    );
  }

  function isParamSideEffectFree(node: t.Node): boolean {
    return (
      t.isIdentifier(node) ||
      (t.isAssignmentPattern(node) &&
        isParamSideEffectFree(node.left) &&
        t.isPureish(node.right))
    );
  }
});
