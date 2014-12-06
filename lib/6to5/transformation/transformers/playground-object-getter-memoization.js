var traverse = require("../../traverse");
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
    key = "_" + key.name;
  } else {
    key = file.generateUid("memo", scope);
  }

  var memoId = t.memberExpression(t.thisExpression(), t.identifier(key));
  var doneId = t.memberExpression(t.thisExpression(), t.identifier(key + "Done"));

  traverse(value, function (node) {
    if (t.isFunction(node)) return;

    if (t.isReturnStatement(node) && node.argument) {
      node.argument = t.assignmentExpression("=", memoId, node.argument);
    }
  });

  // this._barDone = true;
  body.unshift(t.expressionStatement(t.assignmentExpression("=", doneId, t.literal(true))));

  // if (this._barDone) return this._bar;
  body.unshift(t.ifStatement(doneId, t.returnStatement(memoId)));
};
