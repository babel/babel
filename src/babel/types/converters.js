import isPlainObject from "lodash/lang/isPlainObject";
import isNumber from "lodash/lang/isNumber";
import isRegExp from "lodash/lang/isRegExp";
import isString from "lodash/lang/isString";
import traverse from "../traversal";
import each from "lodash/collection/each";
import * as t from "./index";

/**
 * Description
 */

export function toComputedKey(node: Object, key: Object = node.key || node.property): Object {
  if (!node.computed) {
    if (t.isIdentifier(key)) key = t.literal(key.name);
  }
  return key;
}

/**
 * Turn an array of statement `nodes` into a `SequenceExpression`.
 *
 * Variable declarations are turned into simple assignments and their
 * declarations hoisted to the top of the current scope.
 *
 * Expression statements are just resolved to their expression.
 */

export function toSequenceExpression(nodes: Array<Object>, scope: Scope): Object {
  var exprs = [];

  each(nodes, function (node) {
    if (t.isExpression(node)) {
      exprs.push(node);
    } if (t.isExpressionStatement(node)) {
      exprs.push(node.expression);
    } else if (t.isVariableDeclaration(node)) {
      each(node.declarations, function (declar) {
        scope.push({
          kind: node.kind,
          id: declar.id
        });
        exprs.push(t.assignmentExpression("=", declar.id, declar.init));
      });
    } else if (t.isIfStatement(node)) {
      return t.conditionalExpression(
        node.test,
        node.consequent ? t.toSequenceExpression([node.consequent]) : t.identifier("undefined"),
        node.alternate ? t.toSequenceExpression([node.alternate]) : t.identifier("undefined")
      );
    } else if (t.isBlockStatement(node)) {
      return t.toSequenceExpression(node.body);
    }
  });

  if (exprs.length === 1) {
    return exprs[0];
  } else {
    return t.sequenceExpression(exprs);
  }
}

/**
 * Description
 */

export function toKeyAlias(node: Object, key: Object = node.key) {
  var alias;
  if (t.isIdentifier(key)) {
    alias = key.name;
  } else if (t.isLiteral(key)) {
    alias = JSON.stringify(key.value);
  } else {
    alias = JSON.stringify(traverse.removeProperties(t.cloneDeep(key)));
  }
  if (node.computed) alias = `[${alias}]`;
  return alias;
}

/*
 * Description
 */

export function toIdentifier(name: string): string {
  if (t.isIdentifier(name)) return name.name;

  name = name + "";

  // replace all non-valid identifiers with dashes
  name = name.replace(/[^a-zA-Z0-9$_]/g, "-");

  // remove all dashes and numbers from start of name
  name = name.replace(/^[-0-9]+/, "");

  // camel case
  name = name.replace(/[-\s]+(.)?/g, function (match, c) {
    return c ? c.toUpperCase() : "";
  });

  if (!t.isValidIdentifier(name)) {
    name = `_${name}`;
  }

  return name || "_";
}

/**
 * Description
 *
 * @returns {Object|Boolean}
 */

export function toStatement(node: Object, ignore?: boolean) {
  if (t.isStatement(node)) {
    return node;
  }

  var mustHaveId = false;
  var newType;

  if (t.isClass(node)) {
    mustHaveId = true;
    newType = "ClassDeclaration";
  } else if (t.isFunction(node)) {
    mustHaveId = true;
    newType = "FunctionDeclaration";
  } else if (t.isAssignmentExpression(node)) {
    return t.expressionStatement(node);
  }

  if (mustHaveId && !node.id) {
    newType = false;
  }

  if (!newType) {
    if (ignore) {
      return false;
    } else {
      throw new Error(`cannot turn ${node.type} to a statement`);
    }
  }

  node.type = newType;

  return node;
}

/**
 * Description
 */

export function toExpression(node: Object): Object {
  if (t.isExpressionStatement(node)) {
    node = node.expression;
  }

  if (t.isClass(node)) {
    node.type = "ClassExpression";
  } else if (t.isFunction(node)) {
    node.type = "FunctionExpression";
  }

  if (t.isExpression(node)) {
    return node;
  } else {
    throw new Error(`cannot turn ${node.type} to an expression`);
  }
}

/**
 * Description
 */

export function toBlock(node: Object, parent: Object): Object {
  if (t.isBlockStatement(node)) {
    return node;
  }

  if (t.isEmptyStatement(node)) {
    node = [];
  }

  if (!Array.isArray(node)) {
    if (!t.isStatement(node)) {
      if (t.isFunction(parent)) {
        node = t.returnStatement(node);
      } else {
        node = t.expressionStatement(node);
      }
    }

    node = [node];
  }

  return t.blockStatement(node);
}

/**
 * Description
 */

export function valueToNode(value: any): Object {
  if (value === undefined) {
    return t.identifier("undefined");
  }

  if (value === true || value === false || value === null || isString(value) || isNumber(value) || isRegExp(value)) {
    return t.literal(value);
  }

  if (Array.isArray(value)) {
    return t.arrayExpression(value.map(t.valueToNode));
  }

  if (isPlainObject(value)) {
    var props = [];
    for (var key in value) {
      var nodeKey;
      if (t.isValidIdentifier(key)) {
        nodeKey = t.identifier(key);
      } else {
        nodeKey = t.literal(key);
      }
      props.push(t.property("init", nodeKey, t.valueToNode(value[key])));
    }
    return t.objectExpression(props);
  }

  throw new Error("don't know how to turn this value into a node");
}
