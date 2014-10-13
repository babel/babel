var util = require("../util");
var b    = require("recast").types.builders;
var _    = require("lodash");

exports.ArrayExpression = function (node) {
  var elements = node.elements;
  if (!elements.length) return;

  var spread = elements.pop();
  if (spread.type !== "SpreadElement") {
    elements.push(spread);
    return;
  }

  var concat = util.template("array-concat", {
    ARGUMENT: spread.argument
  });

  concat.callee.object.elements = elements;

  return concat;
};

exports.CallExpression = function (node, parent, file) {
  var args = node.arguments;

  if (args.length && _.last(args).type === "SpreadElement") {
    var spread = args.pop();

    var spreadLiteral  = spread.argument;
    var contextLiteral = b.literal(null);

    node.arguments = [];

    if (args.length) {
      if (spreadLiteral.name === "arguments") {
        spreadLiteral = util.template("arguments-slice", {
          SLICE_KEY: file.addDeclaration("slice")
        });
      }

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
