var traverse = require("../../traverse");
var util     = require("../../util");
var t        = require("../../types");

exports.Property =
exports.MethodDefinition = function (node, parent, file, scope) {
  if (node.kind !== "memo") return;
  node.kind = "get";

  var value = node.value;
  t.ensureBlock(value);

  var body  = value.body.body;
  var key   = node.key;

  if (t.isIdentifier(key) && !node.computed) {
    key = t.literal(key.name);
  }

  traverse(value, {
    enter: function (node) {
      if (t.isFunction(node)) return;

      if (t.isReturnStatement(node) && node.argument) {
        node.argument = t.memberExpression(util.template("object-getter-memoization", {
          KEY: key,
          VALUE: node.argument
        }), key, true);
      }
    }
  });
};
