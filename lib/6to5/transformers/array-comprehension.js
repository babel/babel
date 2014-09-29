var util = require("../util");
var _    = require("lodash");

exports.ComprehensionExpression = function (node, parent, opts, generateUid) {
  var blocks = node.blocks;

  _.each(blocks, function (block) {
    if (!block.of) {
      throw util.errorWithNode(block, "for-in array comprehension is not supported");
    }
  });

  if (blocks.length === 1) {
    var block = blocks[0];

    var templateName = "array-comprehension-map";
    if (node.filter) templateName += "-filter";

    return util.template(templateName, {
      ARRAY: block.right,
      KEY: block.left,
      FILTER: node.filter,
      STATEMENT: node.body
    });
  }

  var uid = generateUid("arr");

  var container = util.template("array-comprehension-container", {
    KEY: uid
  });

  var block = container.callee.body;
  var body  = block.body;

  var returnStatement = body.pop();

  var build = function () {
    var self = blocks.shift();
    if (!self) return;

    var child = build();
    if (!child) {
      // last item

      child = util.template("array-push", {
        KEY: uid,
        STATEMENT: node.body
      }, true);

      // add a filter as this is our final stop
      if (node.filter) {
        var filter = util.template("if", {
          STATEMENT: node.filter
        });
        filter.consequent.body = [child];
        child = filter;
      }
    }

    var container2 = util.template("array-comprehension-for-each", {
      ARRAY: self.right,
      KEY: self.left
    }, true);
    container2.expression.arguments[0].body.body = [child];
    return container2;
  };

  body.push(build());
  body.push(returnStatement);

  return container;
};
