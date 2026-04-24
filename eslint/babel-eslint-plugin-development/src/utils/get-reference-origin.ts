import type { Rule, Scope } from "eslint";
import type {
  Node,
  Expression,
  Identifier,
  Super,
  ArrowFunctionExpression,
  FunctionDeclaration,
  FunctionExpression,
  Literal,
} from "estree";

export type ReferenceOrigin =
  | {
      kind: "import";
      source: string;
      name: string;
    }
  | {
      kind: "import *";
      source: string;
    }
  | {
      kind: "property";
      base: ReferenceOrigin;
      path: string;
      name: string;
    }
  | {
      kind: "param";
      index: number;
      functionNode: Node & Rule.NodeParentExtension;
      name: string;
    };

// Given a node and a context, returns a description of where its value comes
// from.
// It resolves imports, parameters of exported functions and property accesses.
// See the ReferenceOrigin type for more information.
export default function getReferenceOrigin(
  node: Expression | Super,
  scope: Scope.Scope,
): ReferenceOrigin | null {
  if (node.type === "Identifier") {
    const variable = getVariableDefinition(node.name, scope);
    if (!variable) return null;

    const definition = variable.definition;
    const defNode = definition.node;

    if (definition.type === "ImportBinding") {
      if (defNode.type === "ImportSpecifier") {
        const imported = defNode.imported;
        return {
          kind: "import",
          source: definition.parent.source.value as string,
          name:
            imported.type === "Identifier"
              ? imported.name
              : (imported.value as string),
        };
      }
      if (defNode.type === "ImportNamespaceSpecifier") {
        return {
          kind: "import *",
          source: definition.parent.source.value as string,
        };
      }
    }

    if (
      definition.type === "Variable" &&
      defNode.type === "VariableDeclarator" &&
      defNode.init
    ) {
      const origin = getReferenceOrigin(defNode.init, variable.scope);
      return (
        origin &&
        patternToProperty(
          definition.name as Identifier & Rule.NodeParentExtension,
          origin,
        )
      );
    }

    if (definition.type === "Parameter") {
      return patternToProperty(
        definition.name as Identifier & Rule.NodeParentExtension,
        {
          kind: "param",
          // @ts-expect-error upstream typing issue: https://github.com/eslint/eslint/pull/20798
          index: definition.index,
          functionNode: definition.node as (
            | ArrowFunctionExpression
            | FunctionDeclaration
            | FunctionExpression
          ) &
            Rule.NodeParentExtension,
          name: "",
        },
      );
    }
  }

  if (
    node.type === "MemberExpression" &&
    !node.computed &&
    node.property.type === "Identifier"
  ) {
    const origin = getReferenceOrigin(node.object, scope);
    return origin && addProperty(origin, node.property.name);
  }

  return null;
}

function getVariableDefinition(name: string, scope: Scope.Scope) {
  let currentScope: Scope.Scope | null = scope;
  do {
    const variable = currentScope.set.get(name);
    if (variable?.defs[0]) {
      return { scope: currentScope, definition: variable.defs[0] };
    }
  } while ((currentScope = currentScope.upper));
}

function patternToProperty(
  id: Identifier & Rule.NodeParentExtension,
  base: ReferenceOrigin,
): ReferenceOrigin | null {
  const path = getPatternPath(id);
  return path?.reduce(addProperty, base) ?? null;
}

// Adds a property to a given origin. If it was a namespace import it becomes
// a named import, so that `import * as x from "foo"; x.bar` and
// `import { bar } from "foo"` have the same origin.
function addProperty(origin: ReferenceOrigin, name: string): ReferenceOrigin {
  if (origin.kind === "import *") {
    return {
      kind: "import",
      source: origin.source,
      name,
    };
  }
  if (origin.kind === "property") {
    return {
      kind: "property",
      base: origin.base,
      path: origin.path + "." + name,
      name,
    };
  }
  return {
    kind: "property",
    base: origin,
    path: name,
    name,
  };
}

// if "node" is c of { a: { b: c } }, the result is ["a","b"]
function getPatternPath(node: Identifier & Rule.NodeParentExtension) {
  let current: (Node & Rule.NodeParentExtension) | null = node;
  const path = [];

  // Unshift keys to path while going up
  do {
    const property = current.parent;
    if (
      property.type === "ArrayPattern" ||
      property.type === "AssignmentPattern" ||
      (property.type === "Property" && property.computed)
    ) {
      // These nodes are not supported.
      return null;
    }
    if (property.type === "Property") {
      const key = property.key;
      path.unshift(
        key.type === "Identifier"
          ? key.name
          : ((key as Literal).value as string),
      );
    } else {
      // The destructuring pattern is finished
      break;
    }
  } while (
    (current = current.parent.parent as
      | (Node & Rule.NodeParentExtension)
      | null)
  );

  return path;
}
