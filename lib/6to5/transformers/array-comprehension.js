var util = require("../util");

exports.ComprehensionExpression = function (node, parent, opts, generateUid) {
  var uid = generateUid("arr");

  var container = util.template("array-comprehension-container", {
    KEY: uid
  });

  var block = container.callee.body;
  var body  = block.body;

  var returnStatement = body.pop();

  var build = function () {
    var self = node.blocks.shift();
    if (!self) return;

    if (!self.of) {
      throw util.errorWithNode(self, "for-in array comprehension is not supported");
    }

    var child = build();
    if (!child) {
      // last item

      child = util.template("array-push", {
        KEY: uid,
        STATEMENT: node.body
      }, true);

      if (node.filter) {
        var filter = util.template("if", {
          STATEMENT: node.filter
        });
        filter.consequent.body = [child];
        child = filter;
      }
    }

    var container2 = util.template("array-comprehension-for-each", {
      OBJECT: self.right,
      KEY: self.left,
    }, true);

    container2.expression.arguments[0].body.body = [child];

    return container2;
  };

  body.push(build());
  body.push(returnStatement);

  return container;
};
