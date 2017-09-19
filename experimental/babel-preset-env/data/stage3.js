const builtIns = {
  "es7.promise.finally": "Promise.prototype.finally"
};

const plugins = {
  "transform-async-generator-functions": "Asynchronous Iterators",
  "transform-object-rest-spread": "object rest/spread properties",
  "transform-optional-catch-binding": "optional catch binding",
  "transform-unicode-property-regex": "RegExp Unicode Property Escapes",
};

const pluginSyntaxMap = new Map([
  ["transform-async-generator-functions", "syntax-async-generators"],
  ["transform-object-rest-spread", "syntax-object-rest-spread"],
  ["transform-optional-catch-binding", "syntax-optional-catch-binding"],
  ["transform-unicode-property-regex", null],
]);

module.exports = { builtIns, plugins, pluginSyntaxMap };
