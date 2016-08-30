// use if ie
// "es3-member-expression-literals",
// "es3-property-literals",
// "proto-to-assign",
// "es5-property-mutators",

export const pluginsList = {
  // es2015
  "transform-es2015-arrow-functions": {
    edge: 13,
    firefox: 45,
    chrome: 49,
    opera: 36,
  },
  "transform-es2015-block-scoped-functions": {
    edge: 11,
    firefox: 46,
    chrome: 41,
    opera: 28,
  },
  "transform-es2015-block-scoping": {
    edge: 11,
    firefox: 36,
    chrome: 49,
    opera: 36,
  },
  "transform-es2015-classes": {
    edge: 13,
    firefox: 45,
    chrome: 49,
    opera: 36,
  },
  "transform-es2015-computed-properties": {
    edge: 12,
    firefox: 34,
    chrome: 44,
    opera: 31
  },
  "check-es2015-constants": {
    edge: 11,
    firefox: 36,
    chrome: 49,
    opera: 36,
  },
  "transform-es2015-destructuring": {
    edge: 14,
    firefox: Infinity,
    chrome: 52,
    opera: 39,
  },
  "transform-es2015-for-of": {
    edge: Infinity,
    firefox: Infinity,
    chrome: 51,
    opera: 38,
  },
  "transform-es2015-function-name": {
    edge: Infinity,
    firefox: Infinity,
    chrome: 52,
    opera: 39,
  },
  "transform-es2015-literals": {
    edge: 12,
    firefox: 36,
    chrome: 41,
    opera: 28
  },
  "transform-es2015-object-super": {
    edge: 13,
    firefox: 45,
    chrome: 49,
    opera: 36,
  },
  "transform-es2015-parameters": {
    edge: 14,
    firefox: Infinity,
    chrome: 49,
    opera: 36,
  },
  "transform-es2015-shorthand-properties": {
    edge: 12,
    firefox: 33,
    chrome: 43,
    opera: 30
  },
  "transform-es2015-spread": {
    edge: 13,
    firefox: 36,
    chrome: 46,
    opera: 33,
  },
  "transform-es2015-sticky-regex": {
    edge: 13,
    firefox: 31,
    chrome: 49,
    opera: 36
  },
  "transform-es2015-template-literals": {
    edge: 13,
    firefox: 34,
    chrome: 41,
    opera: 28,
  },
  "transform-es2015-typeof-symbol": {
    edge: 12,
    firefox: 36,
    chrome: 38,
    opera: 25,
  },
  "transform-es2015-unicode-regex": {
    edge: 12,
    firefox: 46,
    chrome: 51,
    opera: 38,
  },
  "transform-regenerator": {
    edge: 13,
    firefox: 45,
    chrome: 49,
    opera: 36,
  },

  // es2016
  "transform-exponentiation-operator": {
    edge: 14,
    chrome: 52,
  },

  // es2017
  "transform-async-to-generator": {
    edge: 14,
  },
  "syntax-trailing-function-commas": {
    edge: 14,
  }
};

export const plugins = [
  "es3-member-expression-literals",
  "es3-property-literals",
  "proto-to-assign",

  "es5-property-mutators",

  // es2015
  "transform-es2015-arrow-functions",
  "transform-es2015-block-scoped-functions",
  "transform-es2015-block-scoping",
  "transform-es2015-classes",
  "transform-es2015-computed-properties",
  "check-es2015-constants",
  "transform-es2015-destructuring",
  "transform-es2015-for-of",
  "transform-es2015-function-name",
  "transform-es2015-literals",
  "transform-es2015-object-super",
  "transform-es2015-parameters",
  "transform-es2015-shorthand-properties",
  "transform-es2015-spread",
  "transform-es2015-sticky-regex",
  "transform-es2015-template-literals",
  "transform-es2015-typeof-symbol",
  "transform-es2015-unicode-regex",
  "transform-regenerator",

  // es2016
  "transform-exponentiation-operator",

  // es2017
  "transform-async-to-generator",
  "syntax-trailing-function-commas"
];

// modules?
export const modules = [
  "transform-es2015-modules-amd",
  "transform-es2015-modules-commonjs",
  "transform-es2015-modules-systemjs",
  "transform-es2015-modules-umd"
];

export const stagePlugins = [
  // "transform-class-constructor-call", proposal is removed
  "transform-class-properties",
  "transform-transform-decorators-legacy", // legacy plugin
  "transform-do-expressions",
  "transform-export-extensions",
  "transform-function-bind",
  "transform-object-rest-spread",
];

export default function(opts) {
  let stage = 4;
  if (opts !== undefined){
    if (opts.stage !== undefined) stage = opts.stage;
  }

  if (typeof stage !== "boolean") throw new Error("Preset es2015 'loose' option must be a boolean.");

}
