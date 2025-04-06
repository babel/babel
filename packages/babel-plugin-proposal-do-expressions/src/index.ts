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
    while (path) {
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
          if (foundDoExpression && !isLValSideEffectFree(actualParam)) {
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
        return;
      }
      if (path.isStatement()) {
        // Flatten the closest parent statement
        flattenStatement(path);
        return;
      }
      path = path.parentPath;
    }
    throw new Error("DoExpression must be in a statement");
  }

  function flattenStatement(path: NodePath<t.Statement>) {
    switch (path.type) {
      case "VariableDeclaration": {
        const statements: t.Statement[] = [];
        for (const decl of path.get("declarations")) {
          const init = decl.get("init");
          const id = decl.get("id");
          if (traverse.hasType(init.node, "DoExpression")) {
            statements.push(...flattenExpression(init));
          }
          if (traverse.hasType(id.node, "DoExpression")) {
            statements.push(...flattenLVal(id, init.node, path.node.kind));
          } else {
            statements.push(t.variableDeclaration(path.node.kind, [decl.node]));
          }
        }
        path.replaceWithMultiple(statements);
        break;
      }
      case "ForStatement": {
        // Example:       for (var i = do { f1(); }; do { f2(); }; do { f3(); }) { ... }
        // Transform to:  var temp1 = f1();
        //                for (var i = temp1; ;) {
        //                  var temp2 = f2();
        //                  if (!temp2) break;
        //                  ...
        //                  f3();
        //                }
        const body: t.Statement[] = [];
        const test = path.get("test");
        if (traverse.hasType(test.node, "DoExpression")) {
          body.push(
            ...flattenExpression(test),
            t.ifStatement(
              t.unaryExpression("!", test.node),
              t.breakStatement(),
            ),
          );
          test.remove();
        }
        body.push(path.node.body);
        const update = path.get("update");
        if (traverse.hasType(update.node, "DoExpression")) {
          body.push(...flattenExpression(update, { discardResult: true }));
          update.remove();
        }
        path.set("body", t.blockStatement(body));

        // Handle do expression within `init`
        const init = path.get("init");
        if (traverse.hasType(init.node, "DoExpression")) {
          const initNode = init.isExpression()
            ? t.expressionStatement(init.node)
            : init.node;
          init.remove();
          const [newPath] = path.replaceWith(
            t.blockStatement([initNode, path.node]),
          );
          flattenStatement(newPath.get("body")[0]);
        }
        break;
      }
      case "ForInStatement":
      case "ForOfStatement": {
        // Example:       for (const i in do { f1(); }) { ... }
        // Transform to:  var temp1 = f1();
        //                for (var temp2 in temp1) {
        //                  const i = temp2;
        //                  ...
        //                }

        // Handle left side
        const left = path.get("left");
        if (traverse.hasType(left.node, "DoExpression")) {
          const body = path.get("body");
          const uid = body.scope.generateDeclaredUidIdentifier("do");
          if (left.isVariableDeclaration()) {
            const declarator = left.get("declarations")[0];
            declarator.get("init").replaceWith(t.cloneNode(uid));
            const [newBody] = body.replaceWith(
              t.blockStatement([left.node, body.node]),
            );
            flattenStatement(newBody.get("body")[0]);
          } else {
            body.replaceWith(
              t.blockStatement([
                ...flattenLVal(left, t.cloneNode(uid), null),
                body.node,
              ]),
            );
          }
          left.replaceWith(uid);
        }

        // Handle right side
        const right = path.get("right");
        if (traverse.hasType(right.node, "DoExpression")) {
          path.replaceWithMultiple([...flattenExpression(right), path.node]);
        }
        break;
      }
      case "WhileStatement": {
        // Example:      while (do { foo(); }) { ... }
        // Transform to: while (true) { var temp = foo(); if (!temp) break; ... }
        const test = path.get("test");
        path.set(
          "body",
          t.blockStatement([
            ...flattenExpression(test),
            t.ifStatement(
              t.unaryExpression("!", test.node),
              t.breakStatement(),
            ),
            path.node.body,
          ]),
        );
        test.replaceWith(t.booleanLiteral(true));
        break;
      }
      case "DoWhileStatement": {
        // Example:      do { ... } while (do { foo(); })
        // Transform to: do { ...; var temp = foo(); if (!temp) break; } while (true)
        const test = path.get("test");
        path.set(
          "body",
          t.blockStatement([
            path.node.body,
            ...flattenExpression(test),
            t.ifStatement(
              t.unaryExpression("!", test.node),
              t.breakStatement(),
            ),
          ]),
        );
        test.replaceWith(t.booleanLiteral(true));
        break;
      }
      case "ExpressionStatement":
        path.replaceWithMultiple(
          flattenExpression(path.get("expression"), { discardResult: true }),
        );
        break;
      default:
        path.replaceWithMultiple([...flattenByTraverse(path), path.node]);
    }
  }

  function flattenExpression(
    path: NodePath<t.Expression>,
    opts: {
      flattenTrailing?: boolean;
      discardResult?: boolean;
    } = {},
  ): t.Statement[] {
    if (isTopLevelSimple(path)) {
      return flattenByTraverse(path, opts.flattenTrailing);
    }
    const hasDoExpression = traverse.hasType(path.node, "DoExpression");
    if (hasDoExpression) {
      if (path.isDoExpression()) {
        const body = path.get("body");
        if (!opts.discardResult) {
          const completions = body
            .getCompletionRecords(/* shouldPreserveBreak */ true)
            .filter(completion => completion.isExpressionStatement());
          if (completions.length) {
            const uid = body.scope.generateDeclaredUidIdentifier("do");
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
          } else {
            path.replaceWith(path.scope.buildUndefinedNode());
          }
        }
        return [body.node];
      } else if (path.isAssignmentExpression()) {
        const left = path.get("left");
        const right = path.get("right");
        if (traverse.hasType(left.node, "DoExpression")) {
          if (path.node.operator !== "=") {
            throw path.buildCodeFrameError(
              "Do expression inside complex assignment expression is not supported",
            );
          }
          const uid = path.scope.generateDeclaredUidIdentifier("do");
          path.replaceWith(uid);
          return [
            ...flattenExpression(right),
            ...flattenLVal(left, right.node, null),
          ];
        }
      } else if (path.isLogicalExpression()) {
        const operator = path.node.operator;
        const left = path.get("left");
        const right = path.get("right");
        const statements = [
          ...flattenExpression(left),
          t.ifStatement(
            operator === "&&"
              ? t.cloneNode(left.node)
              : operator === "||"
                ? t.unaryExpression("!", t.cloneNode(left.node))
                : t.binaryExpression(
                    "==",
                    t.cloneNode(left.node),
                    t.nullLiteral(),
                  ),
            t.blockStatement(flattenExpression(right)),
          ),
        ];
        path.replaceWith(
          t.logicalExpression(path.node.operator, left.node, right.node),
        );
        return statements;
      } else if (path.isConditionalExpression()) {
        const test = path.get("test");
        const alternate = path.get("alternate");
        const consequent = path.get("consequent");
        const statements = [
          ...flattenExpression(test),
          t.ifStatement(
            t.cloneNode(test.node),
            t.blockStatement(flattenExpression(consequent)),
            t.blockStatement(flattenExpression(alternate)),
          ),
        ];
        path.replaceWith(
          t.conditionalExpression(test.node, consequent.node, alternate.node),
        );
        return statements;
      } else if (path.isOptionalMemberExpression() && path.node.computed) {
        const object = path.get("object");
        const property = path.get("property");
        const uid = path.scope.generateDeclaredUidIdentifier("do");
        path.replaceWith(uid);
        return [
          ...flattenExpression(object),
          t.ifStatement(
            t.binaryExpression("!=", t.cloneNode(object.node), t.nullLiteral()),
            t.blockStatement([
              ...flattenExpression(property),
              t.expressionStatement(
                t.assignmentExpression(
                  "=",
                  t.cloneNode(uid),
                  t.memberExpression(
                    object.node,
                    property.node,
                    true /* computed */,
                  ),
                ),
              ),
            ]),
          ),
        ];
      } else if (path.isOptionalCallExpression()) {
        const callee = path.get("callee");
        const calleeStatements = flattenExpression(callee);
        const [newPath] = path.replaceWith(
          t.callExpression(t.cloneNode(callee.node), path.node.arguments),
        );
        const callStatements = flattenCallExpression(
          newPath,
          opts.discardResult,
        );
        return [
          ...calleeStatements,
          t.ifStatement(
            t.binaryExpression("!=", callee.node, t.nullLiteral()),
            t.blockStatement(callStatements),
          ),
        ];
      } else if (path.isCallExpression()) {
        return flattenCallExpression(path, opts.discardResult);
      }
    }

    if (hasDoExpression) {
      return [
        ...flattenByTraverse(path, opts.flattenTrailing),
        intoTempVariable(path, opts.discardResult),
      ];
    } else {
      return [intoTempVariable(path, opts.discardResult)];
    }
  }

  function flattenCallExpression(
    path: NodePath<t.CallExpression>,
    discardResult?: boolean,
  ): t.Statement[] {
    const callee = path.get("callee");
    let thisArgument: NodePath<t.Expression | t.Super> | undefined;
    const statements = [];
    if (callee.isMemberExpression()) {
      thisArgument = callee.get("object");
      statements.push(...flattenExpression(thisArgument));
    }
    statements.push(...flattenExpression(callee as NodePath<t.Expression>));

    for (const arg of path.get("arguments")) {
      if (arg.isSpreadElement()) {
        const uid = path.scope.generateDeclaredUidIdentifier("do");
        statements.push(
          ...flattenExpression(arg.get("argument")),
          t.expressionStatement(
            t.assignmentExpression(
              "=",
              t.cloneNode(uid),
              t.arrayExpression([arg.node]),
            ),
          ),
        );
        arg.replaceWith(t.spreadElement(uid));
      } else {
        statements.push(...flattenExpression(arg as NodePath<t.Expression>));
      }
    }

    if (thisArgument) {
      // Use `Reflect.apply` to ensure this argument is correct
      path.replaceWith(
        t.callExpression(
          t.memberExpression(t.identifier("Reflect"), t.identifier("apply")),
          [
            path.node.callee as t.Expression,
            thisArgument.isSuper()
              ? t.thisExpression()
              : t.cloneNode(thisArgument.node),
            t.arrayExpression(
              path.node.arguments as Array<t.Expression | t.SpreadElement>,
            ),
          ],
        ),
      );
      return [...statements, intoTempVariable(path, discardResult)];
    } else {
      path.replaceWith(t.callExpression(callee.node, path.node.arguments));
    }
    return [...statements, intoTempVariable(path, discardResult)];
  }

  function flattenLVal(
    path: NodePath<t.LVal | t.OptionalMemberExpression>,
    init: t.Expression | null | undefined,
    declare: "var" | "let" | "const" | "using" | "await using" | null,
  ): t.Statement[] {
    switch (path.type) {
      case "Identifier": {
        if (declare) {
          return [
            t.variableDeclaration(declare, [
              t.variableDeclarator(path.node, init),
            ]),
          ];
        } else {
          return [
            t.expressionStatement(t.assignmentExpression("=", path.node, init)),
          ];
        }
      }
      case "MemberExpression": {
        return [
          ...flattenByTraverse(path),
          t.expressionStatement(t.assignmentExpression("=", path.node, init)),
        ];
      }
      case "AssignmentPattern": {
        const left = path.get("left");
        const right = path.get("right");
        if (init) {
          const uid = path.scope.generateDeclaredUidIdentifier("do");
          return [
            t.expressionStatement(
              t.assignmentExpression("=", t.cloneNode(uid), init),
            ),
            t.ifStatement(
              t.binaryExpression(
                "===",
                t.cloneNode(uid),
                t.buildUndefinedNode(),
              ),
              t.blockStatement([
                ...flattenExpression(right),
                t.expressionStatement(
                  t.assignmentExpression("=", t.cloneNode(uid), right.node),
                ),
              ]),
            ),
            ...flattenLVal(left, uid, declare),
          ];
        } else {
          return flattenLVal(path.get("left"), right.node, declare);
        }
      }
      case "ArrayPattern": {
        const elements: t.ArrayPattern["elements"] = [];
        const statements: t.Statement[] = [];
        for (const element of path.get("elements")) {
          if (!element.type || isLValSideEffectFree(element)) {
            elements.push(element.node);
            continue;
          }
          const uid = path.scope.generateDeclaredUidIdentifier("do");
          if (element.isRestElement()) {
            elements.push(t.restElement(t.cloneNode(uid)));
            statements.push(
              ...flattenLVal(element.get("argument"), uid, declare),
            );
          } else {
            elements.push(t.cloneNode(uid));
            statements.push(...flattenLVal(element, uid, declare));
          }
        }
        return [
          t.expressionStatement(
            t.assignmentExpression("=", t.arrayPattern(elements), init),
          ),
          ...statements,
        ];
      }
      case "ObjectPattern": {
        unsafeWrapIIFE(path);
        return [
          t.expressionStatement(t.assignmentExpression("=", path.node, init)),
        ];
      }
      default: {
        throw path.buildCodeFrameError(
          `Do expression inside ${path.type} is not supported`,
        );
      }
    }
  }

  function flattenByTraverse(
    path: NodePath,
    flattenTrailing?: boolean,
  ): t.Statement[] {
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
    if (!flattenTrailing) {
      while (expressions.length) {
        const path = expressions.pop();
        if (traverse.hasType(path.node, "DoExpression")) {
          lastDoExpression = path;
          break;
        }
      }
    }

    // Flatten the expressions
    const statements: t.Statement[] = [];
    for (const path of expressions) {
      statements.push(...flattenExpression(path, { flattenTrailing: true }));
    }
    if (lastDoExpression) {
      statements.push(...flattenExpression(lastDoExpression));
    }
    return statements;
  }

  function intoTempVariable(
    path: NodePath<t.Expression>,
    discardResult?: boolean,
  ): t.Statement {
    if (discardResult) {
      return t.expressionStatement(path.node);
    } else {
      const uid = path.scope.generateDeclaredUidIdentifier("do");
      const statement = t.expressionStatement(
        t.assignmentExpression("=", t.cloneNode(uid), path.node),
      );
      path.replaceWith(uid);
      return statement;
    }
  }
});

// Wrap all do expressions in an IIFE.
// This doesn't work with control flow statements like break/continue/return.
// Only use this when the code is too hard to transform.
function unsafeWrapIIFE(path: NodePath<t.Node>) {
  path.traverse({
    DoExpression(path) {
      const body = path.node.body.body;
      if (body.length) {
        path.replaceExpressionWithStatements(body);
      } else {
        path.replaceWith(path.scope.buildUndefinedNode());
      }
    },
  });
}

function isTopLevelSimple(path: NodePath<t.Node>): boolean {
  return (
    path.isPureish() ||
    path.isBinaryExpression() ||
    path.isParenthesizedExpression() ||
    path.isSequenceExpression() ||
    (path.isUnaryExpression() &&
      path.node.operator !== "throw" &&
      path.node.operator !== "delete")
  );
}

function isLValSideEffectFree(path: NodePath<t.Node>): boolean {
  return (
    path.isIdentifier() ||
    (path.isAssignmentPattern() &&
      isLValSideEffectFree(path.get("left")) &&
      path.get("right").isPureish()) ||
    (path.isRestElement() && isLValSideEffectFree(path.get("argument")))
  );
}
