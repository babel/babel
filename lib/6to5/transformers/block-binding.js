var traverse = require("../traverse");
var util     = require("../util");
var _        = require("lodash");

var isLet = function (node) {
  if (node.type === "VariableDeclaration" && node.kind === "let") {
    node.kind = "var";
    return true;
  }
};

exports.Program = function (node) {
  _.each(node.body, isLet);
};

exports.BlockStatement = function (node, parent) {
  var hasLet = false;

  _.each(node.body, function (bodyNode) {
    if (isLet(bodyNode)) hasLet = true;
  });

  if (!hasLet) return;

  // ignore if we're direct children of a closure already
  if (parent.type === "FunctionExpression") return;

  node.body = [buildNode(node.body)];
};

exports.ForInStatement = function (node) {
  if (isLet(node.left)) return buildNode(node);
};

exports.ForStatement = function (node) {
  if (isLet(node.init)) return buildNode(node);
};

var buildNode = function (node) {
  var func = {
    type: "FunctionExpression",
    params: [],
    defaults: [],
    body: {
      type: "BlockStatement",
      body: [].concat(node)
    }
  };

  var templateName = "function-call";
  if (traverse.hasType(node, "ThisExpression")) {
    templateName = "function-call-this";
  }

  return util.template(templateName, {
    FUNCTION: func
  }, true);
};
