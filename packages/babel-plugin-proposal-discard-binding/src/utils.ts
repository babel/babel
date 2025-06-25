import { types as t } from "@babel/core";
import type { NodePath } from "@babel/core";

const { cloneNode } = t;

// replace [void, e] with [,e]
function transformVoidPatternIntoNull(path: NodePath<t.VoidPattern>): null {
  const parent = path.parent as t.ArrayPattern;
  takeVoidPatternComments(path.node, parent);
  parent.elements[path.key as number] = null;
  return null;
}

// replace { p: void } with { p: _1 }
function transformVoidPatternIntoUidIdentifier(path: NodePath<t.VoidPattern>) {
  const uidIdentifier = path.scope.generateUidIdentifier("_");
  const [replacedUidPath] = path.replaceWith(uidIdentifier);
  syncScopeForReplacedVoidPattern(replacedUidPath);
  return replacedUidPath;
}

function takeVoidPatternComments(node: t.VoidPattern, parent: t.ArrayPattern) {
  const { leadingComments, trailingComments } = node;
  if (leadingComments != null || trailingComments != null) {
    parent.innerComments ??= [];
    const { innerComments } = parent;
    const nodeStart = node.start ?? 0;
    const insertedIndex = innerComments.findIndex(
      comment => comment.end != null && comment.end > nodeStart,
    );
    innerComments.splice(
      insertedIndex === -1 ? innerComments.length : insertedIndex - 1,
      0,
      ...(leadingComments ?? []),
      ...(trailingComments ?? []),
    );
  }
}

function syncScopeForReplacedVoidPattern(path: NodePath<t.Identifier>) {
  for (let childPath: NodePath = path; childPath.parentPath != null; ) {
    const parentPath: NodePath = childPath.parentPath;
    switch (parentPath.type) {
      case "VariableDeclaration": {
        const kind = parentPath.node.kind;
        const bindingKind =
          kind === "using" || kind === "await using" ? "const" : kind;
        parentPath.scope.registerBinding(bindingKind, path, childPath);
        return;
      }
      case "AssignmentExpression":
      case "ForInStatement":
      case "ForOfStatement":
        parentPath.scope.push({ id: cloneNode(path.node) });
        return;
      case "CatchClause":
        parentPath.scope.registerBinding("let", parentPath);
        return;
      default:
        if (parentPath.isFunction()) {
          parentPath.scope.registerBinding("param", path, childPath);
          return;
        }
    }
    childPath = parentPath;
  }
  /* c8 ignore next */
  throw new Error("@babel/plugin-proposal-discard-binding: Internal Error");
}

export function transformVoidPattern(
  path: NodePath<t.VoidPattern>,
): NodePath<t.Identifier> | null {
  if (path.parentPath.isArrayPattern()) {
    return transformVoidPatternIntoNull(path);
  } else {
    return transformVoidPatternIntoUidIdentifier(path);
  }
}

function* iterateVoidPatternsInLVal(
  path: NodePath<t.LVal | t.PatternLike>,
): Generator<NodePath<t.VoidPattern>> {
  switch (path.type) {
    case "ArrayPattern":
      for (const elementPath of path.get("elements")) {
        yield* iterateVoidPatternsInLVal(elementPath);
      }
      break;
    case "ObjectPattern":
      for (const propertyPath of path.get("properties")) {
        if (propertyPath.isObjectProperty()) {
          yield* iterateVoidPatternsInLVal(
            propertyPath.get("value") as NodePath<t.Pattern>,
          );
        }
      }
      break;
    case "AssignmentPattern":
      yield* iterateVoidPatternsInLVal(path.get("left"));
      break;
    case "VoidPattern":
      yield path;
      break;
    default:
      break;
  }
}

function* iterateVoidPatternInVariableDeclaration(
  path: NodePath<t.VariableDeclaration>,
): Generator<NodePath<t.VoidPattern>> {
  for (const declaratorPath of path.get("declarations")) {
    yield* iterateVoidPatternsInLVal(declaratorPath.get("id"));
  }
}

export function hasVoidPatternInVariableDeclaration(
  path: NodePath<t.VariableDeclaration>,
): boolean {
  return !iterateVoidPatternInVariableDeclaration(path).next().done;
}

export function transformVoidPatternInLVal(
  path: NodePath<t.LVal | t.PatternLike>,
) {
  for (const voidPatternPath of iterateVoidPatternsInLVal(path)) {
    transformVoidPattern(voidPatternPath);
  }
}

export function removeTrailingVoidPatternsFromParams(
  path: NodePath<t.Function>,
) {
  const paramPaths = path.get("params");
  for (let i = paramPaths.length - 1; i >= 0; i--) {
    const paramPath = paramPaths[i];
    if (paramPath.isVoidPattern()) {
      paramPath.remove();
    } else {
      break;
    }
  }
}

// https://tc39.es/ecma262/#sec-isanonymousfunctiondefinition
// We don't test anonymous function / arrow function because they must not be disposable
export function isAnonymousFunctionDefinition(
  node: t.Node,
): node is t.ClassExpression {
  return t.isClassExpression(node) && !node.id;
}

/**
 * Handle using named evaluation, e.g. `using void = class { ... }`.
 * Here we prefix the rhs with `0,` to disable the named evaluation,
 * such that the `name` of the class in rhs is always an empty string
 * @param path The init of the variable declarator
 * @param state The plugin pass object
 */
export function handleUsingNamedEvaluation(path: NodePath<t.Expression>) {
  if (isAnonymousFunctionDefinition(path.node)) {
    path.replaceWith(t.sequenceExpression([t.numericLiteral(0), path.node]));
  }
}
