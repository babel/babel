// These mappings represent the builtin/feature proposals that have been
// shipped by browsers, and are enabled by the `shippedProposals` option.

const builtIns = {
  "es7.array.flat-map": "Array.prototype.{flat, flatMap} / Array.prototype.flatMap"
};

const features = {};

const pluginSyntaxMap = new Map([
  // ["proposal-foo", "syntax-foo"]
]);

module.exports = { builtIns, features, pluginSyntaxMap };
