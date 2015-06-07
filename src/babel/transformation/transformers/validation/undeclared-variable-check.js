import levenshtein from "leven";
import * as messages from "../../../messages";

export var metadata = {
  optional: true
};

export function ReferencedIdentifier(node, parent, scope, file) {
  var binding = scope.getBinding(node.name);
  if (binding && binding.kind === "type" && !this.parentPath.isFlow()) {
    throw this.errorWithNode(messages.get("undeclaredVariableType", node.name), ReferenceError);
  }

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

  throw this.errorWithNode(msg, ReferenceError);
}
