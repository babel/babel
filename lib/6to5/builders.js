var _ = require("lodash");

var build = function (type, keys) {
  return function () {
    var args = arguments;
    var node = { type: type };
    _.each(keys, function (key, i) {
      node[key] = args[i];
    });
    return node;
  };
};

exports.identifier = build("Identifier", ["name"]);

exports.literal = build("Literal", ["value"]);

exports.functionExpression = build("FunctionExpression", ["id", "params", "body"]);

exports.returnStatement = build("ReturnStatement", ["argument"]);

exports.assignmentExpression = build("AssignmentExpression", ["operator", "left", "right"]);

exports.ifStatement = build("IfStatement", ["test", "consequent", "alternate"]);

exports.callExpression = build("CallExpression", ["callee", "arguments"]);

exports.blockStatement = build("BlockStatement", ["body"]);

exports.memberExpression = build("MemberExpression", ["object", "property", "computed"]);

exports.variableDeclaration = build("VariableDeclaration", ["kind", "declarations"]);

exports.variableDeclarator = build("VariableDeclarator", ["id", "init"]);

exports.arrayExpression = build("ArrayExpression", ["elements"]);

exports.binaryExpression = build("BinaryExpression", ["operator", "left", "right"]);

exports.expressionStatement = build("ExpressionStatement", ["expression"]);

exports.thisExpression = build("ThisExpression");

exports.objectExpression = build("ObjectExpression", ["properties"]);

exports.property = build("Property", ["kind", "key", "value"]);
