var t = require("../types");
var _ = require("lodash");

var addDisplayName = function (id, call) {
  if (!call || call.type !== "CallExpression") return;

  var callee = call.callee;
  if (callee.type !== "MemberExpression") return;

  // not React
  var obj = callee.object;
  if (obj.type !== "Identifier" || obj.name !== "React") return;

  // not createClass
  var prop = callee.property;
  if (prop.type !== "Identifier" || prop.name !== "createClass") return;

  // no arguments
  var args = call.arguments;
  if (args.length !== 1) return;

  // not an object
  var first = args[0];
  if (first.type !== "ObjectExpression") return;

  var props = first.properties;
  var safe = true;

  _.each(props, function (prop) {
    if (prop.key.name === "displayName") {
      return safe = false;
    }
  });

  if (safe) {
    props.unshift(t.property("init", t.identifier("displayName"), t.literal(id)));
  }
};

exports.AssignmentExpression =
exports.Property =
exports.VariableDeclarator = function (node) {
  var left, right;

  if (t.isAssignmentExpression(node)) {
    left = node.left;
    right = node.right;
  } else if (t.isProperty(node)) {
    left = node.key;
    right = node.value;
  } else if (t.isVariableDeclarator(node)) {
    left = node.id;
    right = node.init;
  }

  if (t.isMemberExpression(left)) {
    left = left.property;
  }

  if (t.isIdentifier(left)) {
    addDisplayName(left.name, right);
  }
};
