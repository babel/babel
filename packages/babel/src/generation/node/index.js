import whitespace from "./whitespace";
import * as parens from "./parentheses";
import each from "lodash/collection/each";
import some from "lodash/collection/some";
import * as t from "../../types";

/**
 * Test if node matches a set of type-matcher pairs.
 * @example
 * find({
 *   VariableDeclaration(node, parent) {
 *     return true;
 *   }
 * }, node, parent);
 */

var find = function (obj, node, parent) {
  if (!obj) return;
  var result;

  var types = Object.keys(obj);
  for (var i = 0; i < types.length; i++) {
    var type = types[i];

    if (t.is(type, node)) {
      var fn = obj[type];
      result = fn(node, parent);
      if (result != null) break;
    }
  }

  return result;
};

/**
 * Whitespace and Parenthesis related methods for nodes.
 */

export default class Node {
  constructor(node, parent) {
    this.parent = parent;
    this.node   = node;
  }

  /**
   * Test if `node` can have whitespace set by the user.
   */

  static isUserWhitespacable(node) {
    return t.isUserWhitespacable(node);
  }

  /**
   * Test if a `node` requires whitespace.
   */

  static needsWhitespace(node, parent, type) {
    if (!node) return 0;

    if (t.isExpressionStatement(node)) {
      node = node.expression;
    }

    var linesInfo = find(whitespace.nodes, node, parent);

    if (!linesInfo) {
      var items = find(whitespace.list, node, parent);
      if (items) {
        for (var i = 0; i < items.length; i++) {
          linesInfo = Node.needsWhitespace(items[i], node, type);
          if (linesInfo) break;
        }
      }
    }

    return (linesInfo && linesInfo[type]) || 0;
  }

  /**
   * Test if a `node` requires whitespace before it.
   */

  static needsWhitespaceBefore(node, parent) {
    return Node.needsWhitespace(node, parent, "before");
  }

  /**
   * Test if a `note` requires whitespace after it.
   */

  static needsWhitespaceAfter(node, parent) {
    return Node.needsWhitespace(node, parent, "after");
  }

  /**
   * Test if a `node` needs parentheses around it.
   */

  static needsParens(node, parent) {
    if (!parent) return false;

    if (t.isNewExpression(parent) && parent.callee === node) {
      if (t.isCallExpression(node)) return true;

      var hasCall = some(node, function (val) {
        return t.isCallExpression(val);
      });
      if (hasCall) return true;
    }

    return find(parens, node, parent);
  }
}

/**
 * Add all static methods from `Node` to `Node.prototype`.
 */

each(Node, function (fn, key) {
  Node.prototype[key] = function () {
    // Avoid leaking arguments to prevent deoptimization
    var args = new Array(arguments.length + 2);

    args[0] = this.node;
    args[1] = this.parent;

    for (var i = 0; i < args.length; i++) {
      args[i + 2] = arguments[i];
    }

    return Node[key].apply(null, args);
  };
});
