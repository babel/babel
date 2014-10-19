var b = require("recast").types.builders;
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
    props.unshift(b.property("init", b.identifier("displayName"), b.literal(id)));
  }
};

exports.AssignmentExpression =
exports.Property =
exports.VariableDeclarator = function (node) {
  var left, right;

  if (node.type === "AssignmentExpression") {
    left = node.left;
    right = node.right;
  } else if (node.type === "Property") {
    left = node.key;
    right = node.value;
  } else if (node.type === "VariableDeclarator") {
    left = node.id;
    right = node.init;
  }

  if (left && left.type === "MemberExpression") {
    left = left.property;
  }

  if (left && left.type === "Identifier") {
    addDisplayName(left.name, right);
  }
};
