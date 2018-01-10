// @flow

"use strict";

function getVariableDefinition(name /*: string */, scope /*: Scope */) {
  let currentScope = scope;
  do {
    const variable = currentScope.set.get(name);
    if (variable) return variable.defs[0];
  } while ((currentScope = currentScope.upper));
}

function isImportedFrom(
  node /*: Node */,
  scope /*: Scope */,
  module /*: string */,
  kind /*: "named" | "namespace" */
) {
  const definition = getVariableDefinition(node.name, scope);
  if (!definition) return false;

  if (
    definition.type === "ImportBinding" &&
    definition.parent.source.value === module
  ) {
    if (kind === "named") {
      return definition.node.type === "ImportSpecifier";
    }
    if (kind === "namespace") {
      return definition.node.type === "ImportNamespaceSpecifier";
    }
  }

  return false;
}

function isIdentifier(node /*: Node */, name /*?: string */) {
  return node.type === "Identifier" && (!name || node.name === name);
}

function isDeprecatedFunctionId(node /*: Node */) {
  return isIdentifier(node, "clone") || isIdentifier(node, "cloneDeep");
}

module.exports = {
  meta: {
    schema: [],
    fixable: "code",
  },
  create(context /*: Context */) {
    return {
      CallExpression(node /*: Node */) {
        const callee /*: Node */ = node.callee;

        let maybeDeprecatedIdentifier /*: ?Node */;

        if (
          isDeprecatedFunctionId(callee) &&
          isImportedFrom(callee, context.getScope(), "@babel/types", "named")
        ) {
          maybeDeprecatedIdentifier = callee;
        }

        if (callee.type === "MemberExpression" && isIdentifier(callee.object)) {
          if (
            isDeprecatedFunctionId(callee.property) &&
            isImportedFrom(
              callee.object,
              context.getScope(),
              "@babel/types",
              "namespace"
            )
          ) {
            maybeDeprecatedIdentifier = callee.property;
          }
        }

        if (maybeDeprecatedIdentifier) {
          // This is needed because type refinements are lost inside callbacks.
          const deprecatedIdentifier /*: Node */ = maybeDeprecatedIdentifier;

          context.report({
            node,
            message:
              "t.clone() and t.cloneDeep() are deprecated. " +
              "Use t.cloneNode() instead.",
            fix(fixer) {
              return fixer.replaceText(deprecatedIdentifier, "cloneNode");
            },
          });
        }
      },
    };
  },
};

/*:: // ESLint types

type Node = { type: string, [string]: any };

type Definition = {
  type: "ImportedBinding",
  node: Node,
  parent: Node,
};

type Variable = {
  defs: Definition[],
};

type Scope = {
  set: Map<string, Variable>,
  upper: ?Scope,
};

type Context = {
  report(options: {
    node: Node,
    message: string,
    fix?: (fixer: Fixer) => Fixer,
  }): void,

  getScope(): Scope,
};

type Fixer = {
  replaceText(node: Node, replacement: string): Fixer,
};
*/
