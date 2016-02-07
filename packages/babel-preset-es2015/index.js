module.exports = function(context, opts) {
  /* eslint-disable no-var */
  var loose = false;
  var modules = true;
  /* eslint-enable no-var */
  if (opts !== undefined) {
    if (opts.loose !== undefined) loose = opts.loose;
    if (opts.modules !== undefined) modules = opts.modules;
  }

  if (typeof loose !== "boolean") throw new Error("Preset es2015 'loose' option must be a boolean.");
  if (typeof modules !== "boolean") throw new Error("Preset es2015 'modules' option must be a boolean.");

  return {
    plugins: [
      [require("babel-plugin-transform-es2015-template-literals"), {loose: loose}],
      require("babel-plugin-transform-es2015-literals"),
      require("babel-plugin-transform-es2015-function-name"),
      require("babel-plugin-transform-es2015-arrow-functions"),
      require("babel-plugin-transform-es2015-block-scoped-functions"),
      [require("babel-plugin-transform-es2015-classes"), {loose: loose}],
      require("babel-plugin-transform-es2015-object-super"),
      require("babel-plugin-transform-es2015-shorthand-properties"),
      require("babel-plugin-transform-es2015-duplicate-keys"),
      [require("babel-plugin-transform-es2015-computed-properties"), {loose: loose}],
      [require("babel-plugin-transform-es2015-for-of"), {loose: loose}],
      require("babel-plugin-transform-es2015-sticky-regex"),
      require("babel-plugin-transform-es2015-unicode-regex"),
      require("babel-plugin-check-es2015-constants"),
      [require("babel-plugin-transform-es2015-spread"), {loose: loose}],
      require("babel-plugin-transform-es2015-parameters"),
      [require("babel-plugin-transform-es2015-destructuring"), {loose: loose}],
      require("babel-plugin-transform-es2015-block-scoping"),
      require("babel-plugin-transform-es2015-typeof-symbol"),
    ].concat(modules ? [
      [require("babel-plugin-transform-es2015-modules-commonjs"), {loose: loose}],
    ] : []).concat([
      [require("babel-plugin-transform-regenerator"), { async: false, asyncGenerators: false }],
    ]),
  };
};

/**
 * This preset was originally an object, before function-based configurable presets were introduced.
 * For backward-compatibility with anything that may have been loading this preset and expecting
 * it to be a simple Babel config object, we maintain the old config here.
 */
module.exports.plugins = [
  require("babel-plugin-transform-es2015-template-literals"),
  require("babel-plugin-transform-es2015-literals"),
  require("babel-plugin-transform-es2015-function-name"),
  require("babel-plugin-transform-es2015-arrow-functions"),
  require("babel-plugin-transform-es2015-block-scoped-functions"),
  require("babel-plugin-transform-es2015-classes"),
  require("babel-plugin-transform-es2015-object-super"),
  require("babel-plugin-transform-es2015-shorthand-properties"),
  require("babel-plugin-transform-es2015-duplicate-keys"),
  require("babel-plugin-transform-es2015-computed-properties"),
  require("babel-plugin-transform-es2015-for-of"),
  require("babel-plugin-transform-es2015-sticky-regex"),
  require("babel-plugin-transform-es2015-unicode-regex"),
  require("babel-plugin-check-es2015-constants"),
  require("babel-plugin-transform-es2015-spread"),
  require("babel-plugin-transform-es2015-parameters"),
  require("babel-plugin-transform-es2015-destructuring"),
  require("babel-plugin-transform-es2015-block-scoping"),
  require("babel-plugin-transform-es2015-typeof-symbol"),
  require("babel-plugin-transform-es2015-modules-commonjs"),
  [require("babel-plugin-transform-regenerator"), { async: false, asyncGenerators: false }],
];
