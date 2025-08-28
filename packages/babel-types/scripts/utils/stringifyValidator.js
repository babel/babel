// @ts-check
/**
 * Stringify a validator to its corresponding TypeScript type.
 * @param {import("../../src/definitions/utils.ts").Validator | undefined} validator
 * @param {string} nodePrefix
 * @returns {string}
 */
export default function stringifyValidator(validator, nodePrefix) {
  if (validator === undefined) {
    return "any";
  }

  if ("each" in validator) {
    return `Array<${stringifyValidator(validator.each, nodePrefix)}>`;
  }

  if ("chainOf" in validator) {
    const ret = stringifyValidator(validator.chainOf[1], nodePrefix);
    return Array.isArray(ret) && ret.length === 1 && ret[0] === "any"
      ? stringifyValidator(validator.chainOf[0], nodePrefix)
      : ret;
  }

  if ("oneOf" in validator) {
    return validator.oneOf.map(_ => JSON.stringify(_)).join(" | ");
  }

  if ("oneOfNodeTypes" in validator) {
    return validator.oneOfNodeTypes.map(_ => nodePrefix + _).join(" | ");
  }

  if ("oneOfNodeOrValueTypes" in validator) {
    return validator.oneOfNodeOrValueTypes
      .map(_ => {
        return isValueType(_) ? _ : nodePrefix + _;
      })
      .join(" | ");
  }

  if ("type" in validator) {
    return validator.type;
  }

  if ("shapeOf" in validator) {
    return (
      "{ " +
      Object.keys(validator.shapeOf)
        .map(shapeKey => {
          const propertyDefinition = validator.shapeOf[shapeKey];
          if (propertyDefinition.validate) {
            const isOptional =
              propertyDefinition.optional || propertyDefinition.default != null;
            return (
              shapeKey +
              (isOptional ? "?: " : ": ") +
              stringifyValidator(propertyDefinition.validate, nodePrefix)
            );
          }
          return null;
        })
        .filter(Boolean)
        .join(", ") +
      " }"
    );
  }

  return "any";
}

/**
 * Heuristic to decide whether or not the given type is a value type (eg. "null")
 * or a Node type (eg. "Expression").
 */
export function isValueType(type) {
  return type.charAt(0).toLowerCase() === type.charAt(0);
}
