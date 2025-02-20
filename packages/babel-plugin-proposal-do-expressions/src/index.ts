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

  function transformDoExpression(path: NodePath) {
    do {
      if (!path.parentPath) {
        throw new Error("DoExpression must be in a statement");
      }
      if (Array.isArray(path.container) && path.isStatement()) {
        // Flatten the closest parent statement
        flattenStatement(path);
        break;
      }
      if (path.isArrowFunctionExpression()) {
        const body = path.get("body");
        body.assertExpression();
        const [newBody] = body.replaceWith(
          t.blockStatement([t.returnStatement(body.node as t.Expression)]),
        );
        flattenStatement(newBody.get("body")[0]);
        break;
      }
      path = path.parentPath;
    } while (path);
  }

  function flattenStatement(path: NodePath<t.Statement>) {
    const effects: t.Statement[] = [];
    switch (path.type) {
      case "WhileStatement": {
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
          const uid = path
            .get("body")
            .scope.generateDeclaredUidIdentifier("do");
          const completions = path
            .get("body")
            .getCompletionRecords(/* shouldPreserveBreak */ true);
          for (const completion of completions) {
            if (!completion.isExpressionStatement()) continue;
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
          if (
            path.node.type === "DoExpression" ||
            traverse.hasType(path.node, "DoExpression")
          ) {
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
});
