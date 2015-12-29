import leven from "leven";

const _global = new Function("return this")();

function isGlobalVar(name) {
  if (name in _global) {
    return true;
  }
  try {
    eval(name);
  } catch (err) {
    return false;
  }
  return true;
}


export default function ({ messages }) {
  return {
    visitor: {
      ReferencedIdentifier(path) {
        let { node, scope } = path;

        let binding = scope.getBinding(node.name);
        if (binding && binding.kind === "type" && !path.parentPath.isFlow()) {
          throw path.buildCodeFrameError(messages.get("undeclaredVariableType", node.name), ReferenceError);
        }

        if (scope.hasBinding(node.name) || isGlobalVar(node.name)) return;

        // get the closest declaration to offer as a suggestion
        // the variable name may have just been mistyped

        let bindings = scope.getAllBindings();

        let closest;
        let shortest = -1;

        for (let name in bindings) {
          let distance = leven(node.name, name);
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
