"use strict";

// Based upon the excellent jsx-transpiler by Ingvar Stepanyan (RReverser)
// https://github.com/RReverser/jsx-transpiler

// jsx

var isString = require("lodash/lang/isString");
var messages = require("../../messages");
var esutils  = require("esutils");
var react    = require("./react");
var t        = require("../../types");

module.exports = function (exports, opts) {
  exports.check = function (node) {
    if (t.isJSX(node)) return true;
    if (react.isCreateClass(node)) return true;
    return false;
  };

  exports.JSXIdentifier = function (node, parent) {
    if (node.name === "this" && t.isReferenced(node, parent)) {
      return t.thisExpression();
    } else if (esutils.keyword.isIdentifierName(node.name)) {
      node.type = "Identifier";
    } else {
      return t.literal(node.name);
    }
  };

  exports.JSXNamespacedName = function (node, parent, scope, file) {
    throw file.errorWithNode(node, messages.get("JSXNamespacedTags"));
  };

  exports.JSXMemberExpression = {
    exit: function (node) {
      node.computed = t.isLiteral(node.property);
      node.type = "MemberExpression";
    }
  };

  exports.JSXExpressionContainer = function (node) {
    return node.expression;
  };

  exports.JSXAttribute = {
    exit: function (node) {
      var value = node.value || t.literal(true);

      if (t.isLiteral(value) && isString(value.value)) {
        value.value = value.value.replace(/\n\s+/g, " ");
      }

      return t.inherits(t.property("init", node.name, value), node);
    }
  };
  exports.JSXOpeningElement = {
    exit: function (node, parent, scope, file) {
      var tagExpr = node.name;
      var args = [];

      var tagName;
      if (t.isIdentifier(tagExpr)) {
        tagName = tagExpr.name;
      } else if (t.isLiteral(tagExpr)) {
        tagName = tagExpr.value;
      }

      var state = {
        tagExpr: tagExpr,
        tagName: tagName,
        args:    args
      };

      if (opts.pre) {
        opts.pre(state);
      }

      var attribs = node.attributes;
      if (attribs.length) {
        attribs = buildJSXOpeningElementAttributes(attribs, file);
      } else {
        attribs = t.literal(null);
      }

      args.push(attribs);

      if (opts.post) {
        opts.post(state);
      }

      return state.call || t.callExpression(state.callee, args);
    }
  };

  /**
   * The logic for this is quite terse. It's because we need to
   * support spread elements. We loop over all attributes,
   * breaking on spreads, we then push a new object containg
   * all prior attributes to an array for later processing.
   */

  var buildJSXOpeningElementAttributes = function (attribs, file) {
    var _props = [];
    var objs = [];

    var pushProps = function () {
      if (!_props.length) return;

      objs.push(t.objectExpression(_props));
      _props = [];
    };

    while (attribs.length) {
      var prop = attribs.shift();
      if (t.isJSXSpreadAttribute(prop)) {
        pushProps();
        objs.push(prop.argument);
      } else {
        _props.push(prop);
      }
    }

    pushProps();

    if (objs.length === 1) {
      // only one object
      attribs = objs[0];
    } else {
      // looks like we have multiple objects
      if (!t.isObjectExpression(objs[0])) {
        objs.unshift(t.objectExpression([]));
      }

      // spread it
      attribs = t.callExpression(
        file.addHelper("extends"),
        objs
      );
    }

    return attribs;
  };

  exports.JSXElement = {
    exit: function (node) {
      var callExpr = node.openingElement;

      for (var i = 0; i < node.children.length; i++) {
        var child = node.children[i];

        if (t.isLiteral(child) && typeof child.value === "string") {
          cleanJSXElementLiteralChild(child, callExpr.arguments);
          continue;
        } else if (t.isJSXEmptyExpression(child)) {
          continue;
        }

        callExpr.arguments.push(child);
      }

      callExpr.arguments = flatten(callExpr.arguments);

      if (callExpr.arguments.length >= 3) {
        callExpr._prettyCall = true;
      }

      return t.inherits(callExpr, node);
    }
  };

  var isStringLiteral = function (node) {
    return t.isLiteral(node) && isString(node.value);
  };

  var flatten = function (args) {
    var flattened = [];
    var last;

    for (var i = 0; i < args.length; i++) {
      var arg = args[i];
      if (isStringLiteral(arg) && isStringLiteral(last)) {
        last.value += arg.value;
      } else {
        last = arg;
        flattened.push(arg);
      }
    }

    return flattened;
  };

  var cleanJSXElementLiteralChild = function (child, args) {
    var lines = child.value.split(/\r\n|\n|\r/);

    var lastNonEmptyLine = 0;
    var i;

    for (i = 0; i < lines.length; i++) {
      if (lines[i].match(/[^ \t]/)) {
        lastNonEmptyLine = i;
      }
    }

    for (i = 0; i < lines.length; i++) {
      var line = lines[i];

      var isFirstLine = i === 0;
      var isLastLine = i === lines.length - 1;
      var isLastNonEmptyLine = i === lastNonEmptyLine;

      // replace rendered whitespace tabs with spaces
      var trimmedLine = line.replace(/\t/g, " ");

      // trim whitespace touching a newline
      if (!isFirstLine) {
        trimmedLine = trimmedLine.replace(/^[ ]+/, "");
      }

      // trim whitespace touching an endline
      if (!isLastLine) {
        trimmedLine = trimmedLine.replace(/[ ]+$/, "");
      }

      if (trimmedLine) {
        if (!isLastNonEmptyLine) {
          trimmedLine += " ";
        }

        args.push(t.literal(trimmedLine));
      }
    }
  };

  // display names

  var addDisplayName = function (id, call) {
    var props = call.arguments[0].properties;
    var safe = true;

    for (var i = 0; i < props.length; i++) {
      var prop = props[i];
      if (t.isIdentifier(prop.key, { name: "displayName" })) {
        safe = false;
        break;
      }
    }

    if (safe) {
      props.unshift(t.property("init", t.identifier("displayName"), t.literal(id)));
    }
  };

  exports.ExportDeclaration = function (node, parent, scope, file) {
    if (node.default && react.isCreateClass(node.declaration)) {
      addDisplayName(file.opts.basename, node.declaration);
    }
  };

  exports.AssignmentExpression =
  exports.Property =
  exports.VariableDeclarator = function (node) {
    var left, right;

    if (t.isAssignmentExpression(node)) {
      left = node.left;
      right = node.right;
    } else if (t.isProperty(node)) {
      left = node.key;
      right = node.value;
    } else if (t.isVariableDeclarator(node)) {
      left = node.id;
      right = node.init;
    }

    if (t.isMemberExpression(left)) {
      left = left.property;
    }

    if (t.isIdentifier(left) && react.isCreateClass(right)) {
      addDisplayName(left.name, right);
    }
  };
};
