import {
  DEPRECATED_KEYS,
  DEPRECATED_ALIASES,
  FLIPPED_ALIAS_KEYS,
  NODE_FIELDS,
  VISITOR_KEYS,
} from "../../lib/index.js";

function addAssertHelper(type) {
  const result =
    NODE_FIELDS[type] || FLIPPED_ALIAS_KEYS[type]
      ? `node is t.${type}`
      : "boolean";

  return `export function assert${type}(node: object | null | undefined, opts?: object | null): asserts ${
    result === "boolean" ? "node" : result
  } {
    assert("${type}", node, opts) }
  `;
}

export default function generateAsserts() {
  let output = `/*
 * This file is auto-generated! Do not modify it directly.
 * To re-generate run 'make build'
 */
import is from "../../validators/is";
import type * as t from "../..";
import deprecationWarning from "../../utils/deprecationWarning";

function assert(type: string, node: any, opts?: any): void {
  if (!is(type, node, opts)) {
    throw new Error(
      \`Expected type "\${type}" with option \${JSON.stringify(opts)}, \` +
        \`but instead got "\${node.type}".\`,
    );
  }
}\n\n`;

  Object.keys(VISITOR_KEYS).forEach(type => {
    output += addAssertHelper(type);
  });

  Object.keys(FLIPPED_ALIAS_KEYS)
    .filter(
      type => !Object.prototype.hasOwnProperty.call(DEPRECATED_ALIASES, type)
    )
    .forEach(type => {
      output += addAssertHelper(type);
    });

  const deprecatedNodeTypesAndAliases = {
    ...DEPRECATED_KEYS,
    ...DEPRECATED_ALIASES,
  };

  Object.keys(deprecatedNodeTypesAndAliases).forEach(type => {
    const newType = deprecatedNodeTypesAndAliases[type];
    output += `export function assert${type}(node: any, opts: any): void {
      deprecationWarning("assert${type}", "assert${newType}");
  assert("${type}", node, opts);
}\n`;
  });

  return output;
}
