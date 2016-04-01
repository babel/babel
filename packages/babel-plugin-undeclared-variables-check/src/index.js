import leven from "leven";

const envGlobals = {
  node: [
    "Buffer",
    "__dirname",
    "__filename",
    "clearInterval",
    "clearTimeout",
    "console",
    "exports",
    "global",
    "module",
    "process",
    "require",
    "setInterval",
    "setTimeout"
  ]
};

export default function ({ messages }) {
  return {
    visitor: {
      ReferencedIdentifier(path, options) {
        let pluginOptions  = options.opts;
        let envOption      = pluginOptions.env;
        let globalsOption  = pluginOptions.globals;
        let globals        = [];
        let scope          = path.scope;
        let variableName   = path.node.name;
        let binding        = scope.getBinding(variableName);

        if (binding && binding.kind === "type" && !path.parentPath.isFlow()) {
          throw path.buildCodeFrameError(
            messages.get("undeclaredVariableType", variableName),
            ReferenceError);
        }

        // check for environemnt globals
        if ( envOption ) {
          if ( typeof envOption !== "string" )
            throw new Error("\"env\" has to be of type string");

          globals = envGlobals[envOption];

          if ( ! globals )
            throw new Error(
              "\"env\": \"" + envOption + "\"" +
              "is unkown or not yet implemented.\n" +
              "Use the \"globals\" option to add custom globals.");
        }

        // add custom global variables
        if ( globalsOption ) {
          if ( ! (globalsOption instanceof Array) )
            throw new Error("\"globals\" has to be an array");

          globals = globals.concat(globalsOption);
        }

        if (scope.hasBinding(variableName) ||
            globals.indexOf(variableName) !== -1 ) return;

        // get the closest declaration to offer as a suggestion
        // the variable name may have just been mistyped

        let bindings = scope.getAllBindings();

        let closest;
        let shortest = -1;

        for (let name in bindings) {
          let distance = leven(variableName, name);
          if (distance <= 0 || distance > 3) continue;
          if (distance <= shortest) continue;

          closest = name;
          shortest = distance;
        }

        let msg;
        if (closest) {
          msg = messages.get("undeclaredVariableSuggestion", variableName, closest);
        } else {
          msg = messages.get("undeclaredVariable", variableName);
        }

        //

        throw path.buildCodeFrameError(msg, ReferenceError);
      }
    }
  };
}
