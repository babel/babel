var traverse = require("../traverse");
var util     = require("../util");
var b        = require("ast-types").builders;
var _        = require("lodash");

var blockTypes = traverse.FUNCTION_TYPES.concat(["BlockStatement"]);

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

exports.Program = function (node, parent, opts, generateUid) {
   if (hasLet(node.body)) node.body = buildNode(node.body, generateUid).node;
};

exports.BlockStatement = function (node, parent, opts, generateUid) {
  if (!hasLet(node.body)) return;

  // ignore if we're the body of a closure already
  if (_.contains(traverse.FUNCTION_TYPES, parent.type)) return;

  var body = node.body;

  var built = buildNode(node.body, generateUid);
  node.body = built.node;

  traverse(built.body, function (node) {
    if (node.type === "ContinueStatement") {
      return b.returnStatement(null);
    }
  }, blockTypes);

  if (traverse.hasType(body, "BreakStatement", blockTypes)) {
    var id = b.identifier(generateUid("break"));

    node.body.unshift(b.variableDeclaration("var", [
      b.variableDeclarator(id, b.literal(false))
    ]));

    traverse(built.body, function (node) {
      if (node.type === "BreakStatement") {
        return b.returnStatement(b.assignmentExpression("=", id, b.literal(true)));
      }
    }, blockTypes);

    node.body.push(b.ifStatement(id, b.breakStatement()));
  }
};

var buildForStatement = function (key) {
  return function (node, parent, opts, generateUid) {
    if (isLet(node[key])) {
      if (parent.type === "LabeledStatement") {
        throw util.errorWithNode(parent, "Label statements not supported with block binding yet.");
      }

      return buildNode(node, generateUid).node;
    }
  };
};

exports.ForOfStatement = exports.ForInStatement = buildForStatement("left");
exports.ForStatement = buildForStatement("init");

var buildNode = function (node, generateUid) {
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

      return _.compact(node.declarations.map(function (declar) {
        if (!declar.init) return;

        return util.template("assign", {
          VALUE: declar.init,
          KEY:   declar.id
        }, true);
      }));
    } else if (node.type === "ForInStatement" && node.left.type === "VariableDeclaration" && !node.left._ignoreBlockBindingHoist) {
      var id = node.left.declarations[0].id;
      node.left = id;
      nodes.push(util.template("variable-declare", {
        KEY: id
      }));
    }

    return node;
  });

  //

  var argumentsId = util.aliasArguments(generateUid, node);

  if (argumentsId) {
    nodes.push(b.variableDeclaration("var", [
      b.variableDeclarator(argumentsId, b.identifier("arguments"))
    ]));
  }

  //

  var block = b.blockStatement([]);
  block.body = node;

  var func = b.functionExpression(null, [], block, false);

  //

  var templateName = "function-call";
  if (traverse.hasType(node, "ThisExpression")) templateName += "-this";
  if (traverse.hasType(node, "ReturnStatement", traverse.FUNCTION_TYPES)) templateName += "-return";

  nodes.push(util.template(templateName, {
    FUNCTION: func
  }, true));

  return {
    node: nodes,
    body: block
  };
};
