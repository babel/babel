var traverse = require("../traverse");
var util     = require("../util");
var _        = require("lodash");

var isLet = function (node) {
  if (node.type === "VariableDeclaration" && node.kind === "let") {
    node.kind = "var";
    return true;
  }
};

var hasLet = function (nodes) {
  var has = false;

  _.each(nodes, function (node) {
    if (isLet(node)) has = true;
  });

  return has;
};

exports.Program = function (node) {
  if (hasLet(node.body)) {
    node.body = [buildNode(node.body)];
  }
};

exports.BlockStatement = function (node, parent) {
  if (!hasLet(node.body)) return;

  // ignore if we're the body of a closure already
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
