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
          const { node } = path;
          if (node.async) {
            // Async do expressions are not yet supported
            return;
          }

          if (hasEarlyExit(path)) {
            const statement = path.getStatementParent();
            explodeStatement(statement);
          } else {
            const body = node.body.body;
            if (body.length) {
              path.replaceExpressionWithStatements(body);
            } else {
              path.replaceWith(path.scope.buildUndefinedNode());
            }
          }
        },
      },
    },
  };
});

function hasEarlyExit(path: NodePath<t.DoExpression>): boolean {
  let result = false;
  const ignored: string[] = [];

  const Loop = {
    enter() {
      ignored.push("break", "continue");
    },
    exit() {
      ignored.length -= 2;
    },
  };
  path.traverse({
    Statement(path) {
      if (result) path.stop();
    },
    LabeledStatement: {
      enter(path) {
        ignored.push("label_" + path.node.label.name);
      },
      exit() {
        ignored.length -= 1;
      },
    },
    ForStatement: Loop,
    ForInStatement: Loop,
    ForOfStatement: Loop,
    WhileStatement: Loop,
    DoWhileStatement: Loop,
    SwitchStatement: {
      enter() {
        ignored.push("break");
      },
      exit() {
        ignored.length -= 1;
      },
    },
    TryStatement: {
      enter() {
        ignored.push("throw");
      },
      exit() {
        ignored.length -= 1;
      },
    },
    ReturnStatement() {
      result = true;
    },
    BreakStatement(path) {
      result ||= !(
        ignored.includes("break") ||
        (path.node.label && ignored.includes("label_" + path.node.label.name))
      );
    },
    ContinueStatement(path) {
      result ||= !(
        ignored.includes("continue") ||
        (path.node.label && ignored.includes("label_" + path.node.label.name))
      );
    },
    ThrowStatement() {
      result ||= !ignored.includes("throw");
    },
  });

  return result;
}

function explodeStatement(path: NodePath<t.Statement>) {
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
    default:
      explode(path);
      path.replaceWithMultiple([...effects, path.node]);
  }

  function pushEffect(
    path: NodePath<t.Expression>,
    assertHasDoExpression = false,
  ) {
    const { node } = path;
    if (node.type === "DoExpression") {
      const uid = path.get("body").scope.generateDeclaredUidIdentifier();
      effects.push(node.body);
      captureDoExpressionResult(node.body, uid);
      path.replaceWith(uid);
    } else {
      if (isTopLevelSideEffectFree(node)) {
        explode(path);
      } else {
        if (assertHasDoExpression || traverse.hasType(node, "DoExpression")) {
          explode(path);
        }
        const uid = path.scope.generateUidIdentifier();
        effects.push(
          t.expressionStatement(
            t.assignmentExpression("=", t.cloneNode(uid), node),
          ),
        );
        path.replaceWith(uid);
      }
    }
  }

  function explode(path: NodePath) {
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
  if (!node)
    return t.expressionStatement(
      t.assignmentExpression("=", t.cloneNode(uid), t.buildUndefinedNode()),
    );

  switch (node.type) {
    case "ExpressionStatement":
      return t.expressionStatement(
        t.assignmentExpression("=", t.cloneNode(uid), node.expression),
      );
    case "BlockStatement":
      if (node.body.length) {
        node.body[node.body.length - 1] = captureDoExpressionResult(
          node.body[node.body.length - 1],
          uid,
        );
      }
      return node;
    case "IfStatement":
      node.consequent = captureDoExpressionResult(node.consequent, uid);
      node.alternate = captureDoExpressionResult(node.alternate, uid);
      return node;
    case "LabeledStatement":
      node.body = captureDoExpressionResult(node.body, uid);
      return node;
    default:
      return node;
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
