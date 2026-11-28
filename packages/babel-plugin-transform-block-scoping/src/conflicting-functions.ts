import type { NodePath, Scope, Visitor, PluginPass } from "@babel/core";
import { types as t } from "@babel/core";

// Once a let/const becomes a var, a function declared with the same name in a
// nested block would be hoisted over it (Annex B), so that function has to be
// renamed.
//
// The statements of a function, program or expression are walked once, when
// their first let/const is converted (or before a loop body in them is moved
// to a closure): the walk collects the functions declared in nested blocks,
// which are rare, and renames those that have a let/const with the same name
// in an enclosing scope. The other ones are remembered, so that a let/const
// added to these statements later only needs a lookup.

// The functions declared in nested blocks that did not conflict with any
// let/const, by the block nodes of their enclosing scopes and by name.
type NestedFunctions = Map<t.Node, Map<string, t.FunctionDeclaration[]>>;

interface WalkState {
  // The functions declared directly in this scope cannot conflict.
  scope: Scope;
  functions: NodePath<t.FunctionDeclaration>[];
  // Whether a function was found in a path that has no scope yet.
  missingScope: boolean;
}

// The walk does not enter expressions and declarations.
const boundaryTypes = new Set<string>([
  ...t.FLIPPED_ALIAS_KEYS.Expression,
  ...t.FLIPPED_ALIAS_KEYS.Declaration,
]);

// Whether this statement can contain other statements.
function isCompoundStatement(statement: t.Statement) {
  switch (statement.type) {
    case "ExpressionStatement":
    case "ReturnStatement":
    case "ThrowStatement":
    case "BreakStatement":
    case "ContinueStatement":
    case "EmptyStatement":
    case "DebuggerStatement":
      return false;
  }
  return !boundaryTypes.has(statement.type);
}

// Whether a function can be declared in this statement, which is in a nested
// block.
function mayContainFunctions(statement: t.Statement) {
  return (
    statement.type === "FunctionDeclaration" || isCompoundStatement(statement)
  );
}

function skipIfNoFunctions(path: NodePath<t.BlockStatement | t.StaticBlock>) {
  if (!path.node.body.some(mayContainFunctions)) path.skip();
}

// Visits the statements only, skipping the keys that can only contain
// expressions. The paths already have a scope from the initial crawl or from
// the main traversal, so it is not computed again.
const nestedFunctionsVisitor: Visitor<WalkState> = {
  noScope: true,
  "Expression|Declaration"(path, state) {
    if (path.isFunctionDeclaration()) {
      const { scope } = path.parentPath;
      if (scope === undefined) state.missingScope = true;
      else if (scope !== state.scope) state.functions.push(path);
    }
    path.skip();
  },
  "ExpressionStatement|ReturnStatement|ThrowStatement|BreakStatement|ContinueStatement"(
    path,
  ) {
    path.skip();
  },
  BlockStatement: skipIfNoFunctions,
  StaticBlock: skipIfNoFunctions,
  SwitchCase(path) {
    if (!path.node.consequent.some(mayContainFunctions)) path.skip();
    else path.skipKey("test");
  },
  "IfStatement|WhileStatement|DoWhileStatement"(path) {
    path.skipKey("test");
  },
  ForStatement(path) {
    path.skipKey("test");
    path.skipKey("update");
  },
  "ForInStatement|ForOfStatement"(path) {
    path.skipKey("right");
  },
  SwitchStatement(path) {
    path.skipKey("discriminant");
  },
  CatchClause(path) {
    path.skipKey("param");
  },
  LabeledStatement(path) {
    path.skipKey("label");
  },
};

// The same visitor, for when some paths do not have a scope yet.
const scopedNestedFunctionsVisitor: Visitor<WalkState> = {
  ...nestedFunctionsVisitor,
  noScope: false,
};

function collectNestedFunctions(path: NodePath, scope: Scope) {
  const state: WalkState = { scope, functions: [], missingScope: false };
  path.traverse(nestedFunctionsVisitor, state);
  if (state.missingScope) {
    state.functions = [];
    path.traverse(scopedNestedFunctionsVisitor, state);
  }
  return state.functions;
}

// The scopes between the scope where `fn` is declared and `root`.
function getEnclosingScopes(
  fn: NodePath<t.FunctionDeclaration>,
  root: NodePath,
) {
  const scopes: Scope[] = [];
  const rootScope = root.scope;
  for (
    let scope = fn.parentPath.scope.parent;
    scope && (scope !== rootScope || rootScope.block === root.node);
    scope = scope.parent
  ) {
    scopes.push(scope);
    if (scope === rootScope) break;
  }
  return scopes;
}

function declaresLetConst(scope: Scope, name: string) {
  const binding = scope.getOwnBinding(name);
  return (
    (binding?.kind === "let" || binding?.kind === "const") &&
    binding.path.isVariableDeclarator() &&
    // TypeScript removes `declare let` and `declare const` declarations, so
    // they will never become a var.
    !binding.path.parent.declare
  );
}

function renameFunction(fn: NodePath<t.FunctionDeclaration>) {
  const { name } = fn.node.id!;
  const { scope } = fn.parentPath;
  const binding = scope.getOwnBinding(name);
  if (binding?.kind === "hoisted" && binding.path.node === fn.node) {
    scope.rename(name);
  }
}

// A declaration that was already converted to a var.
interface Converted {
  scope: Scope;
  names: string[];
}

// Whether `root` has statements with nested blocks, where the functions that
// can conflict are declared.
function hasNestedBlocks(root: t.Node) {
  let statements: t.Statement[];
  if (root.type === "Program") {
    statements = root.body;
  } else if (t.isFunction(root)) {
    if (root.body.type !== "BlockStatement") return false;
    statements = root.body.body;
  } else {
    return true;
  }
  return statements.some(isCompoundStatement);
}

function walkStatements(
  root: NodePath,
  converted: Converted | null,
): NestedFunctions | null {
  if (!hasNestedBlocks(root.node)) return null;
  // Only the body of a function contains statements.
  const functions = collectNestedFunctions(
    root.isFunction() ? root.get("body") : root,
    root.scope,
  );
  if (functions.length === 0) return null;

  const nestedFunctions: NestedFunctions = new Map();
  for (const fn of functions) {
    const { name } = fn.node.id!;
    const scopes = getEnclosingScopes(fn, root);
    const conflicts = scopes.some(
      scope =>
        declaresLetConst(scope, name) ||
        (scope === converted?.scope && converted.names.includes(name)),
    );
    if (conflicts) {
      renameFunction(fn);
      continue;
    }
    for (const { block } of scopes) {
      let byName = nestedFunctions.get(block);
      if (byName === undefined) {
        byName = new Map();
        nestedFunctions.set(block, byName);
      }
      let list = byName.get(name);
      if (list === undefined) {
        list = [];
        byName.set(name, list);
      }
      list.push(fn.node);
    }
  }
  return nestedFunctions.size > 0 ? nestedFunctions : null;
}

// The closest function, program or expression that contains `path`, without
// going through another expression or declaration.
function getStatementsRoot(path: NodePath) {
  let root = path;
  while (
    root.parentPath &&
    root.node.type !== "Program" &&
    !boundaryTypes.has(root.node.type)
  ) {
    root = root.parentPath;
  }
  return root;
}

// The statements that were walked, by their root node.
function getWalkedRoots(
  state: PluginPass,
): Map<t.Node, NestedFunctions | null> {
  let roots = state.get("conflictingFunctions");
  if (roots === undefined) {
    roots = new Map();
    state.set("conflictingFunctions", roots);
  }
  return roots;
}

// A loop body that is moved to a closure can no longer be reached from the
// statements around it, so check them first.
export function renameConflictingFunctionsBeforeLoopWrap(
  loop: NodePath<t.Loop>,
  state: PluginPass,
) {
  const root = getStatementsRoot(loop);
  const roots = getWalkedRoots(state);
  if (!roots.has(root.node)) {
    roots.set(root.node, walkStatements(root, null));
  }
}

// `names` are the bindings of a let/const in `scope` that was just converted
// to a var.
export function renameConflictingFunctions(
  scope: Scope,
  names: string[],
  state: PluginPass,
) {
  const root = getStatementsRoot(scope.path);
  const roots = getWalkedRoots(state);
  const nestedFunctions = roots.get(root.node);
  if (nestedFunctions === undefined) {
    roots.set(root.node, walkStatements(root, { scope, names }));
    return;
  }

  // The let/const declarations that were there when the statements were
  // walked are already checked, but this one may have been added later.
  const byName = nestedFunctions?.get(scope.block);
  if (byName === undefined) return;
  const candidates = new Set<t.Node>();
  for (const name of names) {
    for (const node of byName.get(name) ?? []) {
      if (node.id!.name === name) candidates.add(node);
    }
  }
  if (candidates.size === 0) return;
  for (const fn of collectNestedFunctions(scope.path, scope)) {
    if (candidates.has(fn.node)) renameFunction(fn);
  }
}
