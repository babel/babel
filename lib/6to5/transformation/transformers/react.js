// Based upon the excellent jsx-transpiler by Ingvar Stepanyan (RReverser)
// https://github.com/RReverser/jsx-transpiler

// jsx

var esutils = require("esutils");
var t       = require("../../types");
var _       = require("lodash");

exports.XJSIdentifier = function (node) {
  if (esutils.keyword.isIdentifierName(node.name)) {
    node.type = "Identifier";
  } else {
    return t.literal(node.name);
  }
};

exports.XJSNamespacedName = function (node, parent, scope, context, file) {
  throw file.errorWithNode(node, "Namespace tags are not supported. ReactJSX is not XML.");
};

exports.XJSMemberExpression = {
  exit: function (node) {
    node.computed = t.isLiteral(node.property);
    node.type = "MemberExpression";
  }
};

exports.XJSExpressionContainer = function (node) {
  return node.expression;
};

exports.XJSAttribute = {
  exit: function (node) {
    var value = node.value || t.literal(true);
    return t.inherits(t.property("init", node.name, value), node);
  }
};

var isTag = function(tagName) {
  return (/^[a-z]|\-/).test(tagName);
};

exports.XJSOpeningElement = {
  exit: function (node, parent, scope, context, file) {
    var reactCompat = file.opts.reactCompat;
    var tagExpr = node.name;
    var args = [];

    var tagName;
    if (t.isIdentifier(tagExpr)) {
      tagName = tagExpr.name;
    } else if (t.isLiteral(tagExpr)) {
      tagName = tagExpr.value;
    }

    if (!reactCompat) {
      if (tagName && isTag(tagName)) {
        args.push(t.literal(tagName));
      } else {
        args.push(tagExpr);
      }
    }

    var attribs = node.attributes;
    if (attribs.length) {
      var _props = [];
      var objs = [];

      // so basically in order to support spread elements we
      // loop over all the attributes, breaking on spreads
      // we then push a new object containing all prior attributes
      // to an array for later processing

      var pushProps = function () {
        if (!_props.length) return;

        objs.push(t.objectExpression(_props));
        _props = [];
      };

      while (attribs.length) {
        var prop = attribs.shift();
        if (t.isXJSSpreadAttribute(prop)) {
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
          t.memberExpression(t.identifier("React"), t.identifier("__spread")),
          objs
        );
      }
    } else {
      attribs = t.literal(null);
    }

    args.push(attribs);

    if (reactCompat) {
      if (tagName && isTag(tagName)) {
        return t.callExpression(
          t.memberExpression(
            t.memberExpression(t.identifier("React"), t.identifier("DOM")),
            tagExpr,
            t.isLiteral(tagExpr)
          ),
          args
        );
      }
    } else {
      tagExpr = t.memberExpression(t.identifier("React"), t.identifier("createElement"));
    }

    return t.callExpression(tagExpr, args);
  }
};

exports.XJSElement = {
  exit: function (node) {
    var callExpr = node.openingElement;

    for (var i = 0; i < node.children.length; i++) {
      var child = node.children[i];

      if (t.isLiteral(child) && _.isString(child.value)) {
        var lines = child.value.split(/\r\n|\n|\r/);

        for (var i2 = 0; i2 < lines.length; i2++) {
          var line = lines[i2];

          var isFirstLine = i2 === 0;
          var isLastLine = i2 === lines.length - 1;

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
            callExpr.arguments.push(t.literal(trimmedLine));
          }
        }

        continue;
      } else if (t.isXJSEmptyExpression(child)) {
        continue;
      }

      callExpr.arguments.push(child);
    }

    if (callExpr.arguments.length >= 3) {
      callExpr._prettyCall = true;
    }

    return t.inherits(callExpr, node);
  }
};

// display names

var addDisplayName = function (id, call) {
  if (!call || !t.isCallExpression(call)) return;

  var callee = call.callee;
  if (!t.isMemberExpression(callee)) return;

  // not React
  var obj = callee.object;
  if (!t.isIdentifier(obj, { name: "React" })) return;

  // not createClass
  var prop = callee.property;
  if (!t.isIdentifier(prop, { name: "createClass" })) return;

  // no arguments
  var args = call.arguments;
  if (args.length !== 1) return;

  // not an object
  var first = args[0];
  if (!t.isObjectExpression(first)) return;

  var props = first.properties;
  var safe = true;

  for (var i = 0; i < props.length; i++) {
    prop = props[i];
    if (t.isIdentifier(prop.key, { name: "displayName" })) {
      safe = false;
      break;
    }
  }

  if (safe) {
    props.unshift(t.property("init", t.identifier("displayName"), t.literal(id)));
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

  if (t.isIdentifier(left)) {
    addDisplayName(left.name, right);
  }
};
