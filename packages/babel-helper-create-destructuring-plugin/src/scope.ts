/**
 * Incremental maintenance of the scope information (bindings, references and
 * constant violations) when a node is lowered, instead of crawling the whole
 * scope again.
 *
 * The protocol of a lowering is: `collectScopeInfo` before lowering (the
 * lowering reads the scope information and mutates patterns), forget after
 * lowering, before replacing the nodes, then `registerReplacement` on the new
 * nodes. References and violations are tracked by node, not by path: a node
 * that was moved and registered again through a new path (e.g. by a crawl of
 * a nested scope) is fully forgotten when it is lowered later. Lowerings that
 * only move nodes under new parents can instead keep their paths, with
 * `adoptMovedPaths`.
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
      const binding = registerScope.getOwnBinding(name)!;
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
const scopeInfoVisitor: Visitor = {
  TSTypeAnnotation(path) {
    // Match Scope#crawl: type annotations do not reference runtime bindings.
    path.skip();
  },
  "ReferencedIdentifier|AssignmentExpression|UpdateExpression|ForXStatement|VariableDeclarator"(
    path,
  ) {
    registerPathScopeInfo(path);
  },
};

/**
 * Collect the references and constant violations recorded for the nodes of
 * `path`, which is about to be lowered. The returned function forgets them:
 * it must be called once the lowering has replaced the nodes (some of which
 * are reused, and registered again by `registerScopeInfo`). Bindings are
 * kept: `registerLoweredDeclaration` moves them to the new declarations.
 */
export function collectScopeInfo(path: NodePath): () => void {
  // References and violations are forgotten by node, so the nodes don't need
  // paths: a name is resolved from the scope of `path`, to all the bindings
  // with that name in it and its parents. The node can't be resolved more
  // precisely without its path: e.g. parameter defaults don't see the
  // declarations of the function body, which share the scope of the
  // function. Bindings that have no reference to that node are unaffected.
  // The bindings of nested scopes don't need to be forgotten: their
  // references keep their paths, as their parent nodes don't change, or the
  // scope is created again when visiting its new path.
  const { scope } = path;
  const references = new Map<Binding, Set<t.Node>>();
  const violations = new Map<Binding, Set<t.Node>>();
  const record = (
    map: Map<Binding, Set<t.Node>>,
    name: string,
    node: t.Node,
  ) => {
    for (let s: Scope | undefined = scope; s; s = s.parent) {
      const binding = s.getOwnBinding(name);
      if (!binding) continue;
      let nodes = map.get(binding);
      if (!nodes) map.set(binding, (nodes = new Set()));
      nodes.add(node);
    }
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
      forgetReferences(binding, nodes);
    }
    for (const [binding, nodes] of violations) {
      const { constantViolations } = binding;
      if (removePaths(constantViolations, nodes) > 0) {
        binding.constant = constantViolations.length === 0;
      }
    }
  };
}

/**
 * Remove, in place, the paths of `paths` whose node is in `nodes`. Returns
 * the number of removed paths.
 */
function removePaths(paths: NodePath[], nodes: ReadonlySet<t.Node>): number {
  let kept = 0;
  for (const path of paths) {
    if (!nodes.has(path.node)) paths[kept++] = path;
  }
  const removed = paths.length - kept;
  paths.length = kept;
  return removed;
}

/**
 * Forget the references and constant violations of the nodes of `path`,
 * when nothing reads the scope information before they are registered again
 * (e.g. by a crawl).
 */
export function forgetScopeInfo(path: NodePath) {
  collectScopeInfo(path)();
}

/** Remove the paths of `nodes` from the references of `binding`. */
export function forgetReferences(binding: Binding, nodes: ReadonlySet<t.Node>) {
  // The same node may have been registered through different paths, e.g. by
  // a crawl of a nested scope after it was moved.
  const removed = removePaths(binding.referencePaths, nodes);
  for (let i = 0; i < removed; i++) binding.dereference();
}

/**
 * Register the reference or constant violation of a freshly inserted node,
 * like `Scope#crawl` would.
 */
function registerPathScopeInfo(p: NodePath) {
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
}

/**
 * Register the references and constant violations of freshly inserted nodes,
 * like `Scope#crawl` would.
 */
function registerScopeInfo(paths: NodePath[]) {
  for (const path of paths) {
    registerPathScopeInfo(path);
    path.traverse(scopeInfoVisitor);
  }
}

/**
 * Give the nodes of `moved`, moved under new parents in the tree of `root`,
 * the paths they had before instead of new ones: the paths of their
 * descendants, recorded in the scope information, stay valid, so the scope
 * information of the moved subtrees doesn't need to be forgotten and
 * registered again. Registers the scope information of the new nodes, from
 * `root` to the moved ones.
 */
export function adoptMovedPaths(
  root: NodePath,
  moved: ReadonlyMap<t.Node, NodePath>,
) {
  function visit(path: NodePath) {
    registerPathScopeInfo(path);
    const { node } = path;
    for (const key of t.VISITOR_KEYS[node.type]) {
      // @ts-expect-error key is a visitor key of node
      const value: t.Node | null | (t.Node | null)[] = node[key];
      if (Array.isArray(value)) {
        value.forEach(
          (child, i) => child && visitChild(path, `${key}.${i}`, child),
        );
      } else if (value) {
        visitChild(path, key, value);
      }
    }
  }
  function visitChild(parentPath: NodePath, key: string, node: t.Node) {
    const old = moved.get(node);
    if (!old) {
      visit(parentPath.get(key) as NodePath);
      return;
    }
    // The path of a child is looked up by node in the paths of its parent
    // (`NodePath.get`): make it the old one, then set up at the new location.
    // It must be seeded before getting the child, which would otherwise
    // create a new path (and a new scope, crawled again).
    (parentPath._store ??= new Map()).set(node, old);
    const path = parentPath.get(key) as NodePath;
    if (path !== old) {
      // The paths can't be reused: register the moved subtree again.
      forgetScopeInfo(old);
      registerScopeInfo([path]);
    }
  }
  visit(root);
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
      binding.scope.moveBindingTo(id.name, functionScope);
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
