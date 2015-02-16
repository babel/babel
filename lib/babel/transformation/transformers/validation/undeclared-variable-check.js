"use strict";

var levenshtein = require("leven");
var messages    = require("../../../messages");
var t           = require("../../../types");

exports.optional = true;

exports.Identifier = function (node, parent, scope, file) {
  if (!t.isReferenced(node, parent)) return;
  if (scope.hasBinding(node.name)) return;

  // get the closest declaration to offer as a suggestion
  // the variable name may have just been mistyped

  var bindings = scope.getAllBindings();

  var closest;
  var shortest = -1;

  for (var name in bindings) {
    var distance = levenshtein(node.name, name);
    if (distance <= 0 || distance > 3) continue;
    if (distance <= shortest) continue;

    closest = name;
    shortest = distance;
  }

  var msg;
  if (closest) {
    msg = messages.get("undeclaredVariableSuggestion", node.name, closest);
  } else {
    msg = messages.get("undeclaredVariable", node.name);
  }

  //

  throw file.errorWithNode(node, msg, ReferenceError);
};
