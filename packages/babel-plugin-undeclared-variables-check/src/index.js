import leven from "leven";

export default function ({ messages }) {
  return {
    visitor: {
      ReferencedIdentifier(path) {
        const { node, scope } = path;

        const binding = scope.getBinding(node.name);
        if (binding && binding.kind === "type" && !path.parentPath.isFlow()) {
          throw path.buildCodeFrameError(messages.get("undeclaredVariableType", node.name), ReferenceError);
        }

        if (scope.hasBinding(node.name)) return;

        // get the closest declaration to offer as a suggestion
        // the variable name may have just been mistyped

        const bindings = scope.getAllBindings();

        let closest;
        let shortest = -1;

        for (const name in bindings) {
          const distance = leven(node.name, name);
          if (distance <= 0 || distance > 3) continue;
          if (distance <= shortest) continue;

          closest = name;
          shortest = distance;
        }

        let msg;
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
