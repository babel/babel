"use strict";

var util = require("../../../util");
var t    = require("../../../types");

exports.check = t.isRestElement;

var hasRest = function (node) {
  return t.isRestElement(node.params[node.params.length - 1]);
};

exports.Function = function (node, parent, scope) {
  if (!hasRest(node)) return;

  var rest = node.params.pop().argument;

  var argsId = t.identifier("arguments");

  // otherwise `arguments` will be remapped in arrow functions
  argsId._ignoreAliasFunctions = true;

  var start = t.literal(node.params.length);
  var key = scope.generateUidIdentifier("key");
  var len = scope.generateUidIdentifier("len");

  var arrKey = key;
  var arrLen = len;
  if (node.params.length) {
    // this method has additional params, so we need to subtract
    // the index of the current argument position from the
    // position in the array that we want to populate
    arrKey = t.binaryExpression("-", key, start);

    // we need to work out the size of the array that we're
    // going to store all the rest parameters
    //
    // we need to add a check to avoid constructing the array
    // with <0 if there are less arguments than params as it'll
    // cause an error
    arrLen = t.conditionalExpression(
      t.binaryExpression(">", len, start),
      t.binaryExpression("-", len, start),
      t.literal(0)
    );
  }

  // support patterns
  if (t.isPattern(rest)) {
    var pattern = rest;
    rest = scope.generateUidIdentifier("ref");

    // let the destructuring transformer handle this
    var restDeclar = t.variableDeclaration("var", [
      t.variableDeclarator(pattern, rest)
    ]);

    // retain evaluation position
    restDeclar._blockHoist = node.params.length + 1;

    node.body.body.unshift(restDeclar);
  }

  scope.assignTypeGeneric(rest.name, "Array");

  var loop = util.template("rest", {
    ARGUMENTS: argsId,
    ARRAY_KEY: arrKey,
    ARRAY_LEN: arrLen,
    START: start,
    ARRAY: rest,
    KEY: key,
    LEN: len,
  });
  loop._blockHoist = node.params.length + 1;
  node.body.body.unshift(loop);
};
