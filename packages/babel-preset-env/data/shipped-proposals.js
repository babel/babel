// These mappings represent the syntax proposals that have been
// shipped by browsers, and are enabled by the `shippedProposals` option.

const proposalPlugins = {};

// Please keep these in alphabetical order!
const pluginSyntaxMap = new Map([
  ["proposal-async-generator-functions", "syntax-async-generators"],
  ["proposal-json-strings", "syntax-json-strings"],
  ["proposal-nullish-coalescing-operator", "syntax-nullish-coalescing-operator"],
  ["proposal-object-rest-spread", "syntax-object-rest-spread"],
  ["proposal-optional-catch-binding", "syntax-optional-catch-binding"],
  ["proposal-optional-chaining", "syntax-optional-chaining"],
  ["proposal-unicode-property-regex", null],
]);

module.exports = { proposalPlugins, pluginSyntaxMap };
