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

    if (tagName && (/[a-z]/.exec(tagName[0]) || _.contains(tagName, "-"))) {
      args.push(t.literal(tagName));
    } else {
      args.push(tagExpr);
    }

    var props = node.attributes;
    if (props.length) {
      var first = props[0];
      if (t.isXJSSpreadAttribute(first)) {
        props.shift();
        props = t.callExpression(
          t.memberExpression(t.identifier("React"), t.identifier("__spread")),
          [t.objectExpression([]), first.argument, t.objectExpression(props)]
        );
      } else {
        props = t.objectExpression(props);
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

    var childrenToRender = node.children.filter(function(child) {
      return !(t.isLiteral(child) && _.isString(child.value) && child.value.match(/^[ \t]*[\r\n][ \t\r\n]*$/));
    });

    _.each(childrenToRender, function (child) {
      callExpr.arguments.push(child);
    });

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

  _.each(props, function (prop) {
    if (t.isIdentifier(prop.key, { name: "displayName" })) {
      return safe = false;
    }
  });

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
