var util = require("../util");
var t    = require("../types");

var singleArrayExpression = function (node) {
  var block = node.blocks[0];

  var templateName = "array-expression-comprehension-map";
  if (node.filter) templateName = "array-expression-comprehension-filter";

  var result = util.template(templateName, {
    STATEMENT: node.body,
    FILTER:    node.filter,
    ARRAY:     block.right,
    KEY:       block.left
  });
  result._aliasFunction = true;
  return result;
};

var multiple = function (node, file) {
  var uid = file.generateUid("arr");

  var container = util.template("array-comprehension-container", {
    KEY: uid
  });
  container._aliasFunction = true;

  var block = container.callee.body;
  var body  = block.body;

  var returnStatement = body.pop();

  var build = function () {
    var self = node.blocks.shift();
    if (!self) return;

    var child = build();
    if (!child) {
      // last item

      child = util.template("array-push", {
        STATEMENT: node.body,
        KEY:       uid
      }, true);

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

  body.push(build());
  body.push(returnStatement);

  return container;
};

exports.ComprehensionExpression = function (node, parent, file) {
  if (node.blocks.length === 1 && t.isArrayExpression(node.blocks[0].right)) {
    return singleArrayExpression(node);
  } else {
    return multiple(node, file);
  }
};
