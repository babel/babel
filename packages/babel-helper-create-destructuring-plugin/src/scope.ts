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
 * Record the bindings declared by a variable declaration about to be lowered.
 * The returned function removes the ones that are not declared anymore (with
 * `pureGetters`, the properties bound to unused identifiers are not read).
 */
export function trackDeclaredBindings(
  node: t.VariableDeclaration,
  scope: Scope,
): () => void {
  const declared = Object.entries(t.getBindingIdentifiers(node)).map(
    ([name, id]) => [name, id, scope.getBinding(name)] as const,
  );
  return () => {
    for (const [name, id, binding] of declared) {
      // Still the binding declared by the old declaration: it is gone
      if (
        binding?.identifier === id &&
        binding.scope.getOwnBinding(name) === binding
      ) {
        binding.scope.removeOwnBinding(name);
      }
    }
  };
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
  // paths: a name is resolved from the scope of `path`, to all the bindings
  // with that name in it and its parents. The node can't be resolved more
  // precisely without its path: e.g. parameter defaults don't see the
  // declarations of the function body, which share the scope of the
  // function. Bindings that have no reference to that node are unaffected.
  // The bindings of nested scopes don't need to be forgotten: their
  // references keep their paths, as their parent nodes don't change, or the
  // scope is created again when visiting its new path.
  const info: CollectedScopeInfo = {
    scope: path.scope,
    references: new Map(),
    violations: new Map(),
  };
  collectNodeScopeInfo(
    path.node,
    path.parent,
    path.parentPath?.parent ?? null,
    info,
  );
  const { references, violations } = info;

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
 * An identifier without children (type annotation or decorators): the most
 * common node, whose visitor keys don't need to be looked up.
 */
function isLeafIdentifier(node: t.Node): boolean {
  return node.type === "Identifier" && !node.typeAnnotation && !node.decorators;
}

interface CollectedScopeInfo {
  scope: Scope;
  references: Map<Binding, Set<t.Node>>;
  violations: Map<Binding, Set<t.Node>>;
}

function recordNode(
  map: Map<Binding, Set<t.Node>>,
  scope: Scope,
  name: string,
  node: t.Node,
) {
  for (let s: Scope | undefined = scope; s; s = s.parent) {
    const binding = s.getOwnBinding(name);
    if (!binding) continue;
    let nodes = map.get(binding);
    if (!nodes) map.set(binding, (nodes = new Set()));
    nodes.add(node);
  }
}

/**
 * Only the identifiers in reference positions can be registered as
 * references, like by Scope#crawl: e.g. not the keys of the properties, or
 * the identifiers assigned by a pattern (registered as constant violations
 * of the assignment). A module-level function rather than a closure, so that
 * V8 optimizes it once.
 */
function collectNodeScopeInfo(
  node: t.Node,
  parent: t.Node | null,
  grandparent: t.Node | null,
  info: CollectedScopeInfo,
) {
  const { scope, references, violations } = info;
  switch (node.type) {
    case "Identifier":
      if (!parent || t.isReferenced(node, parent, grandparent ?? undefined)) {
        recordNode(references, scope, node.name, node);
      }
      break;
    case "JSXIdentifier":
      recordNode(references, scope, node.name, node);
      break;
    case "VariableDeclarator":
      // A duplicate `var` declaration is a constant violation
      for (const name of Object.keys(t.getBindingIdentifiers(node.id))) {
        recordNode(violations, scope, name, node);
      }
      break;
    case "AssignmentExpression":
    case "UpdateExpression":
    case "ForInStatement":
    case "ForOfStatement":
      forEachAssignedIdentifier(node, id => {
        recordNode(violations, scope, id.name, node);
      });
      break;
  }
  if (isLeafIdentifier(node)) return;
  for (const key of t.VISITOR_KEYS[node.type]) {
    // @ts-expect-error key is a visitor key of node
    const value: t.Node | null | (t.Node | null)[] = node[key];
    if (Array.isArray(value)) {
      for (const child of value) {
        if (child) collectNodeScopeInfo(child, node, parent, info);
      }
    } else if (value) {
      collectNodeScopeInfo(value, node, parent, info);
    }
  }
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
 * like `Scope#crawl` would. When `p` was just created, it can't be registered
 * already: it is added without the linear search of `Binding#reference`.
 */
function registerPathScopeInfo(p: NodePath, isNewPath: boolean) {
  if (p.isReferencedIdentifier()) {
    const binding = p.scope.getBinding(p.node.name);
    if (binding && isNewPath) {
      binding.referenced = true;
      binding.references++;
      binding.referencePaths.push(p);
    } else if (binding) {
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
    forEachAssignedIdentifier(p.node, id => {
      const binding = p.scope.getBinding(id.name);
      if (binding) {
        binding.reassign(p);
      } else {
        p.scope.getProgramParent().addGlobal(id);
      }
    });
  }
}

/**
 * Call `callback` with the identifiers assigned by `node`, like
 * `t.getAssignmentIdentifiers` (an identifier assigned twice may be passed
 * twice), without allocating.
 */
function forEachAssignedIdentifier(
  node: t.Node | null,
  callback: (id: t.Identifier) => void,
) {
  if (!node) return;
  switch (node.type) {
    case "Identifier":
      callback(node);
      break;
    case "AssignmentExpression":
    case "AssignmentPattern":
    case "ForInStatement":
    case "ForOfStatement":
      forEachAssignedIdentifier(node.left, callback);
      break;
    case "UpdateExpression":
    case "RestElement":
      forEachAssignedIdentifier(node.argument, callback);
      break;
    case "ObjectProperty":
      forEachAssignedIdentifier(node.value, callback);
      break;
    case "ArrayPattern":
      for (const element of node.elements) {
        forEachAssignedIdentifier(element, callback);
      }
      break;
    case "ObjectPattern":
      for (const property of node.properties) {
        forEachAssignedIdentifier(property, callback);
      }
      break;
  }
}

const noMovedPaths: ReadonlyMap<t.Node, NodePath> = new Map();

/**
 * Register the references and constant violations of freshly inserted nodes,
 * like `Scope#crawl` would.
 */
function registerScopeInfo(paths: NodePath[]) {
  for (const path of paths) adoptMovedPaths(path, noMovedPaths);
}

/**
 * Give the nodes of `moved`, moved under new parents in the tree of `root`,
 * the paths they had before instead of new ones: the paths of their
 * descendants, recorded in the scope information, stay valid, so the scope
 * information of the moved subtrees doesn't need to be forgotten and
 * registered again. Registers the scope information of the new nodes, from
 * `root` to the moved ones.
 *
 * The children are walked directly, by module-level functions rather than
 * closures (optimized once by V8): `path.traverse` is much slower for the
 * small trees created by a lowering.
 */
export function adoptMovedPaths(
  root: NodePath,
  moved: ReadonlyMap<t.Node, NodePath>,
  isNewPath = false,
) {
  const { node } = root;
  // Match Scope#crawl: type annotations do not reference runtime bindings.
  if (node.type === "TSTypeAnnotation") return;
  registerPathScopeInfo(root, isNewPath);
  if (isLeafIdentifier(node)) return;

  const keys = t.VISITOR_KEYS[node.type];
  if (moved.size > 0) {
    // The path of a child is looked up by node in the paths of its parent
    // (`NodePath.get`): make it the old one, then set up at the new location.
    // Every moved child must be seeded before getting any of them: getting
    // one creates the paths of all its siblings, with new scopes crawled
    // again.
    for (const key of keys) {
      // @ts-expect-error key is a visitor key of node
      const value: t.Node | null | (t.Node | null)[] = node[key];
      if (Array.isArray(value)) {
        for (const child of value) if (child) seedMovedPath(root, child, moved);
      } else if (value) {
        seedMovedPath(root, value, moved);
      }
    }
  }

  for (const key of keys) {
    // @ts-expect-error key is a visitor key of node
    const value: t.Node | null | (t.Node | null)[] = node[key];
    if (Array.isArray(value)) {
      // Getting one element creates the paths of all of them
      if (!someNeedsPath(value, root, moved)) continue;
      // Without a path to reuse, `get` creates one
      const store = root._store;
      const reused = store?.size ? value.map(child => store.has(child!)) : null;
      const childPaths = root.get(key) as NodePath[];
      for (let i = 0; i < value.length; i++) {
        const child = value[i];
        if (child) adoptMovedChild(childPaths[i], child, moved, !reused?.[i]);
      }
    } else if (needsPath(value, root, moved)) {
      const isNew = !root._store?.has(value!);
      adoptMovedChild(root.get(key) as NodePath, value!, moved, isNew);
    }
  }
}

function someNeedsPath(
  children: (t.Node | null)[],
  parentPath: NodePath,
  moved: ReadonlyMap<t.Node, NodePath>,
) {
  for (const child of children) {
    if (needsPath(child, parentPath, moved)) return true;
  }
  return false;
}

/**
 * Whether the path of `child`, a child of the node of `parentPath`, must be
 * created to register its scope information. The paths of the other nodes
 * are created by the traversal visiting them.
 */
function needsPath(
  child: t.Node | null,
  parentPath: NodePath,
  moved: ReadonlyMap<t.Node, NodePath>,
): boolean {
  if (!child) return false;
  switch (child.type) {
    case "Identifier":
      // e.g. keys and patterns: assigned identifiers are registered through
      // the assignment or declarator
      return (
        moved.has(child) ||
        t.isReferenced(child, parentPath.node, parentPath.parent ?? undefined)
      );
    case "StringLiteral":
    case "NumericLiteral":
    case "BooleanLiteral":
    case "NullLiteral":
    case "BigIntLiteral":
      return false;
    case "ObjectPattern":
    case "ArrayPattern":
      return moved.has(child) || !isPlainPattern(child);
    default:
      return true;
  }
}

/**
 * A pattern only binding identifiers, without anything that can reference a
 * binding (computed keys, defaults, member expressions, types).
 */
function isPlainPattern(node: t.Node | null): boolean {
  if (!node) return true;
  switch (node.type) {
    case "Identifier":
      return !node.typeAnnotation;
    case "VoidPattern":
      return true;
    case "RestElement":
      return !node.typeAnnotation && isPlainPattern(node.argument);
    case "ObjectPattern":
      return (
        !node.typeAnnotation &&
        node.properties.every(prop =>
          prop.type === "RestElement"
            ? isPlainPattern(prop)
            : !prop.computed && isPlainPattern(prop.value),
        )
      );
    case "ArrayPattern":
      return !node.typeAnnotation && node.elements.every(isPlainPattern);
    default:
      return false;
  }
}

function seedMovedPath(
  parentPath: NodePath,
  child: t.Node,
  moved: ReadonlyMap<t.Node, NodePath>,
) {
  const old = moved.get(child);
  if (old) (parentPath._store ??= new Map()).set(child, old);
}

function adoptMovedChild(
  childPath: NodePath,
  child: t.Node,
  moved: ReadonlyMap<t.Node, NodePath>,
  isNewPath: boolean,
) {
  const old = moved.get(child);
  if (!old) {
    adoptMovedPaths(childPath, moved, isNewPath);
  } else if (childPath === old) {
    // `NodePath.get` sets up the container and key, but not the parent node,
    // only updated by `resync`.
    old.parent = childPath.parentPath.node;
  } else {
    // The paths can't be reused: register the moved subtree again.
    forgetScopeInfo(old);
    registerScopeInfo([childPath]);
  }
}

/**
 * Declare `ids` as uninitialized `var`s of the enclosing function, like
 * `scope.push` does, but registered in the function scope (where a crawl
 * would register them) rather than in the scope of the block declaring them.
 */
export function pushHoistedVars(scope: Scope, ids: t.Identifier[]) {
  if (ids.length === 0) return;
  const functionScope = scope.getFunctionParent() ?? scope.getProgramParent();
  // `scope.push` would wrap the body of a loop in a block, whose new scope is
  // crawled: the references of the nodes being lowered would be registered
  // again, through stale paths. Declare them in the function instead.
  const { path: blockParent } = scope.getBlockParent();
  if (
    blockParent.isLoop() &&
    !(blockParent.get("body") as NodePath).isBlockStatement()
  ) {
    scope = functionScope;
  }
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
