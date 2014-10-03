var traverse = require("../traverse");
var util     = require("../util");
var b        = require("ast-types").builders;
var _        = require("lodash");

var funcTypes = ["FunctionDeclaration", "FunctionExpression"];

var isLet = function (node) {
  if (node && node.type === "VariableDeclaration" && node.kind === "let") {
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
  if (hasLet(node.body)) node.body = buildNode(node.body);
};

exports.BlockStatement = function (node, parent) {
  if (!hasLet(node.body)) return;

  // ignore if we're the body of a closure already
  if (parent.type === "FunctionExpression") return;

  var body = node.body;
  node.body = buildNode(node.body, true);

  var container = _.last(node.body);
  traverse.replace(container, function (node) {
    if (node.type === "ContinueStatement") {
      return b.returnStatement(null);
    }
  }, funcTypes);

  if (traverse.hasType(body, "BreakStatement", funcTypes)) {
    var id = b.identifier("_break");

    node.body.unshift(b.variableDeclaration("var", [
      b.variableDeclarator(id, b.literal(false))
    ]));

    traverse.replace(container, function (node) {
      if (node.type === "BreakStatement") {
        return b.returnStatement(b.assignmentExpression("=", id, b.literal(true)));
      }
    }, funcTypes);

    node.body.push(b.ifStatement(id, b.breakStatement()));
  }
};

exports.ForOfStatement =
exports.ForInStatement = function (node) {
  if (isLet(node.left)) return buildNode(node);
};

exports.ForStatement = function (node) {
  if (isLet(node.init)) return buildNode(node);
};

var buildNode = function (node, isBlock) {
  var nodes = [];

  // hoist normal variable declarations

  node = [].concat(node);
  node = node.map(function (node) {
    if (node._ignoreBlockBindingHoist) return node;

    if (node.type === "VariableDeclaration" && node.kind === "var") {
      var declars = node.declarations.map(function (declar) {
        return b.variableDeclarator(declar.id, null);
      });

      nodes.push(b.variableDeclaration("var", declars));

      return node.declarations.map(function (declar) {
        return util.template("assign", {
          VALUE: declar.init,
          KEY:   declar.id
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

  var block = b.blockStatement([]);
  block.body = node;

  var func = b.functionExpression(null, [], block, false);

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
