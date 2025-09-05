import type { Validator } from "../../src/definitions/utils.ts";
/**
 * Stringify a validator to its corresponding TypeScript type.
 * @param {Validator | undefined} validator
 * @param {string} nodePrefix
 * @returns {string}
 */
export default function stringifyValidator(
  validator: Validator | undefined,
  nodePrefix: string
): string {
  if (validator === undefined) {
    return "any";
  }

  if ("each" in validator) {
    return `Array<${stringifyValidator(validator.each, nodePrefix)}>`;
  }

  if ("chainOf" in validator) {
    let ret = "any";
    // Iterate from the end to the beginning to find the most narrow type.
    // For example, we usually place `assertEach(assertNodeOrValueType("null", "PatternLike"))`
    // after `assertValueType("array")`
    for (let i = validator.chainOf.length - 1; i >= 0; i--) {
      const chainValidator = validator.chainOf[i];
      ret = stringifyValidator(chainValidator, nodePrefix);
      if (ret !== "any") {
        break;
      }
    }
    return ret;
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
export function isValueType(type: string): boolean {
  return type.charAt(0).toLowerCase() === type.charAt(0);
}
