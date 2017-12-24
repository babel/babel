exports.stringifyValidator = function stringifyValidator(
  validator,
  nodePrefix
) {
  if (validator === undefined) {
    return "any";
  }

  if (validator.each) {
    return `Array<${stringifyValidator(validator.each, nodePrefix)}>`;
  }

  if (validator.chainOf) {
    return stringifyValidator(validator.chainOf[1], nodePrefix);
  }

  if (validator.oneOf) {
    return validator.oneOf.map(JSON.stringify).join(" | ");
  }

  if (validator.oneOfNodeTypes) {
    return validator.oneOfNodeTypes.map(_ => nodePrefix + _).join(" | ");
  }

  if (validator.type) {
    return validator.type;
  }

  return ["any"];
};
