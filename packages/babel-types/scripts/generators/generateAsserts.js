"use strict";
const definitions = require("../../lib/definitions");

function addAssertHelper(type) {
  return `export function assert${type}(node: any, opts: any = {}): void {
    assert("${type}", node, opts) }
  `;
}

module.exports = function generateAsserts() {
  let output = `/*
 * This file is auto-generated! Do not modify it directly.
 * To re-generate run 'make build'
 */
import is from "../../validators/is";

function assert(type: string, node: any, opts?: any): void {
  if (!is(type, node, opts)) {
    throw new Error(
      \`Expected type "\${type}" with option \${JSON.stringify(opts)}, \` +
        \`but instead got "\${node.type}".\`,
    );
  }
}\n\n`;

  Object.keys(definitions.VISITOR_KEYS).forEach(type => {
    output += addAssertHelper(type);
  });

  Object.keys(definitions.FLIPPED_ALIAS_KEYS).forEach(type => {
    output += addAssertHelper(type);
  });

  Object.keys(definitions.DEPRECATED_KEYS).forEach(type => {
    const newType = definitions.DEPRECATED_KEYS[type];
    output += `export function assert${type}(node: any, opts: any): void {
  console.trace("The node type ${type} has been renamed to ${newType}");
  assert("${type}", node, opts);
}\n`;
  });

  return output;
};
