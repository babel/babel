var util = require("../util");
var _    = require("lodash");

exports.ArrayExpression = function (node, parent) {
  //if (node.ignoreSpread) return;

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

exports.CallExpression = function (node, parent) {
  var args = node.arguments;

  if (args.length && _.last(args).type === "SpreadElement") {
    var spread = args.pop();

    var spreadLiteral = spread.argument;

    var contextLiteral = {
      type: "Literal",
      value: null
    };

    node.arguments = [];

    if (args.length) {
      if (spreadLiteral.name === "arguments") {
        spreadLiteral = util.template("arguments-slice");
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
      callee.property.name += ".apply";
    } else {
      node.callee.name += ".apply";
    }

    node.arguments.unshift(contextLiteral);
  }
};
