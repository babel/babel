/* eslint no-unused-vars: 0 */

import * as t from "../../../types";

export var metadata = {
  group: "builtin-pre"
};

/**
 * [Please add a description.]
 */

function isString(node) {
  return t.isLiteral(node) && typeof node.value === "string";
}

/**
 * [Please add a description.]
 */

function buildBinaryExpression(left, right) {
  var node = t.binaryExpression("+", left, right);
  node._templateLiteralProduced = true;
  return node;
}

/**
 * [Please add a description.]
 */

function crawl(path) {
  if (path.is("_templateLiteralProduced")) {
    crawl(path.get("left"));
    crawl(path.get("right"));
  } else if (!path.isBaseType("string") && !path.isBaseType("number")) {
    path.replaceWith(t.callExpression(t.identifier("String"), [path.node]));
  }
}

/**
 * [Please add a description.]
 */

export var visitor = {

  /**
   * [Please add a description.]
   */

  TaggedTemplateExpression(node, parent, scope, file) {
    var quasi = node.quasi;
    var args  = [];

    var strings = [];
    var raw     = [];

    for (var elem of (quasi.quasis: Array)) {
      strings.push(t.literal(elem.value.cooked));
      raw.push(t.literal(elem.value.raw));
    }

    strings = t.arrayExpression(strings);
    raw = t.arrayExpression(raw);

    var templateName = "tagged-template-literal";
    if (file.isLoose("es6.templateLiterals")) templateName += "-loose";

    var templateObject = file.addTemplateObject(templateName, strings, raw);
    args.push(templateObject);

    args = args.concat(quasi.expressions);

    return t.callExpression(node.tag, args);
  },

  /**
   * [Please add a description.]
   */

  TemplateLiteral(node, parent, scope, file) {
    var nodes = [];

    for (let elem of (node.quasis: Array)) {
      nodes.push(t.literal(elem.value.cooked));

      var expr = node.expressions.shift();
      if (expr) nodes.push(expr);
    }

    // filter out empty string literals
    nodes = nodes.filter(n => !t.isLiteral(n, { value: "" }));

    // since `+` is left-to-right associative
    // ensure the first node is a string if first/second isn't
    if (!isString(nodes[0]) && !isString(nodes[1])) {
      nodes.unshift(t.literal(""));
    }

    if (nodes.length > 1) {
      var root = buildBinaryExpression(nodes.shift(), nodes.shift());

      for (let node of (nodes: Array)) {
        root = buildBinaryExpression(root, node);
      }

      this.replaceWith(root);
      //crawl(this);
    } else {
      return nodes[0];
    }
  }
};
