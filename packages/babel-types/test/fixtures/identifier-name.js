// spec.IdentifierName
// value => valid (ES2015 strict).
module.exports = [
  ["x", true],

  ["default", true],

  ["null", true],

  ["true", true],

  ["false", true],

  // Not a lexical IdentifierName.
  ["bound x", false]
];
