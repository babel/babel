import { types as t, traverse } from "@babel/core";
import type { NodePath, Scope, Visitor } from "@babel/core";

type State = {
  needsOuterBinding: boolean;
  scope: Scope;
};

let iifeVisitor: Visitor<State>;
export const getIIFEVisitor: () => Visitor<State> = () =>
  (iifeVisitor ??= traverse.explode({
    "ReferencedIdentifier|BindingIdentifier"(path, state) {
      const { scope, node } = path;
      const { name } = node;

      if (
        name === "eval" ||
        (scope.getBinding(name) === state.scope.parent!.getBinding(name) &&
          state.scope.hasOwnBinding(name))
      ) {
        state.needsOuterBinding = true;
        path.stop();
      }
    },
    // type annotations don't use or introduce "real" bindings
    "TypeAnnotation|TSTypeAnnotation|TypeParameterDeclaration|TSTypeParameterDeclaration":
      (path: NodePath) => path.skip(),
  }));

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

/**
 * Sloppy block functions whose names are parameters do not create Annex B
 * `var` bindings. Once the body moves into an IIFE, preserve that exclusion
 * with lexical declarations around their original block. The function's own
 * block still shadows those declarations, so references keep their bindings.
 */
/**
 * Whether a function named like a parameter is declared in a block (or an
 * `if` clause) of `body`, outside of nested functions: a cheap check before
 * traversing the body with paths.
 */
function hasBlockFunctionDeclaration(
  body: t.BlockStatement,
  paramNames: ReadonlySet<string>,
): boolean {
  const visit = (node: t.Node, parent: t.Node): boolean => {
    if (t.isFunctionDeclaration(node)) {
      return (
        parent !== body &&
        !node.async &&
        !node.generator &&
        !!node.id &&
        paramNames.has(node.id.name)
      );
    }
    if (t.isFunction(node) || t.isClass(node)) return false;
    for (const key of t.VISITOR_KEYS[node.type]) {
      // @ts-expect-error key is a visitor key of node
      const value: t.Node | null | (t.Node | null)[] = node[key];
      if (Array.isArray(value)) {
        for (const child of value) {
          if (child && visit(child, node)) return true;
        }
      } else if (value && visit(value, node)) {
        return true;
      }
    }
    return false;
  };
  return body.body.some(statement => visit(statement, body));
}

export function preserveAnnexBParameterExclusions(
  body: NodePath<t.BlockStatement>,
  paramNames: ReadonlySet<string>,
): boolean {
  if (
    body.isInStrictMode() ||
    !hasBlockFunctionDeclaration(body.node, paramNames)
  ) {
    return false;
  }
  let modified = false;
  const protectedNodes = new WeakSet<t.Node>();
  const blockers = (statements: t.Statement[]) => {
    const names = new Set<string>();
    for (const statement of statements) {
      if (
        t.isFunctionDeclaration(statement) &&
        !statement.async &&
        !statement.generator &&
        statement.id &&
        paramNames.has(statement.id.name)
      ) {
        names.add(statement.id.name);
      }
    }
    return names.size
      ? t.variableDeclaration(
          "let",
          [...names].map(name => t.variableDeclarator(t.identifier(name))),
        )
      : null;
  };
  body.traverse({
    Function(path) {
      if (path.isFunctionDeclaration() && path.parentPath.isIfStatement()) {
        const declaration = blockers([path.node]);
        if (declaration) {
          modified = true;
          path.replaceWith(
            t.blockStatement([declaration, t.blockStatement([path.node])]),
          );
        }
      }
      path.skip();
    },
    BlockStatement(path) {
      if (protectedNodes.has(path.node) || path.isInStrictMode()) return;
      const declaration = blockers(path.node.body);
      if (!declaration) return;
      modified = true;
      protectedNodes.add(path.node);
      path.replaceWith(t.blockStatement([declaration, path.node]));
    },
    SwitchStatement(path) {
      if (protectedNodes.has(path.node) || path.isInStrictMode()) return;
      const declaration = blockers(
        path.node.cases.flatMap(caseNode => caseNode.consequent),
      );
      if (!declaration) return;
      modified = true;
      protectedNodes.add(path.node);
      // The discriminant runs outside the switch's lexical environment.
      const discriminant = path.scope.generateUidIdentifier("discriminant");
      const init = t.variableDeclaration("const", [
        t.variableDeclarator(discriminant, path.node.discriminant),
      ]);
      path.node.discriminant = t.cloneNode(discriminant);
      path.replaceWith(
        t.blockStatement([init, t.blockStatement([declaration, path.node])]),
      );
    },
  });
  return modified;
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
