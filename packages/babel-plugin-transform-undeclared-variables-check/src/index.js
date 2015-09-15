import levenshtein from "leven";

export default function ({ messages }) {
  return {
    visitor: {
      ReferencedIdentifier(path) {
        var { node, scope } = path;

        var binding = scope.getBinding(node.name);
        if (binding && binding.kind === "type" && !path.parentPath.isFlow()) {
          throw path.buildCodeFrameError(messages.get("undeclaredVariableType", node.name), ReferenceError);
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

        throw path.buildCodeFrameError(msg, ReferenceError);
      }
    }
  };
}
