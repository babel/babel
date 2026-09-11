import { declare } from "@babel/helper-plugin-utils";
import type { NodePath, Scope, Visitor, PluginPass } from "@babel/core";
import { types as t } from "@babel/core";

import {
  getLoopBodyBindings,
  getUsageInBody,
  isVarInLoopHead,
  isVarInForStatementInit,
  wrapLoopBody,
  wrapLoopStatement,
} from "./loop.ts";
import { validateUsage } from "./validation.ts";

export interface Options {
  tdz?: boolean;
  throwIfClosureRequired?: boolean;
}

export default declare((api, opts: Options) => {
  api.assertVersion(REQUIRED_VERSION("^7.0.0-0 || ^8.0.0"));

  const { throwIfClosureRequired = false, tdz: tdzEnabled = false } = opts;
  if (typeof throwIfClosureRequired !== "boolean") {
    throw new Error(`.throwIfClosureRequired must be a boolean, or undefined`);
  }
  if (typeof tdzEnabled !== "boolean") {
    throw new Error(`.tdz must be a boolean, or undefined`);
  }

  return {
    name: "transform-block-scoping",

    visitor: {
      Loop(path: NodePath<t.Loop>, state) {
        const isForStatement = path.isForStatement();
        const headPath = isForStatement
          ? path.get("init")
          : path.isForXStatement()
            ? path.get("left")
            : null;

        let needsBodyWrap = false;
        const markNeedsBodyWrap = () => {
          if (throwIfClosureRequired) {
            throw path.buildCodeFrameError(
              "Compiling let/const in this block would add a closure " +
                "(throwIfClosureRequired).",
            );
          }
          needsBodyWrap = true;
        };

        const body = path.get("body");
        let bodyScope: Scope | null | undefined;
        if (body.isBlockStatement()) {
          bodyScope = body.scope;
        }
        const bindings = getLoopBodyBindings(path);
        for (const binding of bindings) {
          const { capturedInClosure } = getUsageInBody(binding, path);
          if (capturedInClosure) markNeedsBodyWrap();
        }

        const captured: string[] = [];
        const updatedBindingsUsages = new Map<
          string,
          NodePath<t.Identifier>[]
        >();

        // A closure in ForStatement.init captured a head `let`/`const`.
        // wrapLoopBody cannot fix that (the closure is not in the body).
        let capturedInHeadClosure = false;

        if (headPath && isBlockScoped(headPath)) {
          const names = Object.keys(headPath.getBindingIdentifiers());
          const headScope = headPath.scope;

          for (let name of names) {
            if (bodyScope?.hasOwnBinding(name)) continue; // shadowed

            let binding = headScope.getOwnBinding(name);
            if (!binding) {
              headScope.crawl();
              binding = headScope.getOwnBinding(name)!;
            }
            const {
              usages,
              capturedInClosure,
              capturedInHeadClosure: headCapture,
              hasConstantViolations,
            } = getUsageInBody(binding, path);

            if (headCapture) capturedInHeadClosure = true;

            if (
              headScope.parent!.hasBinding(name) ||
              headScope.parent!.hasGlobal(name)
            ) {
              // If the binding is not captured, there is no need
              // of adding it to the closure param. However, rename
              // it if it shadows an outer binding, because the
              // closure will be moved to an outer level.
              const newName = headScope.generateUid(name);
              headScope.rename(name, newName);
              name = newName;
            }

            if (capturedInClosure) {
              markNeedsBodyWrap();
              captured.push(name);
            }

            if (isForStatement && hasConstantViolations) {
              updatedBindingsUsages.set(name, usages);
            }
          }
        }

        if (needsBodyWrap) {
          const varPath = wrapLoopBody(path, captured, updatedBindingsUsages);

          if (headPath?.isVariableDeclaration()) {
            // If we wrap the loop body, we transform the var
            // declaration in the loop head now, to avoid
            // invalid references that break other plugins:
            //
            //  for (let head of x) {
            //    let i = head;
            //    setTimeout(() => i);
            //  }
            //
            // would become
            //
            //  function _loop() {
            //    let i = head;
            //    setTimeout(() => i);
            //  }
            //  for (let head of x) _loop();
            //
            // which references `head` in a scope where it's not visible.
            transformBlockScopedVariable(headPath, state, tdzEnabled);
          }

          (
            varPath.get("declarations.0.init") as NodePath<t.FunctionExpression>
          ).unwrapFunctionEnvironment();
        }

        // Per-entry wrap: the inner `for` can run its init more than once in
        // the same function (nested in another loop — same predicate as
        // #18088). A head-created closure would otherwise close over one
        // shared `var`. Only ForStatement.init can hold such a closure.
        // Do this *after* wrapLoopBody so a body-capture `_loop2(x)` still
        // runs; then this wrap moves the whole `for` into a per-entry `_loop`.
        // isInLoop(path) — not path.parentPath. The Loop visitor's `path` is
        // already the inner `for`; #18088 calls isInLoop(init.parentPath),
        // which is that same node. Passing parentPath here would skip past
        // the outer loop to Program and incorrectly return false.
        if (isForStatement && capturedInHeadClosure && isInLoop(path)) {
          if (throwIfClosureRequired) {
            throw path.buildCodeFrameError(
              "Compiling let/const in this block would add a closure " +
                "(throwIfClosureRequired).",
            );
          }

          const varPath = wrapLoopStatement(path);
          (
            varPath.get("declarations.0.init") as NodePath<t.FunctionExpression>
          ).unwrapFunctionEnvironment();

          // wrapLoopBody already lowered the head, while the `for` still sat
          // in the outer function. Moving the node inside `_loop` is enough
          // for codegen (`var` follows the AST). If we did *not* body-wrap,
          // the Loop's children will not be visited (the `for` was replaced
          // with `_loop()`), so lower `let` → `var` now that the function
          // parent is `_loop`.
          if (!needsBodyWrap) {
            const fnPath = varPath.get(
              "declarations.0.init",
            ) as NodePath<t.FunctionExpression>;
            const innerLoopPath = fnPath.get("body.body.0") as NodePath<t.Loop>;
            const innerHead = innerLoopPath.isForStatement()
              ? innerLoopPath.get("init")
              : null;
            if (innerHead?.isVariableDeclaration()) {
              transformBlockScopedVariable(innerHead, state, tdzEnabled);
            }
          }
        }
      },

      VariableDeclaration(path, state) {
        transformBlockScopedVariable(path, state, tdzEnabled);
      },

      // Class declarations are block-scoped: if there is
      // a class declaration in a nested block that conflicts
      // with an outer block-scoped binding, rename it.
      // TODO: Should this be moved to the classes plugin?
      ClassDeclaration(path) {
        const { id } = path.node;
        if (!id) return;

        const { scope } = path.parentPath;
        if (
          !isVarScope(scope) &&
          scope.parent!.hasBinding(id.name, { noUids: true })
        ) {
          path.scope.rename(id.name);
        }
      },
    },
  };
});

const conflictingFunctionsVisitor: Visitor<{ names: string[] }> = {
  Scope(path, { names }) {
    for (const name of names) {
      const binding = path.scope.getOwnBinding(name);
      if (binding?.kind === "hoisted") {
        path.scope.rename(name);
      }
    }
  },
  "Expression|Declaration"(path) {
    path.skip();
  },
};

function transformBlockScopedVariable(
  path: NodePath<t.VariableDeclaration>,
  state: PluginPass,
  tdzEnabled: boolean,
) {
  if (!isBlockScoped(path)) return;

  const dynamicTDZNames = validateUsage(path, state, tdzEnabled);

  path.node.kind = "var";

  const bindingNames = Object.keys(path.getBindingIdentifiers());
  for (const name of bindingNames) {
    const binding = path.scope.getOwnBinding(name);
    if (!binding) continue;
    binding.kind = "var";
  }

  const isLoopBodyDeclaration = isInLoop(path) && !isVarInLoopHead(path);
  const isNestedForStatementInit =
    isVarInForStatementInit(path) && isInLoop(path.parentPath);
  const shouldInitLoopDeclaration =
    isLoopBodyDeclaration || isNestedForStatementInit;

  if (shouldInitLoopDeclaration || dynamicTDZNames.length > 0) {
    for (const decl of path.node.declarations) {
      // We explicitly add `void 0` to cases like
      //  for (;;) { let a; }
      // to make sure that `a` doesn't keep the value from
      // the previous iteration.
      decl.init ??= t.buildUndefinedNode();
    }
  }

  const blockScope = path.scope;
  const varScope =
    blockScope.getFunctionParent() || blockScope.getProgramParent();

  if (varScope !== blockScope) {
    for (const name of bindingNames) {
      let newName = name;
      if (
        // We pass `noUids` true because, if `name` was a generated
        // UID, it has been used to declare the current variable in
        // a nested scope and thus we don't need to assume that it
        // may be declared (but not registered yet) in an upper one.
        blockScope.parent!.hasBinding(name, { noUids: true }) ||
        blockScope.parent!.hasGlobal(name)
      ) {
        newName = blockScope.generateUid(name);
        blockScope.rename(name, newName);
      }

      blockScope.moveBindingTo(newName, varScope);
    }
  }

  blockScope.path.traverse(conflictingFunctionsVisitor, {
    names: bindingNames,
  });

  for (const name of dynamicTDZNames) {
    path.scope.push({
      id: t.identifier(name),
      init: state.addHelper("temporalUndefined"),
    });
  }
}

function isLetOrConst(
  kind: t.VariableDeclaration["kind"],
): kind is "let" | "const" {
  return kind === "let" || kind === "const";
}

function isInLoop(path: NodePath<t.Node>): boolean {
  if (!path.parentPath) return false;
  if (path.parentPath.isLoop()) return true;
  if (path.parentPath.isFunctionParent()) return false;
  return isInLoop(path.parentPath);
}

function isBlockScoped(
  path: NodePath<t.Node | null>,
): path is NodePath<t.VariableDeclaration> {
  const { node } = path;
  if (!t.isVariableDeclaration(node)) return false;
  const { kind } = node;
  if (kind === "using" || kind === "await using") {
    throw path.buildCodeFrameError(
      `The ${kind} declaration should be first transformed by \`@babel/plugin-transform-explicit-resource-management\`.`,
    );
  } else if (!isLetOrConst(kind)) {
    return false;
  }

  return true;
}

export function isVarScope(scope: Scope) {
  return scope.path.isFunctionParent() || scope.path.isProgram();
}
