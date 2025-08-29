// @ts-expect-error: Could not find type declarations for babel-types
import { BUILDER_KEYS } from "../../lib/index.js";
import type { FieldOptions } from "../../src/index.ts";

/**
 * @param {string} fieldName
 * @param {string[]} fieldNames
 * @param {Record<string, FieldOptions>} fields
 * @returns {boolean}
 */
export function areAllRemainingFieldsNullable(
  fieldName: string,
  fieldNames: string[],
  fields: Record<string, FieldOptions>
) {
  const index = fieldNames.indexOf(fieldName);
  return fieldNames.slice(index).every(_ => isNullable(fields[_]));
}

/**
 * @param {FieldOptions} field
 * @returns {boolean}
 */
export function hasDefault(field: FieldOptions): boolean {
  return field.default != null;
}

/**
 * @param {FieldOptions} field
 * @returns {boolean}
 */
export function isNullable(field: FieldOptions): boolean {
  return field.optional || hasDefault(field);
}

/**
 * Sort field names based on their order in the builder keys.
 * @param {string[]} fields
 * @param {string} type
 * @returns {string[]}
 */
export function sortFieldNames(fields: string[], type: string): string[] {
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
