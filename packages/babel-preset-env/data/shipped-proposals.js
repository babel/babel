// These mappings represent the builtin/feature proposals that have been
// shipped by browsers, and are enabled by the `shippedProposals` option.

const corejs3ShippedProposalsList = [
  "esnext.global-this",
  "esnext.string.match-all",
];

const features = {};

const pluginSyntaxMap = new Map([
  ["proposal-async-generator-functions", "syntax-async-generators"],
  ["proposal-object-rest-spread", "syntax-object-rest-spread"],
  ["proposal-optional-catch-binding", "syntax-optional-catch-binding"],
  ["proposal-unicode-property-regex", null],
  ["proposal-json-strings", "syntax-json-strings"],
]);

module.exports = { corejs3ShippedProposalsList, features, pluginSyntaxMap };
