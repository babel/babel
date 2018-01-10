// @flow

"use strict";

function getVariableDefinition(name /*: string */, scope /*: Scope */) {
  let currentScope = scope;
  do {
    const variable = currentScope.set.get(name);
    if (variable) return variable.defs[0];
  } while ((currentScope = currentScope.upper));
}

function isImportedFromTypes(
  context /*: Context */,
  node /*: Node */,
  kind /*: "named" | "namespace" */
) {
  const definition = getVariableDefinition(node.name, context.getScope());

  if (!definition) return false;
  if (definition.type !== "ImportBinding") return false;
  if (definition.parent.source.value !== "@@babel/types") return false;

  if (kind === "named") {
    return definition.node.type === "ImportSpecifier";
  } else if (kind === "namespace") {
    return definition.node.type === "ImportNamespaceSpecifier";
  }

  return false;
}

function isDefaultFunctionParameterTypes(
  context /*: Context */,
  id /*: Node */
) {
  const definition = getVariableDefinition(id.name, context.getScope());

  if (!definition) return false;
  if (definition.type !== "Parameter") return false;

  const node = definition.node;

  if (node.type === "FunctionDeclaration") {
    // Expect "export default function (DEFINITION) {}"
    if (node.parent.type !== "ExportDefaultDeclaration") return false;
  } else if (node.type === "FunctionExpression") {
    // Expect "module.exports = function (DEFINITION) {}"
    if (
      node.parent.type !== "AssignmentExpression" ||
      node.parent.left.type !== "MemberExpression" ||
      !isIdentifier(node.parent.left.object, "module") ||
      !isIdentifier(node.parent.left.property, "exports")
    ) {
      return false;
    }
  } else {
    return false;
  }

  const param = node.params[0];

  return (
    param &&
    param.type === "ObjectPattern" &&
    param.properties.some(
      prop => isIdentifier(prop.key, "types") && prop.value === definition.name
    )
  );
}

function isIdentifier(node /*: Node */, name /*?: string */) {
  return node.type === "Identifier" && (!name || node.name === name);
}

function isDeprecatedFunctionId(node /*: Node */) {
  return isIdentifier(node, "clone") || isIdentifier(node, "cloneDeep");
}

function reportError(context /*: Context */, node /*: Node */) {
  context.report({
    node,
    message:
      "t.clone() and t.cloneDeep() are deprecated. Use t.cloneNode() instead.",
    fix(fixer) {
      return fixer.replaceText(node, "cloneNode");
    },
  });
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

        if (
          isDeprecatedFunctionId(callee) &&
          isImportedFromTypes(context, callee, "named")
        ) {
          return reportError(context, callee);
        }

        if (
          callee.type === "MemberExpression" &&
          isIdentifier(callee.object) &&
          isDeprecatedFunctionId(callee.property) &&
          (isImportedFromTypes(context, callee.object, "namespace") ||
            isDefaultFunctionParameterTypes(context, callee.object))
        ) {
          return reportError(context, callee.property);
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
