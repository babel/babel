import { types as t } from "@babel/core";
import type { NodePath } from "@babel/core";

const { cloneNode, exportNamedDeclaration, exportSpecifier, identifier } = t;

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
    const { innerComments = [] } = parent;
    const parentHasInnerComments = innerComments.length > 0;
    innerComments.push(...(leadingComments ?? []), ...(trailingComments ?? []));
    if (parentHasInnerComments) {
      innerComments.sort((a, b) => a.end - b.end);
    } else {
      parent.innerComments = innerComments;
    }
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
  path: NodePath<t.LVal>,
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

export function splitNamedDeclarationAsVarAndExport(
  path: NodePath<t.ExportNamedDeclaration>,
  declarationPath: NodePath<t.VariableDeclaration>,
) {
  const specifiers = [];

  for (const name of Object.keys(path.getOuterBindingIdentifiers())) {
    specifiers.push(exportSpecifier(identifier(name), identifier(name)));
  }
  const programScope = path.scope;
  const replacedPaths = path.replaceWithMultiple([
    declarationPath.node,
    exportNamedDeclaration(null, specifiers),
  ]) as [NodePath<t.VariableDeclaration>, NodePath<t.ExportNamedDeclaration>];
  programScope.crawl();

  return replacedPaths;
}

export function transformVoidPatternInLVal(path: NodePath<t.LVal>) {
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
