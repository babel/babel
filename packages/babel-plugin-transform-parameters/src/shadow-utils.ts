import { template, types as t, traverse } from "@babel/core";
import type { File, NodePath, Scope, Visitor } from "@babel/core";

type State = {
  needsOuterBinding: boolean;
  scope: Scope;
};

// We can't use a symbol because this needs to always be the same, even if
// this package isn't deduped by npm.
const globalsUsageKey = "@babel/plugin-transform-parameters/globalsUsage";

interface GlobalsUsage {
  /** `arguments` is referenced outside of arrow functions */
  arguments: boolean;
  eval: boolean;
}

/**
 * Record whether the file reads `arguments` or calls `eval` at all. It must
 * be recorded before the file is transformed (in the `pre` hook of the
 * plugins): the output of the plugins reads `arguments`. Most files don't,
 * which saves traversing every function with non-simple parameters.
 */
export function recordArgumentsUsage(file: File) {
  if (file.get(globalsUsageKey) === undefined) {
    const { globals } = file.scope;
    const has = (name: string) =>
      Object.prototype.hasOwnProperty.call(globals, name);
    const usage: GlobalsUsage = {
      arguments: has("arguments"),
      eval: has("eval"),
    };
    file.set(globalsUsageKey, usage);
  }
}

export function getGlobalsUsage(path: NodePath): GlobalsUsage | undefined {
  return (path.hub as { file?: File } | undefined)?.file?.get(globalsUsageKey);
}

/**
 * Whether the body of the function contains a direct `eval` call, outside of
 * nested functions (whose `var` declarations don't reach it): it can declare
 * `var`s named like the parameters, which would conflict with the lexical
 * declarations initializing the parameters moved into the body.
 */
export function hasDirectEval(path: NodePath<t.Function>): boolean {
  if (getGlobalsUsage(path)?.eval === false) return false;
  const visit = (node: t.Node): boolean => {
    if (t.isFunction(node)) return false;
    if (
      t.isCallExpression(node) &&
      t.isIdentifier(node.callee, { name: "eval" })
    ) {
      return true;
    }
    for (const key of t.VISITOR_KEYS[node.type]) {
      // @ts-expect-error key is a visitor key of node
      const value: t.Node | null | (t.Node | null)[] = node[key];
      if (Array.isArray(value)) {
        if (value.some(child => child && visit(child))) return true;
      } else if (value && visit(value)) {
        return true;
      }
    }
    return false;
  };
  return visit(path.node.body);
}

let iifeVisitor: Visitor<State>;
/**
 * Whether the parameters reference a name declared by the function body,
 * which they can't see: the body must be moved into an IIFE, so that its
 * declarations don't shadow the outer binding for the parameters moved into
 * the body.
 */
export const getIIFEVisitor: () => Visitor<State> = () =>
  (iifeVisitor ??= traverse.explode({
    "ReferencedIdentifier|BindingIdentifier"(path, state) {
      const { scope, node } = path;
      const { name } = node;

      if (name !== "eval" && !state.scope.hasOwnBinding(name)) return;
      const binding = scope.getBinding(name);
      if (
        name === "eval" ||
        binding === state.scope.parent!.getBinding(name) ||
        // A rest element is not a scope: unlike in the other parameters, the
        // references of its pattern resolve to the declarations of the body.
        (binding?.scope === state.scope &&
          binding.kind !== "param" &&
          binding.kind !== "local")
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

function buildScopeIIFE(shadowedParams: Set<string>, body: t.BlockStatement) {
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

/**
 * Move the body of the function into an IIFE called with the parameters it
 * redeclares (`shadowedParams`), after the statements of `before`: its
 * declarations don't shadow the outer bindings for the parameters moved
 * before it. `paramNames` are the names bound by the original parameters.
 * Generators and async functions initialize their parameters when they are
 * called: the IIFE takes over the generator or async nature of the function.
 * Returns the path of the IIFE callee (an arrow function, unless it had to
 * be converted to a function expression), and the statement list where the
 * parameters are initialized, before the IIFE: the body of the function, or
 * of the `try` statement rejecting the errors of an async function.
 */
export function wrapBodyInScopeIIFE(
  path: NodePath<t.Function>,
  shadowedParams: Set<string>,
  paramNames: ReadonlySet<string>,
  before: t.Statement[] = [],
): {
  callee: NodePath<t.ArrowFunctionExpression | t.FunctionExpression>;
  init: t.Statement[];
} {
  path.ensureBlock();
  const path2 = path as NodePath<t.Function & { body: t.BlockStatement }>;
  const { node } = path2;
  const { async, generator } = node;

  // The body becomes the body of the IIFE, whose parameters are only the
  // shadowed ones: its block functions named like the other parameters
  // would be hoisted (Annex B).
  preserveAnnexBParameterExclusions(path2.get("body"), paramNames);
  path.set(
    "body",
    t.blockStatement([...before, buildScopeIIFE(shadowedParams, node.body)]),
  );
  const statements = path2.get("body.body");
  const callee = statements[statements.length - 1].get(
    "argument.callee",
  ) as NodePath<t.ArrowFunctionExpression | t.FunctionExpression>;
  if (!generator && !async) return { callee, init: node.body.body };

  // This is an IIFE, so we don't need to worry about the noNewArrows assumption
  (callee as NodePath<t.ArrowFunctionExpression>).arrowFunctionToExpression();
  callee.node.generator = generator;
  callee.node.async = async;
  node.generator = false;
  node.async = false;
  if (!async || generator) return { callee, init: node.body.body };

  // If the initialization of a parameter throws, it must reject asynchronously.
  const tryStatement = template.statement.ast`
    try {
      ${node.body.body}
    } catch (e) {
      return Promise.reject(e);
    }
  ` as t.TryStatement;
  node.body = t.blockStatement([tryStatement]);
  return { callee, init: tryStatement.block.body };
}
