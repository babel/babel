export const plugins = [
  "es3-member-expression-literals",
  "es3-property-literals",

  "es5-property-mutators",

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
];

// modules?
export const modules = [
  "es2015-modules-amd",
  "es2015-modules-commonjs",
  "es2015-modules-systemjs",
  "es2015-modules-umd"
];

export const stagePlugins = [
  "transform-async-to-generator",
  // "transform-class-constructor-call", proposal is removed
  "transform-class-properties",
  "transform-transform-decorators-legacy", // legacy plugin
  "transform-do-expressions",
  "transform-exponentiation-operator",
  "transform-export-extensions",
  "transform-function-bind",
  "transform-object-rest-spread",
  "syntax-trailing-function-commas"
];

export default function(opts) {
  let loose = false;
  if (opts !== undefined){
    if (opts.loose !== undefined) loose = opts.loose;
  }

  if (typeof loose !== "boolean") throw new Error("Preset es2015 'loose' option must be a boolean.");

}

export const environments = {
  android: {
    44: {

    },
    50: {

    },
    51: {

    },
  },
  chrome: {
    48: {

    },
    49: {

    },
    50: {

    },
    51: {

    },
    52: {

    },
  },
  edge: {
    12: {

    },
    13: {

    },
    14: {

    },
  },
  firefox: {
    43: {

    },
    44: {

    },
    45: {

    },
    46: {

    },
    47: {

    },
    48: {

    },
  },
  ie: {
    8: {

    },
    9: {

    },
    10: {

    },
    11: {

    },
  },
  ios: {
    7: {

    },
    8: {

    },
    9: {

    },
  },
  node: {
    "0.10": {

    },
    "0.12": {

    },
    4: {

    },
    5: {

    },
    6: {

    },
  },
  phantom: {
    1: {

    },
    2: {

    }
  },
  safari: {
    7: {

    },
    8: {

    },
    9: {

    },
  }
};
