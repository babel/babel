// These mappings represent the builtin/feature proposals that have been
// shipped by browsers, and are enabled by the `shippedProposals` option.

const builtIns = {
  "es7.promise.finally": "Promise.prototype.finally",
  "es7.symbol.async-iterator": "Asynchronous Iterators",
};

const features = {
  "proposal-async-generator-functions": "Asynchronous Iterators",
  "proposal-object-rest-spread": "object rest/spread properties",
  "proposal-optional-catch-binding": "optional catch binding",
  "proposal-unicode-property-regex": "RegExp Unicode Property Escapes",
};

const pluginSyntaxMap = new Map([
  ["proposal-async-generator-functions", "syntax-async-generators"],
  ["proposal-object-rest-spread", "syntax-object-rest-spread"],
  ["proposal-optional-catch-binding", "syntax-optional-catch-binding"],
  ["proposal-unicode-property-regex", null],
]);

module.exports = { builtIns, features, pluginSyntaxMap };
