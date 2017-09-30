/* eslint max-len: "off" */

import * as util from "util";

/**
 * Mapping of messages to be used in Babel.
 * Messages can include $0-style placeholders.
 */

export const MESSAGES = {
  traverseNeedsParent:
    "You must pass a scope and parentPath unless traversing a Program/File. Instead of that you tried to traverse a $1 node without passing scope and parentPath.",
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
