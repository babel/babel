/* eslint max-len: "off" */

import * as util from "util";

/**
 * Mapping of messages to be used in Babel.
 * Messages can include $0-style placeholders.
 */

export const MESSAGES = {
  readOnly: "$1 is read-only",
  unknownForHead: "Unknown node type $1 in ForStatement",
  didYouMean: "Did you mean $1?",
  codeGeneratorDeopt:
    "Note: The code generator has deoptimised the styling of $1 as it exceeds the max of $2.",
  unsupportedOutputType: "Unsupported output type $1",
  illegalMethodName: "Illegal method name $1",
  modulesIllegalExportName: "Illegal export $1",
  undeclaredVariable: "Reference to undeclared variable $1",
  undeclaredVariableType:
    "Referencing a type alias outside of a type annotation",
  undeclaredVariableSuggestion:
    "Reference to undeclared variable $1 - did you mean $2?",

  traverseNeedsParent:
    "You must pass a scope and parentPath unless traversing a Program/File. Instead of that you tried to traverse a $1 node without passing scope and parentPath.",
  traverseVerifyRootFunction:
    "You passed `traverse()` a function when it expected a visitor object, are you sure you didn't mean `{ enter: Function }`?",
  traverseVerifyVisitorProperty:
    "You passed `traverse()` a visitor object with the property $1 that has the invalid property $2",
  traverseVerifyNodeType:
    "You gave us a visitor for the node type $1 but it's not a valid type",

  pluginNotObject:
    "Plugin $2 specified in $1 was expected to return an object when invoked but returned $3",
  pluginNotFunction:
    "Plugin $2 specified in $1 was expected to return a function but returned $3",
  pluginUnknown:
    "Unknown plugin $1 specified in $2 at $3, attempted to resolve relative to $4",
  pluginInvalidProperty: "Plugin $1 provided an invalid property of $2",
};

/**
 * Get a message with $0 placeholders replaced by arguments.
 */

export function get(key: string, ...args: Array<any>): string {
  const msg = MESSAGES[key];
  if (!msg) throw new ReferenceError(`Unknown message ${JSON.stringify(key)}`);

  // stringify args
  args = parseArgs(args);

  // replace $0 placeholders with args
  return msg.replace(/\$(\d+)/g, function(str, i) {
    return args[i - 1];
  });
}

/**
 * Stingify arguments to be used inside messages.
 */

export function parseArgs(args: Array<any>): Array<string> {
  return args.map(function(val) {
    if (val != null && val.inspect) {
      return val.inspect();
    } else {
      try {
        return JSON.stringify(val) || val + "";
      } catch (e) {
        return util.inspect(val);
      }
    }
  });
}
