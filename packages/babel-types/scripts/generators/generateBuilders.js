"use strict";
const definitions = require("../../lib/definitions");
const lowerFirst = require("../utils/lowerFirst");

module.exports = function generateBuilders() {
  let output = `// @flow
/*
 * This file is auto-generated! Do not modify it directly.
 * To re-generate run 'make build'
 */
import builder from "../builder";\n\n`;

  Object.keys(definitions.BUILDER_KEYS).forEach(type => {
    output += `export function ${type}(...args: Array<any>): Object { return builder("${type}", ...args); }
export { ${type} as ${lowerFirst(type)} };\n`;
  });

  Object.keys(definitions.DEPRECATED_KEYS).forEach(type => {
    const newType = definitions.DEPRECATED_KEYS[type];
    output += `export function ${type}(...args: Array<any>): Object {
  console.trace("The node type ${type} has been renamed to ${newType}");
  return ${type}("${type}", ...args);
}
export { ${type} as ${lowerFirst(type)} };\n`;
  });

  return output;
};
