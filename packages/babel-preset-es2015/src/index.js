module.exports = function(context, opts) {
  const moduleTypes = ["commonjs", "amd", "umd", "systemjs"];
  let loose = false;
  let modules = "commonjs";

  if (opts !== undefined) {
    if (opts.loose !== undefined) loose = opts.loose;
    if (opts.modules !== undefined) modules = opts.modules;
  }

  if (typeof loose !== "boolean") throw new Error("Preset es2015 'loose' option must be a boolean.");
  if (modules !== false && moduleTypes.indexOf(modules) === -1) {
    throw new Error("Preset es2015 'modules' option must be 'false' to indicate no modules\n" +
      "or a module type which be be one of: 'commonjs' (default), 'amd', 'umd', 'systemjs'");
  }

  return {
    plugins: [
      [require("babel-plugin-transform-es2015-template-literals"), { loose }],
      require("babel-plugin-transform-es2015-literals"),
      require("babel-plugin-transform-es2015-function-name"),
      [require("babel-plugin-transform-es2015-arrow-functions")],
      require("babel-plugin-transform-es2015-block-scoped-functions"),
      [require("babel-plugin-transform-es2015-classes"), { loose }],
      require("babel-plugin-transform-es2015-object-super"),
      require("babel-plugin-transform-es2015-shorthand-properties"),
      require("babel-plugin-transform-es2015-duplicate-keys"),
      [require("babel-plugin-transform-es2015-computed-properties"), { loose }],
      [require("babel-plugin-transform-es2015-for-of"), { loose }],
      require("babel-plugin-transform-es2015-sticky-regex"),
      require("babel-plugin-transform-es2015-unicode-regex"),
      require("babel-plugin-check-es2015-constants"),
      [require("babel-plugin-transform-es2015-spread"), { loose }],
      require("babel-plugin-transform-es2015-parameters"),
      [require("babel-plugin-transform-es2015-destructuring"), { loose }],
      require("babel-plugin-transform-es2015-block-scoping"),
      require("babel-plugin-transform-es2015-typeof-symbol"),
      modules === "commonjs" && [require("babel-plugin-transform-es2015-modules-commonjs"), { loose }],
      modules === "systemjs" && require("babel-plugin-transform-es2015-modules-systemjs"),
      modules === "amd" && require("babel-plugin-transform-es2015-modules-amd"),
      modules === "umd" && require("babel-plugin-transform-es2015-modules-umd"),
      [require("babel-plugin-transform-regenerator"), { async: false, asyncGenerators: false }]
    // filter out falsy values
    ].filter(Boolean)
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
