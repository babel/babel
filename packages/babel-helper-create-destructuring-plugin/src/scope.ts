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
import type { NodePath, Scope, Visitor } from "@babel/core";

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

// Created once, so that it's only exploded once.
const scopeInfoVisitor: Visitor<(p: NodePath) => void> = {
  ReferencedIdentifier(path, visit) {
    visit(path);
  },
  "AssignmentExpression|UpdateExpression|ForXStatement|VariableDeclarator"(
    path,
    visit,
  ) {
    visit(path);
  },
};

/** Visit `path` and the descendants that carry scope information. */
function forEachScopeInfoPath(path: NodePath, visit: (p: NodePath) => void) {
  visit(path);
  path.traverse(scopeInfoVisitor, visit);
}

/**
 * Collect the references and constant violations recorded for the nodes of
 * `path`, which is about to be lowered. The returned function forgets them:
 * it must be called once the lowering has replaced the nodes (some of which
 * are reused, and registered again by `registerScopeInfo`). Bindings are
 * kept: `registerLoweredDeclaration` moves them to the new declarations.
 */
export function collectScopeInfo(path: NodePath): () => void {
  // References and violations are forgotten by node, so the nodes don't need
  // paths: a name is resolved from the scope of `path`. If it resolves to a
  // binding of a nested scope instead, the outer binding has no reference to
  // that node and nothing is forgotten. The bindings of nested scopes don't
  // need to be forgotten: their references keep their paths, as their parent
  // nodes don't change, or the scope is created again when visiting its new
  // path.
  const { scope } = path;
  const references = new Map<Binding, Set<t.Node>>();
  const violations = new Map<Binding, Set<t.Node>>();
  const record = (
    map: Map<Binding, Set<t.Node>>,
    name: string,
    node: t.Node,
  ) => {
    const binding = scope.getBinding(name);
    if (!binding) return;
    let nodes = map.get(binding);
    if (!nodes) map.set(binding, (nodes = new Set()));
    nodes.add(node);
  };
  t.traverseFast(path.node, node => {
    switch (node.type) {
      case "Identifier":
      case "JSXIdentifier":
        record(references, node.name, node);
        break;
      case "VariableDeclarator":
        // A duplicate `var` declaration is a constant violation
        for (const name of Object.keys(t.getBindingIdentifiers(node.id))) {
          record(violations, name, node);
        }
        break;
      case "AssignmentExpression":
      case "UpdateExpression":
      case "ForInStatement":
      case "ForOfStatement":
        for (const name of Object.keys(t.getAssignmentIdentifiers(node))) {
          record(violations, name, node);
        }
        break;
    }
  });

  return () => {
    for (const [binding, nodes] of references) {
      // The same node may have been registered through different paths, e.g.
      // by a crawl of a nested scope after it was moved.
      binding.referencePaths = binding.referencePaths.filter(ref => {
        if (!nodes.has(ref.node)) return true;
        binding.dereference();
        return false;
      });
    }
    for (const [binding, nodes] of violations) {
      const { length } = binding.constantViolations;
      binding.constantViolations = binding.constantViolations.filter(
        violation => !nodes.has(violation.node),
      );
      if (binding.constantViolations.length !== length) {
        binding.constant = binding.constantViolations.length === 0;
      }
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
      } else if (
        p.isAssignmentExpression() ||
        p.isUpdateExpression() ||
        p.isForXStatement()
      ) {
        const ids = p.getAssignmentIdentifiers();
        for (const name of Object.keys(ids)) {
          const binding = p.scope.getBinding(name);
          if (binding) {
            binding.reassign(p);
          } else {
            p.scope.getProgramParent().addGlobal(ids[name]);
          }
        }
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
