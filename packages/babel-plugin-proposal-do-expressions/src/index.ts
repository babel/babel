import { declare } from "@babel/helper-plugin-utils";
import traverse, { type NodePath } from "@babel/traverse";
import * as t from "@babel/types";

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION(7));

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
});

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
      pushEffect(test);
      path.set("test", t.booleanLiteral(true));
      path.set(
        "body",
        t.blockStatement([
          ...effects,
          t.ifStatement(t.unaryExpression("!", test.node), t.breakStatement()),
          path.node.body,
        ]),
      );
      break;
    }
    case "DoWhileStatement": {
      const test = path.get("test");
      pushEffect(test);
      path.set("test", t.booleanLiteral(true));
      path.set(
        "body",
        t.blockStatement([
          path.node.body,
          ...effects,
          t.ifStatement(t.unaryExpression("!", test.node), t.breakStatement()),
        ]),
      );
      break;
    }
    case "ExpressionStatement":
      pushEffect(path.get("expression"), false);
      path.replaceWithMultiple(effects);
      break;
    default:
      flattenNormal(path);
      path.replaceWithMultiple([...effects, path.node]);
  }

  function pushEffect(path: NodePath<t.Expression>, needResult = true) {
    const { node } = path;
    if (node.type === "DoExpression") {
      effects.push(node.body);
      if (needResult) {
        const uid = path.get("body").scope.generateDeclaredUidIdentifier("do");
        captureDoExpressionResult(node.body, uid);
        path.replaceWith(uid);
      }
    } else {
      if (isTopLevelSideEffectFree(node)) {
        flattenNormal(path);
      } else {
        if (traverse.hasType(node, "DoExpression")) {
          flattenNormal(path);
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

  function flattenNormal(path: NodePath) {
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
    for (let i = expressions.length - 1; i >= 0; i--) {
      const path = expressions[i];
      if (
        path.node.type !== "DoExpression" &&
        !traverse.hasType(path.node, "DoExpression")
      ) {
        expressions.pop();
      } else {
        break;
      }
    }
    expressions.forEach(path => pushEffect(path));
  }
}

function captureDoExpressionResult(
  node: t.Statement | undefined,
  uid: t.Identifier,
): t.Statement {
  if (!node) return undefined;

  switch (node.type) {
    case "ExpressionStatement":
      return t.expressionStatement(
        t.assignmentExpression("=", t.cloneNode(uid), node.expression),
      );
    case "BlockStatement":
      captureLastNonEmpty(node.body);
      return node;
    case "IfStatement":
      node.consequent = captureDoExpressionResult(node.consequent, uid);
      node.alternate = captureDoExpressionResult(node.alternate, uid);
      return node;
    case "LabeledStatement":
      node.body = captureDoExpressionResult(node.body, uid);
      return node;
    case "SwitchStatement": {
      let lastCaptured = false;
      for (let index = node.cases.length - 1; index >= 0; index--) {
        const { consequent } = node.cases[index];
        let foundBreak = false;
        if (!handleStatements(consequent)) {
          if (!lastCaptured) {
            lastCaptured = captureLastNonEmpty(consequent);
          }
        }

        // Returns true if the result has been captured
        function handleStatements(statements: t.Statement[]): boolean {
          for (let i = 0; i < statements.length; i++) {
            const statement = statements[i];
            if (t.isBreakStatement(statement)) {
              foundBreak = true;
              return captureLastNonEmpty(statements, i);
            }
            if (t.isBlockStatement(statement)) {
              if (!handleStatements(statement.body)) {
                if (foundBreak) {
                  return captureLastNonEmpty(statements, i);
                }
              } else {
                return true;
              }
            }
          }
          return false;
        }
      }
      return node;
    }
    case "ForStatement":
    case "ForInStatement":
    case "ForOfStatement":
    case "WhileStatement":
    case "DoWhileStatement":
      node.body = captureDoExpressionResult(node.body, uid);
      return node;
    default:
      return node;
  }

  function captureLastNonEmpty(
    statements: t.Statement[],
    end: number = statements.length,
  ): boolean {
    for (let i = end - 1; i >= 0; i--) {
      if (!isEmpty(statements[i])) {
        statements[i] = captureDoExpressionResult(statements[i], uid);
        return true;
      }
    }
    return false;
    function isEmpty(node: t.Statement): boolean {
      return (
        t.isEmptyStatement(node) ||
        (t.isBlockStatement(node) && node.body.every(isEmpty))
      );
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
    (t.isUnaryExpression(node) &&
      node.operator !== "throw" &&
      node.operator !== "delete")
  );
}
