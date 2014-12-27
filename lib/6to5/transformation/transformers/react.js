// Based upon the excellent jsx-transpiler by Ingvar Stepanyan (RReverser)
// https://github.com/RReverser/jsx-transpiler

// jsx

var esutils = require("esutils");
var t       = require("../../types");

exports.XJSIdentifier = function (node) {
  if (esutils.keyword.isIdentifierName(node.name)) {
    node.type = "Identifier";
  } else {
    return t.literal(node.name);
  }
};

exports.XJSNamespacedName = function (node, parent, file) {
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
    return t.property("init", node.name, value);
  }
};

exports.XJSOpeningElement = {
  exit: function (node) {
    var tagExpr = node.name;
    var args = [];

    var tagName;
    if (t.isIdentifier(tagExpr)) {
      tagName = tagExpr.name;
    } else if (t.isLiteral(tagExpr)) {
      tagName = tagExpr.value;
    }

    if (tagName && (/[a-z]/.exec(tagName[0]) || tagName.indexOf("-") >= 0)) {
      args.push(t.literal(tagName));
    } else {
      args.push(tagExpr);
    }

    var props = node.attributes;
    if (props.length) {
      var _props = [];
      var objs = [];

      var pushProps = function () {
        if (!_props.length) return;

        objs.push(t.objectExpression(_props));
        _props = [];
      };

      while (props.length) {
        var prop = props.shift();
        if (t.isXJSSpreadAttribute(prop)) {
          pushProps();
          objs.push(prop.argument);
        } else {
          _props.push(prop);
        }
      }

      pushProps();

      if (objs.length === 1) {
        props = objs[0];
      } else {
        if (!t.isObjectExpression(objs[0])) {
          objs.unshift(t.objectExpression([]));
        }

        props = t.callExpression(
          t.memberExpression(t.identifier("React"), t.identifier("__spread")),
          objs
        );
      }
    } else {
      props = t.literal(null);
    }

    args.push(props);

    tagExpr = t.memberExpression(t.identifier("React"), t.identifier("createElement"));
    return t.callExpression(tagExpr, args);
  }
};

exports.XJSElement = {
  exit: function (node) {
    var callExpr = node.openingElement;
    var i;

    for (i in node.children) {
      var child = node.children[i];

      if (t.isLiteral(child)) {
        var lines = child.value.split(/\r\n|\n|\r/);

        for (i in lines) {
          var line = lines[i];

          var isFirstLine = i == 0;
          var isLastLine = i == lines.length - 1;

          // replace rendered whitespace tabs with spaces
          var trimmedLine = line.replace(/\t/g, ' ');

          // trim whitespace touching a newline
          if (!isFirstLine) {
            trimmedLine = trimmedLine.replace(/^[ ]+/, '');
          }

          // trim whitespace touching an endline
          if (!isLastLine) {
            trimmedLine = trimmedLine.replace(/[ ]+$/, '');
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

  for (var i in props) {
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
