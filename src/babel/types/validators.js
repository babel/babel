import isString from "lodash/lang/isString";
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
      for (var i = 0; i < parent.params.length; i++) {
        var param = parent.params[i];
        if (param === node) return false;
      }

      return parent.id !== node;

    // no: export { foo as NODE };
    case "ExportSpecifier":
      return parent.exported !== node;

    // no: import { NODE as foo } from "foo";
    case "ImportSpecifier":
      return parent.imported !== node;

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
    case "AssignmentPattern":
      return parent.right === node;

    // no: [NODE] = [];
    // no: ({ NODE }) = [];
    case "ObjectPattern":
    case "ArrayPattern":
      return false;

    // no: import NODE from "bar";
    case "ImportSpecifier":
      return false;

    // no: import * as NODE from "foo";
    case "ImportNamespaceSpecifier":
      return false;
  }

  return true;
}

/**
 * Check if the input `node` is an `Identifier` and `isReferenced`.
 */

export function isReferencedIdentifier(node: Object, parent: Object, opts?: Object): boolean {
  return t.isIdentifier(node, opts) && t.isReferenced(node, parent);
}

/**
 * Check if the input `name` is a valid identifier name
 * and isn't a reserved word.
 */

export function isValidIdentifier(name: string): boolean {
  return isString(name) && esutils.keyword.isIdentifierName(name) && !esutils.keyword.isReservedWordES6(name, true);
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
  return t.isImportDefaultSpecifier(specifier) || t.isIdentifier(specifier.imported || specifier.exported, { name: "default" });
}

/**
 * Description
 */

export function isScope(node: Object, parent: Object): boolean {
  if (t.isBlockStatement(node)) {
    if (t.isLoop(parent.block, { body: node })) {
      return false;
    }

    if (t.isFunction(parent.block, { body: node })) {
      return false;
    }
  }

  return t.isScopable(node);
}

/**
 * Description
 */

export function isImmutable(node: Object): boolean {
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
