import esutils from "esutils";
import * as t from "./index";

/**
 * Check if the input `node` is a reference to a bound variable.
 */

export function isReferenced(node: Object, parent: Object): boolean {
  switch (parent.type) {
    // yes: PARENT[NODE]
    // yes: NODE.child
    // no: parent.CHILD
    case "MemberExpression":
      if (parent.property === node && parent.computed) {
        return true;
      } else if (parent.object === node) {
        return true;
      } else {
        return false;
      }

    // no: new.NODE
    // no: NODE.target
    case "MetaProperty":
      return false;

    // yes: { [NODE]: "" }
    // yes: { NODE }
    // no: { NODE: "" }
    case "Property":
      if (parent.key === node) {
        return parent.computed;
      }

    // no: var NODE = init;
    // yes: var id = NODE;
    case "VariableDeclarator":
      return parent.id !== node;

    // no: function NODE() {}
    // no: function foo(NODE) {}
    case "ArrowFunctionExpression":
    case "FunctionDeclaration":
    case "FunctionExpression":
      for (var param of (parent.params: Array)) {
        if (param === node) return false;
      }

      return parent.id !== node;

    // no: export { foo as NODE };
    // yes: export { NODE as foo };
    // no: export { NODE as foo } from "foo";
    case "ExportSpecifier":
      if (parent.source) {
        return false;
      } else {
        return parent.local === node;
      }

    // no: import NODE from "foo";
    case "ImportDefaultSpecifier":
      return false;

    // no: import * as NODE from "foo";
    case "ImportNamespaceSpecifier":
      return false;

    // no: <div NODE="foo" />
    case "JSXAttribute":
      return parent.name !== node;

    // no: import { NODE as foo } from "foo";
    // no: import { foo as NODE } from "foo";
    // no: import NODE from "bar";
    case "ImportSpecifier":
      return false;

    // no: class NODE {}
    case "ClassDeclaration":
    case "ClassExpression":
      return parent.id !== node;

    // yes: class { [NODE](){} }
    case "MethodDefinition":
      return parent.key === node && parent.computed;

    // no: NODE: for (;;) {}
    case "LabeledStatement":
      return false;

    // no: try {} catch (NODE) {}
    case "CatchClause":
      return parent.param !== node;

    // no: function foo(...NODE) {}
    case "RestElement":
      return false;

    // no: [NODE = foo] = [];
    // yes: [foo = NODE] = [];
    case "AssignmentExpression":
    case "AssignmentPattern":
      return parent.right === node;

    // no: [NODE] = [];
    // no: ({ NODE }) = [];
    case "ObjectPattern":
    case "ArrayPattern":
      return false;
  }

  return true;
}

/**
 * Check if the input `name` is a valid identifier name
 * and isn't a reserved word.
 */

export function isValidIdentifier(name: string): boolean {
  if (typeof name !== "string" || esutils.keyword.isReservedWordES6(name, true)) {
    return false;
  } else {
    return esutils.keyword.isIdentifierNameES6(name);
  }
}

/**
 * Description
 */

export function isLet(node: Object): boolean {
  return t.isVariableDeclaration(node) && (node.kind !== "var" || node._let);
}

/**
 * Description
 */

export function isBlockScoped(node: Object): boolean {
  return t.isFunctionDeclaration(node) || t.isClassDeclaration(node) || t.isLet(node);
}

/**
 * Description
 */

export function isVar(node: Object): boolean {
  return t.isVariableDeclaration(node, { kind: "var" }) && !node._let;
}

/**
 * Description
 */

export function isSpecifierDefault(specifier: Object): boolean {
  return t.isImportDefaultSpecifier(specifier) ||
         t.isIdentifier(specifier.imported || specifier.exported, { name: "default" });
}

/**
 * Description
 */

export function isScope(node: Object, parent: Object): boolean {
  if (t.isBlockStatement(node) && t.isFunction(parent, { body: node })) {
    return false;
  }

  return t.isScopable(node);
}

/**
 * Description
 */

export function isImmutable(node: Object): boolean {
  if (t.isType(node.type, "Immutable")) return true;

  if (t.isLiteral(node)) {
    if (node.regex) {
      // regexes are mutable
      return false;
    } else {
      // immutable!
      return true;
    }
  } else if (t.isIdentifier(node)) {
    if (node.name === "undefined") {
      // immutable!
      return true;
    } else {
      // no idea...
      return false;
    }
  }

  return false;
}
