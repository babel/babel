exports.stringifyValidator = function stringifyValidator(
  validator,
  nodePrefix,
  syntax
) {
  if (validator === undefined) {
    return "any";
  }

  if (validator.each) {
    const inner = stringifyValidator(validator.each, nodePrefix, syntax);
    return syntax === "flow" ? `$ReadOnlyArray<${inner}>` : `Array<${inner}>`;
  }

  if (validator.chainOf) {
    return stringifyValidator(validator.chainOf[1], nodePrefix, syntax);
  }

  if (validator.oneOf) {
    return validator.oneOf.map(JSON.stringify).join(" | ");
  }

  if (validator.oneOfNodeTypes) {
    return validator.oneOfNodeTypes.map(_ => nodePrefix + _).join(" | ");
  }

  if (validator.oneOfNodeOrValueTypes) {
    return validator.oneOfNodeOrValueTypes
      .map(_ => {
        return isValueType(_) ? _ : nodePrefix + _;
      })
      .join(" | ");
  }

  if (validator.type) {
    return validator.type;
  }

  return ["any"];
};

exports.toFunctionName = function toFunctionName(typeName) {
  const _ = typeName.replace(/^TS/, "ts").replace(/^JSX/, "jsx");
  return _.slice(0, 1).toLowerCase() + _.slice(1);
};

/**
 * Heuristic to decide whether or not the given type is a value type (eg. "null")
 * or a Node type (eg. "Expression").
 */
function isValueType(type) {
  return type.charAt(0).toLowerCase() === type.charAt(0);
}
