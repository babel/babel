// @ts-expect-error: Could not find type declarations for babel-types
import { BUILDER_KEYS } from "../../lib/index.js";
import type * as t from "../../src/index.ts";

/**
 * Check if all fields after the given field name are nullable.
 */
export function areAllRemainingFieldsNullable(
  fieldName: string,
  fieldNames: string[],
  fields: Record<string, t.FieldOptions<t.Node>>
) {
  const index = fieldNames.indexOf(fieldName);
  return fieldNames.slice(index).every(_ => isNullable(fields[_]));
}

/**
 * Check if a field has a default value.
 */
export function hasDefault(field: t.FieldOptions<t.Node>): boolean {
  return field.default != null;
}

/**
 * Check if a field is nullable. That means it is either optional
 * or has a default value.
 */
export function isNullable(field: t.FieldOptions<t.Node>): boolean {
  return field.optional || hasDefault(field);
}

/**
 * Sort field names based on their order in the builder keys.
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
