"use strict";

var levenshtein = require("../../../helpers/levenshtein");
var t           = require("../../../types");

exports.optional = true;

exports.Identifier = function (node, parent, scope, context, file) {
  if (!t.isReferenced(node, parent)) return;
  if (scope.has(node.name, true)) return;

  var msg = "Reference to undeclared variable";

  // get the closest declaration to offer as a suggestion
  // the variable name may have just been mistyped

  var declarations = scope.getAllDeclarations();

  var closest;
  var shortest = -1;

  for (var name in declarations) {
    var distance = levenshtein(node.name, name);
    if (distance <= 0 || distance > 3) continue;
    if (distance <= shortest) continue;

    closest = name;
    shortest = distance;
  }

  if (closest) {
    msg += " - Did you mean " + closest + "?";
  }

  //

  throw file.errorWithNode(node, msg, ReferenceError);
};
