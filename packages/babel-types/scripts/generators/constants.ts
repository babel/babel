// @ts-expect-error: Could not find type declarations for babel-types
import { DEPRECATED_ALIASES, FLIPPED_ALIAS_KEYS } from "../../lib/index.js";

// The constants are explicitly annotated to keep the declaration file small:
// TypeScript prints an inferred type as the union of every node type and alias,
// once per constant.
const typeAnnotation = "NodeTypesWithoutComment[]";

export default function generateConstants() {
  let output = `/*
 * This file is auto-generated! Do not modify it directly.
 * To re-generate run 'make build'
 */
import { FLIPPED_ALIAS_KEYS } from "../../definitions/index.ts";
import type { NodeTypesWithoutComment } from "../../definitions/utils.ts";
\n\n`;

  Object.keys(FLIPPED_ALIAS_KEYS)
    .filter(
      type => !Object.prototype.hasOwnProperty.call(DEPRECATED_ALIASES, type)
    )
    .forEach(type => {
      output += `export const ${type.toUpperCase()}_TYPES: ${typeAnnotation} = FLIPPED_ALIAS_KEYS["${type}"];\n`;
    });

  Object.keys(DEPRECATED_ALIASES).forEach(type => {
    const newType = `${DEPRECATED_ALIASES[type].toUpperCase()}_TYPES`;
    output += `/**
* @deprecated migrate to ${newType}.
*/
export const ${type.toUpperCase()}_TYPES: ${typeAnnotation} = ${newType}`;
  });

  return output;
}
