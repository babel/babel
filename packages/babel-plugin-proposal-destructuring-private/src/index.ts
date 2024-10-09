import { declare } from "@babel/helper-plugin-utils";
import {
  hasPrivateKeys,
  hasPrivateClassElement,
  transformPrivateKeyDestructuring,
  buildVariableDeclarationFromParams,
} from "./util.ts";
import { convertFunctionParams } from "@babel/plugin-transform-parameters";
import { unshiftForXStatementBody } from "@babel/plugin-transform-destructuring";

import type { PluginPass, NodePath, Visitor, types as t } from "@babel/core";

export default declare(function ({ assertVersion, assumption, types: t }) {
  assertVersion(REQUIRED_VERSION("^7.17.0"));
  const {
    assignmentExpression,
    assignmentPattern,
    cloneNode,
    expressionStatement,
    isExpressionStatement,
    isIdentifier,
    isSequenceExpression,
    sequenceExpression,
    variableDeclaration,
    variableDeclarator,
  } = t;

  const ignoreFunctionLength = assumption("ignoreFunctionLength");
  const objectRestNoSymbols = assumption("objectRestNoSymbols");

  const privateKeyDestructuringVisitor: Visitor<PluginPass> = {
    Function(path) {
      // (b, { #x: x } = I) => body
      // transforms to:
      // (b, p1) => { var { #x: x } = p1 === undefined ? I : p1; body; }
      const firstPrivateIndex = path.node.params.findIndex(param =>
        hasPrivateKeys(param),
      );
      if (firstPrivateIndex === -1) return;
      // wrap function body within IIFE if any param is shadowed
      convertFunctionParams(path, ignoreFunctionLength, () => false);
      // invariant: path.body is always a BlockStatement after `convertFunctionParams`
      const { node, scope } = path;
      const { params } = node;
      const firstAssignmentPatternIndex = ignoreFunctionLength
        ? -1
        : params.findIndex(param => param.type === "AssignmentPattern");
      const paramsAfterIndex = params.splice(firstPrivateIndex);
      const { params: transformedParams, variableDeclaration } =
        buildVariableDeclarationFromParams(paramsAfterIndex, scope);

      (path.get("body") as NodePath<t.BlockStatement>).unshiftContainer(
        "body",
        variableDeclaration,
      );
      params.push(...transformedParams);
      // preserve function.length
      // (b, p1) => {}
      // transforms to
      // (b, p1 = void 0) => {}
      if (firstAssignmentPatternIndex >= firstPrivateIndex) {
        params[firstAssignmentPatternIndex] = assignmentPattern(
          // @ts-expect-error The transformed assignment pattern must not be a RestElement
          params[firstAssignmentPatternIndex],
          scope.buildUndefinedNode(),
        );
      }
      scope.crawl();
      // the pattern will be handled by VariableDeclaration visitor.
    },
    CatchClause(path) {
      // catch({ #x: x }) { body }
      // transforms to:
      // catch(_e) { var {#x: x } = _e; body }
      const { node, scope } = path;
      if (!hasPrivateKeys(node.param)) return;
      // todo: handle shadowed param as we did in convertFunctionParams
      const ref = scope.generateUidIdentifier("e");
      path
        .get("body")
        .unshiftContainer(
          "body",
          variableDeclaration("let", [variableDeclarator(node.param, ref)]),
        );
      node.param = cloneNode(ref);
      scope.crawl();
      // the pattern will be handled by VariableDeclaration visitor.
    },
    ForXStatement(path) {
      const { node, scope } = path;
      const leftPath = path.get("left");
      if (leftPath.isVariableDeclaration()) {
        const left = leftPath.node;
        if (!hasPrivateKeys(left.declarations[0].id)) return;
        // for (const { #x: x } of cls) body;
        // transforms to:
        // for (const ref of cls) { const { #x: x } = ref; body; }
        // todo: the transform here assumes that any expression within
        // the destructuring pattern (`{ #x: x }`), when evaluated, do not interfere
        // with the iterator of cls. Otherwise we have to pause the iterator and
        // interleave the expressions.
        // See also https://gist.github.com/nicolo-ribaudo/f8ac7916f89450f2ead77d99855b2098
        const temp = scope.generateUidIdentifier("ref");
        node.left = variableDeclaration(left.kind, [
          variableDeclarator(temp, null),
        ]);
        left.declarations[0].init = cloneNode(temp);
        unshiftForXStatementBody(path, [left]);
        scope.crawl();
        // the pattern will be handled by VariableDeclaration visitor.
      } else if (leftPath.isPattern()) {
        if (!hasPrivateKeys(leftPath.node)) return;
        // for ({ #x: x } of cls);
        // transforms to:
        // for (const ref of cls) { ({ #x: x } = ref); body; }
        // This transform assumes that any expression within the pattern
        // does not interfere with the iterable `cls`.
        const temp = scope.generateUidIdentifier("ref");
        node.left = variableDeclaration("const", [
          variableDeclarator(temp, null),
        ]);
        const assignExpr = expressionStatement(
          assignmentExpression("=", leftPath.node, cloneNode(temp)),
        );
        unshiftForXStatementBody(path, [assignExpr]);
        scope.crawl();
      }
    },
    VariableDeclaration(path, state) {
      const { scope, node } = path;
      const { declarations } = node;
      if (!declarations.some(declarator => hasPrivateKeys(declarator.id))) {
        return;
      }
      const newDeclarations = [];
      for (const declarator of declarations) {
        for (const { left, right } of transformPrivateKeyDestructuring(
          // @ts-ignore(Babel 7 vs Babel 8) The id of a variable declarator must not be a RestElement
          declarator.id,
          declarator.init,
          scope,
          /* isAssignment */ false,
          /* shouldPreserveCompletion */ false,
          name => state.addHelper(name),
          objectRestNoSymbols,
          /* useBuiltIns */ true,
        )) {
          newDeclarations.push(
            variableDeclarator(
              left as t.Identifier | t.ArrayPattern | t.ObjectPattern,
              right,
            ),
          );
        }
      }
      node.declarations = newDeclarations;
      scope.crawl();
    },

    AssignmentExpression(path, state) {
      const { node, scope, parent } = path;
      if (!hasPrivateKeys(node.left)) return;
      const assignments = [];
      const shouldPreserveCompletion =
        (!isExpressionStatement(parent) && !isSequenceExpression(parent)) ||
        path.isCompletionRecord();
      for (const { left, right } of transformPrivateKeyDestructuring(
        // @ts-expect-error The left of an assignment expression must not be a RestElement
        node.left,
        node.right,
        scope,
        /* isAssignment */ true,
        shouldPreserveCompletion,
        name => state.addHelper(name),
        objectRestNoSymbols,
        /* useBuiltIns */ true,
      )) {
        assignments.push(assignmentExpression("=", left, right));
      }
      // preserve completion record
      if (shouldPreserveCompletion) {
        const { left, right } = assignments[0];
        // If node.right is right and left is an identifier, then the left is an effectively-constant memoised id
        if (isIdentifier(left) && right === node.right) {
          if (
            !isIdentifier(assignments[assignments.length - 1].right, {
              name: left.name,
            })
          ) {
            // If the last assignment does not end with left, then we push `left` as the completion value
            assignments.push(cloneNode(left));
          }
          // do nothing as `left` is already at the end of assignments
        } else {
          const tempId = scope.generateDeclaredUidIdentifier("m");
          assignments.unshift(
            assignmentExpression("=", tempId, cloneNode(node.right)),
          );
          assignments.push(cloneNode(tempId));
        }
      }

      path.replaceWith(sequenceExpression(assignments));
      scope.crawl();
    },
  };

  const visitor: Visitor<PluginPass> = {
    Class(path, state) {
      if (!hasPrivateClassElement(path.node.body)) return;
      path.traverse(privateKeyDestructuringVisitor, state);
    },
  };

  return {
    name: "proposal-destructuring-private",
    manipulateOptions: (_, p) => p.plugins.push("destructuringPrivate"),
    visitor: visitor,
  };
});
