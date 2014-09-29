var traverse = require("../traverse");
var util     = require("../util");
var _        = require("lodash");

var isLet = function (node) {
  if (node.type === "VariableDeclaration" && node.kind === "let") {
    node.kind = "var";
    node._ignoreBlockBindingHoist = true;
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
    node.body = buildNode(node.body);
  }
};

exports.BlockStatement = function (node, parent) {
  if (!hasLet(node.body)) return;

  // ignore if we're the body of a closure already
  if (parent.type === "FunctionExpression") return;

  node.body = buildNode(node.body);
};

exports.ForOfStatement =
exports.ForInStatement = function (node) {
  if (isLet(node.left)) return buildNode(node);
};

exports.ForStatement = function (node) {
  if (isLet(node.init)) return buildNode(node);
};

var buildNode = function (node) {
  var nodes = [];

  // hoist normal variable declarations

  node = [].concat(node);
  node = node.map(function (node) {
    if (node._ignoreBlockBindingHoist) return node;

    if (node.type === "VariableDeclaration" && node.kind === "var") {
      _.each(node.declarations, function (declar) {
        nodes.push(util.template("variable-declare", {
          KEY: declar.id
        }));
      });

      return node.declarations.map(function (declar) {
        return util.template("assign", {
          KEY: declar.id,
          VALUE: declar.init
        }, true);
      });
    } else if (node.type === "ForInStatement" && !node.left._ignoreBlockBindingHoist) {
      var id = node.left.declarations[0].id;
      node.left = id;
      nodes.push(util.template("variable-declare", {
        KEY: id
      }));
    }

    return node;
  });

  //

  var func = {
    type: "FunctionExpression",
    params: [],
    defaults: [],
    body: {
      type: "BlockStatement",
      body: node
    }
  };

  var templateName = "function-call";
  if (traverse.hasType(node, "ThisExpression")) {
    templateName = "function-call-this";
  }

  //

  nodes.push(util.template(templateName, {
    FUNCTION: func
  }, true));

  return nodes;
};
