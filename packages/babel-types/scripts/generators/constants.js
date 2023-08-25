import { DEPRECATED_ALIASES, FLIPPED_ALIAS_KEYS } from "../../lib/index.js";

export default function generateConstants() {
  let output = `/*
 * This file is auto-generated! Do not modify it directly.
 * To re-generate run 'make build'
 */
import { FLIPPED_ALIAS_KEYS } from "../../definitions/index.ts";\n\n`;

  Object.keys(FLIPPED_ALIAS_KEYS)
    .filter(
      type => !Object.prototype.hasOwnProperty.call(DEPRECATED_ALIASES, type)
    )
    .forEach(type => {
      output += `export const ${type.toUpperCase()}_TYPES = FLIPPED_ALIAS_KEYS["${type}"];\n`;
    });

  Object.keys(DEPRECATED_ALIASES).forEach(type => {
    const newType = `${DEPRECATED_ALIASES[type].toUpperCase()}_TYPES`;
    output += `/**
* @deprecated migrate to ${newType}.
*/
export const ${type.toUpperCase()}_TYPES = ${newType}`;
  });

  return output;
}
