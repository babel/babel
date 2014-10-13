var util = require("../util");
var b    = require("recast").types.builders;
var _    = require("lodash");

var getSpreadLiteral = function (spread, file) {
  var literal = spread.argument;
  if (literal.type !== "ArrayExpression") {
    literal = util.template("call", {
      OBJECT: file.addDeclaration("slice"),
      CONTEXT: literal
    });
  }
  return literal;
};

exports.ArrayExpression = function (node, parent, file) {
  var elements = node.elements;
  if (!elements.length) return;

  var spread = elements.pop();
  if (spread.type !== "SpreadElement") {
    elements.push(spread);
    return;
  }

  var concat = util.template("array-concat", {
    ARGUMENT: getSpreadLiteral(spread, file)
  });

  concat.callee.object.elements = elements;

  return concat;
};

exports.CallExpression = function (node, parent, file) {
  var args = node.arguments;

  if (args.length && _.last(args).type === "SpreadElement") {
    var spread = args.pop();

    var spreadLiteral  = getSpreadLiteral(spread, file);
    var contextLiteral = b.literal(null);

    node.arguments = [];

    if (args.length) {
      var concat = util.template("array-concat");
      concat.arguments = [spreadLiteral];
      concat.callee.object.elements = args;
      node.arguments.push(concat);
    } else {
      node.arguments.push(spreadLiteral);
    }

    var callee = node.callee;

    if (callee.type === "MemberExpression") {
      contextLiteral = callee.object;
      callee.property = b.memberExpression(callee.property, b.identifier("apply"), false);
    } else {
      node.callee = b.memberExpression(node.callee, b.identifier("apply"), false);
    }

    node.arguments.unshift(contextLiteral);
  }
};
