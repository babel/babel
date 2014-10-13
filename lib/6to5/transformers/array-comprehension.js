var util = require("../util");
var b    = require("recast").types.builders;
var _    = require("lodash");

var single = function (node) {
  var block = node.blocks[0];

  var templateName = "array-comprehension-map";
  if (node.filter) templateName = "array-comprehension-filter";

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
        var child = b.ifStatement(node.filter, b.blockStatement([child]));
      }
    }

    var container2 = util.template("array-comprehension-for-each", {
      ARRAY: self.right,
      KEY:   self.left
    }, true);

    // set function body
    container2.expression.arguments[0].body.body = [child];

    return container2;
  };

  body.push(build());
  body.push(returnStatement);

  return container;
};

exports.ComprehensionExpression = function (node, parent, file) {
  _.each(node.blocks, function (block) {
    if (!block.of) {
      throw util.errorWithNode(block, "for-in array comprehension is not supported");
    }
  });

  if (node.blocks.length === 1) {
    return single(node);
  } else {
    return multiple(node, file);
  }
};
