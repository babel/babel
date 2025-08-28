// @ts-check
import { BUILDER_KEYS } from "../../lib/index.js";

/**
 * @param {import("../../src/index.ts").FieldOptions} field
 * @returns {boolean}
 */
export function hasDefault(field) {
  return field.default != null;
}

/**
 * @param {import("../../src/index.ts").FieldOptions} field
 * @returns {boolean}
 */
export function isNullable(field) {
  return field.optional || hasDefault(field);
}

/**
 * Sort field names based on their order in the builder keys.
 * @param {string[]} fields
 * @param {string} type
 * @returns {string[]}
 */
export function sortFieldNames(fields, type) {
  const builderKeys = BUILDER_KEYS[type];
  return fields.sort((fieldA, fieldB) => {
    const indexA = builderKeys.indexOf(fieldA);
    const indexB = builderKeys.indexOf(fieldB);
    if (indexA === indexB) return fieldA < fieldB ? -1 : 1;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });
}
