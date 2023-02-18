import { types as t } from "@babel/core";
import type { NodePath, Visitor, Scope } from "@babel/traverse";

// Whenever a function declaration in a nested block scope
// doesn't conflict with a block-scoped binding from an outer
// scope, we transform it to a variable declaration.
//
// This implements the Annex B.3.3 behavior.
//
// TODO(Babel 8): Figure out how this should interact with
// the transform-block-scoped functions plugin (it feels
// wrong to handle this transform here), and what we want
// to do with Annex B behavior in general.

// To avoid confusing block-scoped variables transformed to
// var with original vars, this transformation happens in two
// different places:
//   1. For functions that "conflict" with var-variables, in
//      the VariableDeclaration visitor.
//   2. For functions that don't conflict with any variable,
//      in the FunctionDeclaration visitor.

export const annexB33FunctionsVisitor: Visitor = {
  VariableDeclaration(path) {
    if (isStrict(path)) return;
    if (path.node.kind !== "var") return;

    const varScope =
      path.scope.getFunctionParent() || path.scope.getProgramParent();
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    varScope.path.traverse(functionsToVarVisitor, {
      names: Object.keys(path.getBindingIdentifiers()),
    });
  },

  // NOTE: These two visitors target the same nodes as the
  // block-scoped-functions plugin

  BlockStatement(path) {
    if (isStrict(path)) return;
    if (t.isFunction(path.parent, { body: path.node })) return;
    transformStatementList(path.get("body"));
  },

  SwitchCase(path) {
    if (isStrict(path)) return;
    transformStatementList(path.get("consequent"));
  },
};

function transformStatementList(paths: NodePath<t.Statement>[]) {
  outer: for (const path of paths) {
    if (!path.isFunctionDeclaration()) continue;
    // Annex B.3.3 only applies to plain functions.
    if (path.node.async || path.node.generator) return;

    const { scope } = path.parentPath;
    if (isVarScope(scope)) return;

    const { name } = path.node.id;
    let currScope = scope;
    do {
      if (currScope.parent.hasOwnBinding(name)) continue outer;
      currScope = currScope.parent;
    } while (!isVarScope(currScope));

    maybeTransformBlockScopedFunction(path);
  }
}

function maybeTransformBlockScopedFunction(
  path: NodePath<t.FunctionDeclaration>,
) {
  const {
    node,
    parentPath: { scope },
  } = path;

  const { id } = node;
  scope.removeOwnBinding(id.name);
  node.id = null;

  const varNode = t.variableDeclaration("var", [
    t.variableDeclarator(id, t.toExpression(node)),
  ]);
  // @ts-expect-error undocumented property
  varNode._blockHoist = 2;

  const [varPath] = path.replaceWith(varNode);
  scope.registerDeclaration(varPath);
}

const functionsToVarVisitor: Visitor<{ names: string[] }> = {
  Scope(path, { names }) {
    for (const name of names) {
      const binding = path.scope.getOwnBinding(name);
      if (binding && binding.kind === "hoisted") {
        maybeTransformBlockScopedFunction(
          binding.path as NodePath<t.FunctionDeclaration>,
        );
      }
    }
  },
  "Expression|Declaration"(path) {
    path.skip();
  },
};

export function isVarScope(scope: Scope) {
  return scope.path.isFunctionParent() || scope.path.isProgram();
}

function isStrict(path: NodePath) {
  return !!path.find(({ node }) => {
    if (t.isProgram(node)) {
      if (node.sourceType === "module") return true;
    } else if (t.isClass(node)) {
      return true;
    } else if (!t.isBlockStatement(node)) {
      return false;
    }

    return node.directives?.some(
      directive => directive.value.value === "use strict",
    );
  });
}
