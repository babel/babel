var traverse = require("../../traverse");
var util     = require("../../util");
var t        = require("../../types");

exports.experimental = true;

var build = function (node, parent, file, scope) {
  var uid = scope.generateUidBasedOnNode(parent, file);

  var container = util.template("array-comprehension-container", {
    KEY: uid
  });
  container.callee._aliasFunction = true;

  var block = container.callee.body;
  var body  = block.body;

  if (traverse.hasType(node, "YieldExpression", t.FUNCTION_TYPES)) {
    container.callee.generator = true;
    container = t.yieldExpression(container, true);
  }

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
    t.variableDeclaration("let", [t.variableDeclarator(self.left)]),
    self.right,
    t.blockStatement([child])
  );
};

exports.ComprehensionExpression = function (node, parent, file, scope) {
  if (node.generator) return;

  return build(node, parent, file, scope);
};
