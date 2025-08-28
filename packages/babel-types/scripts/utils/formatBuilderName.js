// @ts-check
const toLowerCase = Function.call.bind("".toLowerCase);

/**
 * Format a node type to its corresponding builder name.
 * @param {string} type
 * @returns {string}
 */
export default function formatBuilderName(type) {
  // FunctionExpression -> functionExpression
  // JSXIdentifier -> jsxIdentifier
  // V8IntrinsicIdentifier -> v8IntrinsicIdentifier
  return type.replace(/^([A-Z](?=[a-z0-9])|[A-Z]+(?=[A-Z]))/, toLowerCase);
}
