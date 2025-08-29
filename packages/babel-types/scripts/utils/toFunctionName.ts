/**
 * Convert a type name to its corresponding function name.
 * @param {string} typeName
 * @returns {string}
 */
export default function toFunctionName(typeName: string): string {
  const _ = typeName.replace(/^TS/, "ts").replace(/^JSX/, "jsx");
  return _.slice(0, 1).toLowerCase() + _.slice(1);
}
