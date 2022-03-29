import { declare } from "@babel/helper-plugin-utils";
import syntaxDestructuringPrivate from "@babel/plugin-syntax-destructuring-private";
import {
  hasPrivateKeys,
  hasPrivateClassElement,
  transformPrivateKeyDestructuring,
  buildVariableDeclarationFromParams,
} from "./util";
import { convertFunctionParams } from "@babel/plugin-transform-parameters";
import { unshiftForXStatementBody } from "@babel/plugin-transform-destructuring";

import type { PluginPass } from "@babel/core";
import type { Visitor } from "@babel/traverse";
import { types as t } from "@babel/core";

const {
  assignmentExpression,
  cloneNode,
  expressionStatement,
  isExpressionStatement,
  isIdentifier,
  isSequenceExpression,
  sequenceExpression,
  variableDeclaration,
  variableDeclarator,
} = t;

export default declare(function ({
  assertVersion,
  assumption,
}: {
  assumption: (string) => boolean;
  assertVersion: (string) => void;
}) {
  assertVersion("^7.17.0");

  const ignoreFunctionLength = assumption("ignoreFunctionLength");
  const objectRestNoSymbols = assumption("objectRestNoSymbols");

  const privateKeyDestructuringVisitor: Visitor<PluginPass> = {
    Function(path) {
      // (b, { #x: x } = I) => body
      // transforms to:
      // (p1, p2) => { var b = p1, { #x: x } = p2 === undefined ? I : p2; body; }
      const index = path.node.params.findIndex(param => hasPrivateKeys(param));
      if (index === -1) return;
      // wrap function body within IIFE if any param is shadowed
      convertFunctionParams(path, ignoreFunctionLength, () => false, false);
      const { node, scope } = path;
      const params = node.params;
      const paramsAfterIndex = params.splice(index);
      const { params: transformedParams, variableDeclaration } =
        buildVariableDeclarationFromParams(paramsAfterIndex, scope);

      path
        .get("body") // invariant: path.body is always a BlockStatement
        .unshiftContainer("body", variableDeclaration);
      params.push(...transformedParams);
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
          variableDeclaration("var", [variableDeclarator(node.param, ref)]),
        );
      node.param = cloneNode(ref);
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
          declarator.id,
          declarator.init,
          scope,
          /* isAssignment */ false,
          name => state.addHelper(name),
          objectRestNoSymbols,
          /* useBuiltIns */ true,
        )) {
          newDeclarations.push(variableDeclarator(left, right));
        }
      }
      node.declarations = newDeclarations;
      scope.crawl();
    },

    AssignmentExpression(path, state) {
      const { node, scope, parent } = path;
      if (!hasPrivateKeys(node.left)) return;
      const assignments = [];
      for (const { left, right } of transformPrivateKeyDestructuring(
        node.left,
        node.right,
        scope,
        /* isAssignment */ true,
        name => state.addHelper(name),
        objectRestNoSymbols,
        /* useBuiltIns */ true,
      )) {
        assignments.push(assignmentExpression("=", left, right));
      }
      // preserve completion record
      if (
        (!isExpressionStatement(parent) && !isSequenceExpression(parent)) ||
        path.isCompletionRecord()
      ) {
        const { left } = assignments[0];
        if (scope.isStatic(node.right)) {
          const tempId = scope.generateDeclaredUidIdentifier("m");
          assignments.unshift(
            assignmentExpression("=", tempId, cloneNode(node.right)),
          );
          assignments.push(cloneNode(tempId));
        } else if (
          !isIdentifier(assignments[assignments.length - 1].right, {
            name: left.name,
          })
        ) {
          // If node.right is non-static and then the left is an effectively-constant memoised id
          // If the last assignment does not end with left, that we can safely reuse `left` as the completion value
          assignments.push(cloneNode(left));
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
    inherits: syntaxDestructuringPrivate,
    visitor: visitor,
  };
});
