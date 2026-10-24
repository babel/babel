/**
 * Incremental maintenance of the scope information (bindings, references and
 * constant violations) when a node is lowered, instead of crawling the whole
 * scope again.
 *
 * The protocol of a lowering is: `collectScopeInfo` before lowering (the
 * lowering reads the scope information and mutates patterns), forget once the
 * nodes are replaced, `registerReplacement` on the new nodes. References and
 * violations are tracked by node, not by path: a node that was moved and
 * registered again through a new path (e.g. by a crawl of a nested scope) is
 * fully forgotten when it is lowered later. Sites that only re-parent a
 * pattern into a declaration that will be lowered afterwards (catch clauses,
 * function parameters) don't need to forget anything.
 */
import { types as t } from "@babel/core";
import type { NodePath, Scope } from "@babel/core";

type Binding = Scope["bindings"][string];

/**
 * Register the bindings declared by a freshly inserted variable declaration.
 * Bindings that already existed (the declaration was created by lowering a
 * destructuring pattern that declared the same identifiers) keep their
 * reference information.
 */
function registerLoweredDeclaration(
  declPath: NodePath<t.VariableDeclaration>,
  scope: Scope,
) {
  const { kind } = declPath.node;
  const registerScope =
    kind === "var"
      ? scope.getFunctionParent() || scope.getProgramParent()
      : scope;

  for (const declarator of declPath.get("declarations")) {
    const ids = t.getBindingIdentifiers(declarator.node.id);
    const transferred: [string, Binding][] = [];
    for (const name of Object.keys(ids)) {
      const old = scope.getBinding(name);
      if (old?.identifier === ids[name]) {
        old.scope.removeOwnBinding(name);
        transferred.push([name, old]);
      }
    }
    registerScope.registerBinding(kind as "var" | "let" | "const", declarator);
    for (const [name, old] of transferred) {
      const binding = registerScope.getOwnBinding(name);
      if (!binding) continue;
      binding.referencePaths = old.referencePaths;
      binding.references = old.references;
      binding.referenced = old.referenced;
      for (const violation of old.constantViolations) {
        binding.reassign(violation);
      }
    }
  }
}

/** Register the scope information of the nodes replacing a lowered node. */
export function registerReplacement(paths: NodePath[], scope: Scope) {
  for (const path of paths) {
    if (path.isVariableDeclaration()) registerLoweredDeclaration(path, scope);
  }
  registerScopeInfo(paths);
}

/**
 * The declared bindings of a variable declaration about to be lowered, to
 * remove the ones that are not declared anymore (with `pureGetters`, the
 * properties bound to unused identifiers are not read).
 */
export function snapshotDeclaredBindings(
  node: t.VariableDeclaration,
  scope: Scope,
): [string, t.Identifier, Binding | undefined][] {
  return Object.entries(t.getBindingIdentifiers(node)).map(([name, id]) => [
    name,
    id,
    scope.getBinding(name),
  ]);
}

export function removeUndeclaredBindings(
  declared: ReturnType<typeof snapshotDeclaredBindings>,
) {
  for (const [name, id, binding] of declared) {
    // Still the binding declared by the old declaration: it is gone
    if (
      binding?.identifier === id &&
      binding.scope.getOwnBinding(name) === binding
    ) {
      binding.scope.removeOwnBinding(name);
    }
  }
}

/** Visit `path` and the descendants that carry scope information. */
function forEachScopeInfoPath(path: NodePath, visit: (p: NodePath) => void) {
  visit(path);
  path.traverse({
    ReferencedIdentifier: visit,
    "AssignmentExpression|UpdateExpression|ForXStatement|VariableDeclarator":
      visit,
  });
}

/** The names assigned by a path visited by `forEachScopeInfoPath`. */
function assignedNames(path: NodePath): string[] {
  return Object.keys(
    path.isVariableDeclarator()
      ? // A duplicate `var` declaration is a constant violation
        t.getBindingIdentifiers(path.node.id)
      : path.getAssignmentIdentifiers(),
  );
}

/**
 * Collect the references and constant violations recorded for the nodes of
 * `path`, which is about to be lowered. The returned function forgets them:
 * it must be called once the lowering has replaced the nodes (some of which
 * are reused, and registered again by `registerScopeInfo`). Bindings are
 * kept: `registerLoweredDeclaration` moves them to the new declarations.
 */
export function collectScopeInfo(path: NodePath): () => void {
  const references: [Binding, t.Node][] = [];
  const violations: [Binding, t.Node][] = [];
  forEachScopeInfoPath(path, p => {
    if (p.isReferencedIdentifier()) {
      const binding = p.scope.getBinding(p.node.name);
      if (binding) references.push([binding, p.node]);
    } else {
      for (const name of assignedNames(p)) {
        const binding = p.scope.getBinding(name);
        if (binding) violations.push([binding, p.node]);
      }
    }
  });

  return () => {
    for (const [binding, node] of references) forgetReference(binding, node);
    for (const [binding, node] of violations) {
      binding.constantViolations = binding.constantViolations.filter(
        violation => violation.node !== node,
      );
      binding.constant = binding.constantViolations.length === 0;
    }
  };
}

/**
 * Forget the references and constant violations of the nodes of `path`,
 * when nothing reads the scope information before they are registered again
 * (e.g. by a crawl).
 */
export function forgetScopeInfo(path: NodePath) {
  collectScopeInfo(path)();
}

/** Remove the paths of `node` from the references of `binding`. */
export function forgetReference(binding: Binding, node: t.Node) {
  // The same node may have been registered through different paths, e.g. by
  // a crawl of a nested scope after it was moved.
  binding.referencePaths = binding.referencePaths.filter(ref => {
    if (ref.node !== node) return true;
    binding.dereference();
    return false;
  });
}

/**
 * Register the references and constant violations of freshly inserted nodes,
 * like `Scope#crawl` would.
 */
function registerScopeInfo(paths: NodePath[]) {
  for (const path of paths) {
    forEachScopeInfoPath(path, p => {
      if (p.isReferencedIdentifier()) {
        const binding = p.scope.getBinding(p.node.name);
        if (binding) {
          binding.reference(p);
        } else {
          p.scope.getProgramParent().addGlobal(p.node);
        }
      } else if (p.isVariableDeclarator()) {
        const ids = t.getBindingIdentifiers(p.node.id);
        for (const name of Object.keys(ids)) {
          const binding = p.scope.getBinding(name);
          // A redeclaration of an existing binding
          if (binding && binding.identifier !== ids[name]) binding.reassign(p);
        }
      } else {
        const ids = p.getAssignmentIdentifiers();
        for (const name of Object.keys(ids)) {
          if (!p.scope.getBinding(name)) {
            p.scope.getProgramParent().addGlobal(ids[name]);
          }
        }
        p.scope.registerConstantViolation(p);
      }
    });
  }
}

/**
 * Declare `ids` as uninitialized `var`s of the enclosing function, like
 * `scope.push` does, but registered in the function scope (where a crawl
 * would register them) rather than in the scope of the block declaring them.
 */
export function pushHoistedVars(scope: Scope, ids: t.Identifier[]) {
  const functionScope = scope.getFunctionParent() ?? scope.getProgramParent();
  for (const id of ids) {
    scope.push({ id });
    const binding = findPushedBinding(scope, functionScope, id.name);
    if (binding && binding.scope !== functionScope) {
      binding.scope.removeOwnBinding(id.name);
      binding.scope = functionScope;
      functionScope.bindings[id.name] = binding;
    }
  }
}

/**
 * Find the binding registered by `scope.push`: in a scope between `scope`
 * and `functionScope`, or in the body of a loop, catch clause or function
 * among them.
 */
function findPushedBinding(scope: Scope, functionScope: Scope, name: string) {
  for (
    let current: Scope | undefined = scope;
    current;
    current = current.parent
  ) {
    const binding = current.getOwnBinding(name);
    if (binding) return binding;
    const { path } = current;
    if (path.isLoop() || path.isCatchClause() || path.isFunction()) {
      const body = path.get("body");
      const binding = body.isBlockStatement()
        ? body.scope.getOwnBinding(name)
        : undefined;
      if (binding) return binding;
    }
    if (current === functionScope) break;
  }
  return undefined;
}
