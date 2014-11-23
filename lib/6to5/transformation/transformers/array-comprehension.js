var util = require("../../util");
var t    = require("../../types");
var _    = require("lodash");

var single = function (node, file) {
  var block = node.blocks[0];

  var templateName = "array-expression-comprehension-map";
  if (node.filter) templateName = "array-expression-comprehension-filter";

  var result = util.template(templateName, {
    STATEMENT: node.body,
    FILTER:    node.filter,
    ARRAY:     file.toArray(block.right),
    KEY:       block.left
  });

  _.each([result.callee.object, result], function (call) {
    if (t.isCallExpression(call)) {
      call.arguments[0]._aliasFunction = true;
    }
  });

  return result;
};

var multiple = function (node, file) {
  var uid = file.generateUidIdentifier("arr");

  var container = util.template("array-comprehension-container", {
    KEY: uid
  });
  container.callee.expression._aliasFunction = true;

  var block = container.callee.expression.body;
  var body  = block.body;

  var returnStatement = body.pop();

  body.push(exports._build(node, function () {
    return util.template("array-push", {
      STATEMENT: node.body,
      KEY:       uid
    }, true);
  }));
  body.push(returnStatement);

  return container;
};

exports._build = function (node, buildBody) {
  var self = node.blocks.shift();
  if (!self) return;

  var child = exports._build(node, buildBody);
  if (!child) {
    // last item
    child = buildBody();

    // add a filter as this is our final stop
    if (node.filter) {
      child = t.ifStatement(node.filter, t.blockStatement([child]));
    }
  }

  return t.forOfStatement(
    t.variableDeclaration("var", [t.variableDeclarator(self.left)]),
    self.right,
    t.blockStatement([child])
  );
};

exports.ComprehensionExpression = function (node, parent, file) {
  if (node.generator) return;

  if (node.blocks.length === 1) {
    return single(node, file);
  } else {
    return multiple(node, file);
  }
};
