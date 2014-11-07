// Based upon the excellent jsx-transpiler by Ingvar Stepanyan (RReverser)
// https://github.com/RReverser/jsx-transpiler

var esutils = require("esutils");
var t       = require("../../types");
var _       = require("lodash");

var JSX_ANNOTATION_REGEX = /^\*\s*@jsx\s+([^\s]+)/;

exports.Program = function (node, parent, file) {
  var jsx = "React.DOM";

  // looking for namespace annotation
  _.each(node.leadingComments, function (comment) {
    var matches = JSX_ANNOTATION_REGEX.exec(comment.value);
    if (matches) jsx = matches[1];
  });

  // prebuilding AST node
  file.jsx = jsx.split(".").map(t.identifier).reduce(function (object, property) {
    return t.memberExpression(object, property);
  });
};

exports.XJSIdentifier = function (node) {
  if (esutils.keyword.isIdentifierName(node.name)) {
    node.type = "Identifier";
  } else {
    return t.literal(node.name);
  }
};

exports.XJSNamespacedName = function () {
  throw new Error("Namespace tags are not supported. ReactJSX is not XML.");
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
  exit: function (node, parent, file) {
    var tagExpr = node.name;

    if (t.isIdentifier(tagExpr)) {
      var tagName = tagExpr.name;

      if (/[a-z]/.exec(tagName[0]) || _.contains(tagName, "-")) {
        tagExpr = t.memberExpression(file.jsx, tagExpr);
      }
    }

    var props = node.attributes;
    if (props.length) {
      props = t.objectExpression(props);
    } else {
      props = t.literal(null);
    }

    return t.callExpression(tagExpr, [props]);
  }
};

exports.XJSElement = {
  exit: function (node) {
    var callExpr = node.openingElement;
    var children = node.children;

    _.each(children, function (child) {
      callExpr.arguments.push(child);
    });

    return t.inherits(callExpr, node);
  }
};
