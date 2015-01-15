var util = require("../../util");
var t    = require("../../types");

exports.Function = function (node, parent, file) {
  if (!node.rest) return;

  var rest = node.rest;
  delete node.rest;

  t.ensureBlock(node);

  var argsId = t.identifier("arguments");

  // otherwise `arguments` will be remapped in arrow functions
  argsId._ignoreAliasFunctions = true;

  var start = t.literal(node.params.length);
  var key = file.generateUidIdentifier("key");

  var arrKey = key;
  if (node.params.length) {
    // this method has additional params, so we need to subtract
    // the index of the current argument position from the
    // position in the array that we want to populate
    arrKey = t.binaryExpression("-", arrKey, start);
  }

  node.body.body.unshift(
    t.variableDeclaration("var", [
      t.variableDeclarator(rest, t.arrayExpression([]))
    ]),

    util.template("rest", {
      ARGUMENTS: argsId,
      ARRAY_KEY: arrKey,
      START: start,
      ARRAY: rest,
      KEY: key
    })
  );
};
