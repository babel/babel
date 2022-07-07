import { types as t } from "@babel/core";
import type { NodePath, Scope, Visitor } from "@babel/traverse";

type State = {
  needsOuterBinding: boolean;
  scope: Scope;
};

export const iifeVisitor: Visitor<State> = {
  "ReferencedIdentifier|BindingIdentifier"(
    path: NodePath<t.Identifier>,
    state,
  ) {
    const { scope, node } = path;
    const { name } = node;

    if (
      name === "eval" ||
      (scope.getBinding(name) === state.scope.parent.getBinding(name) &&
        state.scope.hasOwnBinding(name))
    ) {
      state.needsOuterBinding = true;
      path.stop();
    }
  },
  // type annotations don't use or introduce "real" bindings
  "TypeAnnotation|TSTypeAnnotation|TypeParameterDeclaration|TSTypeParameterDeclaration":
    (path: NodePath) => path.skip(),
};

export function collectShadowedParamsNames(
  param: NodePath<t.Function["params"][number]>,
  functionScope: Scope,
  shadowedParams: Set<string>,
) {
  for (const name of Object.keys(param.getBindingIdentifiers())) {
    const constantViolations = functionScope.bindings[name]?.constantViolations;
    if (constantViolations) {
      for (const redeclarator of constantViolations) {
        const node = redeclarator.node;
        // If a constant violation is a var or a function declaration,
        // we first check to see if it's a var without an init.
        // If so, we remove that declarator.
        // Otherwise, we have to wrap it in an IIFE.
        switch (node.type) {
          case "VariableDeclarator": {
            if (node.init === null) {
              const declaration = redeclarator.parentPath;
              // The following uninitialized var declarators should not be removed
              // for (var x in {})
              // for (var x;;)
              if (
                !declaration.parentPath.isFor() ||
                declaration.parentPath.get("body") === declaration
              ) {
                redeclarator.remove();
                break;
              }
            }

            shadowedParams.add(name);
            break;
          }
          case "FunctionDeclaration":
            shadowedParams.add(name);
            break;
        }
      }
    }
  }
}

export function buildScopeIIFE(
  shadowedParams: Set<string>,
  body: t.BlockStatement,
) {
  const args = [];
  const params = [];

  for (const name of shadowedParams) {
    // We create them twice; the other option is to use t.cloneNode
    args.push(t.identifier(name));
    params.push(t.identifier(name));
  }

  return t.returnStatement(
    t.callExpression(t.arrowFunctionExpression(params, body), args),
  );
}
