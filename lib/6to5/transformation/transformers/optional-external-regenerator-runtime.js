var t = require("../../types");

exports.optional = true;

exports.ast = {
  enter: function (ast, file) {
    file._regeneratorId = file.addImport("6to5-runtime/regenerator", "regeneratorRuntime");
  }
};

exports.MemberExpression = function (node, parent, scope, context, file) {
  var obj = node.object;
  var prop = node.property;
  if (!t.isReferenced(node, parent) || !t.isReferenced(obj, node)) return;
  if (obj.name === "regeneratorRuntime") return t.memberExpression(file._regeneratorId, prop);
};
