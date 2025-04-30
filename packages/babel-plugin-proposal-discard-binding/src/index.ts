import { declare } from "@babel/helper-plugin-utils";
import type { NodePath } from "@babel/core";
import { types as t } from "@babel/core";

const { cloneNode } = t;

// replace [void, e] with [,e]
function transformVoidPatternIntoNull(path: NodePath<t.VoidPattern>): null {
  const parent = path.parentPath.node as t.ArrayPattern;
  takeVoidPatternComments(path, parent);
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

function takeVoidPatternComments(
  path: NodePath<t.VoidPattern>,
  parent: t.ArrayPattern,
) {
  const { leadingComments, trailingComments } = path.node;
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

  throw new Error("@babel/plugin-proposal-discard-binding: Internal Error");
}

function transformVoidPattern(
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

function transformVoidPatternInLVal(path: NodePath<t.LVal>) {
  for (const voidPatternPath of iterateVoidPatternsInLVal(path)) {
    transformVoidPattern(voidPatternPath);
  }
}

export default declare(function ({ assertVersion }) {
  assertVersion(REQUIRED_VERSION("^7.27.0"));
  return {
    name: "proposal-discard-binding",
    manipulateOptions: (_, p) =>
      p.plugins.push(["discardBinding", { syntaxType: "void" }]),
    visitor: {
      ExportNamedDeclaration(path) {
        const declarationPath = path.get("declaration");
        if (!declarationPath.isVariableDeclaration()) return;
        // exit early if there is no void pattern in `export const ...`
        if (
          iterateVoidPatternInVariableDeclaration(declarationPath).next().done
        )
          return;

        const specifiers = [];

        for (const name of Object.keys(path.getOuterBindingIdentifiers())) {
          specifiers.push(
            t.exportSpecifier(t.identifier(name), t.identifier(name)),
          );
        }

        // Split the declaration and export list into two declarations so that the variable
        // declaration can be transformed and we don't accidentally
        path.replaceWith(declarationPath.node);
        path.insertAfter(t.exportNamedDeclaration(null, specifiers));
        path.scope.crawl();
      },

      VoidPattern(path) {
        transformVoidPattern(path);
      },

      // The following visitors are introduced such that the
      // void pattern transform can run before parameters-destructuring
      // If void pattern reaches stage 4, consider export `transformVoidPattern`
      // and call `transformVoidPattern` in parameters-destructuring
      AssignmentExpression(path) {
        const leftPath = path.get("left");
        if (leftPath.isLVal()) {
          transformVoidPatternInLVal(leftPath);
        }
        // leftPath is an optional member expression, valid in optionalChainingAssign
      },

      VariableDeclaration(path) {
        if (path.parentPath.isForXStatement()) return;
        for (const declarationPath of path.get("declarations")) {
          transformVoidPatternInLVal(declarationPath.get("id"));
        }
      },
    },
  };
});
