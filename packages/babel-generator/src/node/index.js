import whitespace from "./whitespace";
import * as parens from "./parentheses";
import each from "lodash/collection/each";
import some from "lodash/collection/some";
import * as t from "babel-types";

function find(obj, node, parent) {
  if (!obj) return;
  let result;

  let types = Object.keys(obj);
  for (let i = 0; i < types.length; i++) {
    let type = types[i];

    if (t.is(type, node)) {
      let fn = obj[type];
      result = fn(node, parent);
      if (result != null) break;
    }
  }

  return result;
}

export default class Node {
  constructor(node: Object, parent: Object) {
    this.parent = parent;
    this.node   = node;
  }

  parent: Object;
  node: Object;

  static isUserWhitespacable(node) {
    return t.isUserWhitespacable(node);
  }

  static needsWhitespace(node, parent, type) {
    if (!node) return 0;

    if (t.isExpressionStatement(node)) {
      node = node.expression;
    }

    let linesInfo = find(whitespace.nodes, node, parent);

    if (!linesInfo) {
      let items = find(whitespace.list, node, parent);
      if (items) {
        for (let i = 0; i < items.length; i++) {
          linesInfo = Node.needsWhitespace(items[i], node, type);
          if (linesInfo) break;
        }
      }
    }

    return (linesInfo && linesInfo[type]) || 0;
  }

  static needsWhitespaceBefore(node, parent) {
    return Node.needsWhitespace(node, parent, "before");
  }

  static needsWhitespaceAfter(node, parent) {
    return Node.needsWhitespace(node, parent, "after");
  }

  static needsParens(node, parent) {
    if (!parent) return false;

    if (t.isNewExpression(parent) && parent.callee === node) {
      if (t.isCallExpression(node)) return true;

      let hasCall = some(node, function (val) {
        return t.isCallExpression(val);
      });
      if (hasCall) return true;
    }

    return find(parens, node, parent);
  }
}

each(Node, function (fn, key) {
  Node.prototype[key] = function () {
    // Avoid leaking arguments to prevent deoptimization
    let args = new Array(arguments.length + 2);

    args[0] = this.node;
    args[1] = this.parent;

    for (let i = 0; i < args.length; i++) {
      args[i + 2] = arguments[i];
    }

    return Node[key].apply(null, args);
  };
});
