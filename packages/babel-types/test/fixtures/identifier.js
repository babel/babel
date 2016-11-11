// spec.Identifier (e.g. BindingIdentifier).
// value => valid (ES2015 strict).
module.exports = [
  ["x", true],

  // IdentifierName, ReservedWord :: Keyword.
  ["default", false],

  // ReservedWord's
  ["null", false],
  ["true", false],
  ["false", false],

  // Not a lexical IdentifierName.
  ["bound x", false]
];
