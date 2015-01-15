var util = require("../../util");
var t    = require("../../types");

exports.Function = function (node, parent, file) {
  if (!node.rest) return;

  var rest = node.rest;
  delete node.rest;

  t.ensureBlock(node);

  var argsId = t.identifier("arguments");
  argsId._ignoreAliasFunctions = true;

  var start = t.literal(node.params.length);
  var key = file.generateUidIdentifier("key");
  var len = file.generateUidIdentifier("len");

  var arrKey = key;
  if (node.params.length) {
    arrKey = t.binaryExpression("-", key, start);
  }

  var arrLen = len;
  if (node.params.length) {
    arrLen = t.conditionalExpression(
      t.binaryExpression(">", len, start),
      t.binaryExpression("-", len, start),
      t.literal(0)
    );
  }

  node.body.body.unshift(
    util.template("rest", {
      ARGUMENTS: argsId,
      ARRAY_KEY: arrKey,
      ARRAY_LEN: arrLen,
      START: start,
      ARRAY: rest,
      KEY: key,
      LEN: len,
    })
  );
};
