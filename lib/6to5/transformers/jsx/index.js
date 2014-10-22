// Based upon the excellent jsx-transpiler by Ingvar Stepanyan (RReverser)
// https://github.com/RReverser/jsx-transpiler

var esutils = require("esutils");
var b       = require("acorn-ast-types").builders;
var _       = require("lodash");

var JSX_ANNOTATION_REGEX = /^\*\s*@jsx\s+([^\s]+)/;
var KNOWN_TAGS           = require("./known-tags");

exports.Program = function (node, parent, file) {
  var jsx = "React.DOM";

  // looking for namespace annotation
  _.each(node.comments, function (comment) {
    if (!comment.possiblyLeading) return;

    var matches = JSX_ANNOTATION_REGEX.exec(comment.value);
    if (matches) jsx = matches[1];
  });

  // prebuilding AST node
  file.jsx = jsx.split(".").map(b.identifier).reduce(function (object, property) {
    return b.memberExpression(object, property, false);
  });
};

exports.XJSIdentifier = function (node) {
  if (esutils.keyword.isIdentifierName(node.name)) {
    node.type = "Identifier";
  } else {
    return b.literal(node.name);
  }
};

exports.XJSNamespacedName = function () {
  throw new Error("Namespace tags are not supported. ReactJSX is not XML.");
};

exports.XJSMemberExpression = {
  exit: function (node) {
    node.computed = node.property.type === "Literal";
    node.type = "MemberExpression";
  }
};

exports.XJSEmptyExpression = function (node) {
  node.value = null;
  node.type = "Literal";
};

exports.XJSExpressionContainer = function (node) {
  return node.expression;
};

exports.XJSAttribute = {
  exit: function (node) {
    var value = node.value || b.literal(true);
    var propNode = b.property("init", node.name, value);
    propNode.loc = node.loc;
    return propNode;
  }
};

exports.XJSOpeningElement = {
  exit: function (node, parent, file) {
    var tagExpr = node.name;

    if (_.contains(KNOWN_TAGS, tagExpr.name)) {
      tagExpr = b.memberExpression(file.jsx, tagExpr, false);
    }

    var props = node.attributes;
    if (props.length) {
      props = b.objectExpression(props);
    } else {
      props = b.literal(null);
    }

    return b.callExpression(tagExpr, [props]);
  }
};

exports.XJSElement = {
  exit: function (node) {
    var callExpr = node.openingElement;
    var children = node.children;
    var args     = callExpr.arguments;

    _.each(children, function (child) {
      delete child.raw;
      callExpr.arguments.push(child);
    });

    callExpr.loc = node.loc;
    return callExpr;
  }
};
