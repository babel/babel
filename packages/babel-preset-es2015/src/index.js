/**
 * This file is a bit of a mess. If you're looking at it as a reference for how to write a preset,
 * I'd recommend looking only at `function preset(){}` and ignoring the rest, unless your new preset
 * really needs to work on babel-core < 6.13.x, which is unlikely.
 */

/**
 * This preset was originally an object, before function-based configurable presets were introduced.
 * For backward-compatibility with anything that may have been loading this preset and expecting
 * it to be a simple Babel config object, we maintain the old config here.
 */
module.exports = preset({});

// For backward compatibility with babel-core < v6.13.x, we use the 'buildPreset' property
// of the preset object for the preset creation function.
Object.defineProperty(module.exports, "buildPreset", {
  configurable: true,
  writable: true,
  // We make this non-enumerable so old versions of babel-core won't see it as an unknown property,
  // while allowing new versions to see it as a preset builder function.
  enumerable: false,
  value: preset,
});


function preset(context, opts) {
  const moduleTypes = ["commonjs", "amd", "umd", "systemjs"];
  let loose = false;
  let strict = true;
  let modules = "commonjs";
  let allowTopLevelThis = false;

  if (opts !== undefined) {
    if (opts.loose !== undefined) loose = opts.loose;
    if (opts.strict !== undefined) strict = opts.strict;
    if (opts.modules !== undefined) modules = opts.modules;
    if (opts.allowTopLevelThis !== undefined) allowTopLevelThis = opts.allowTopLevelThis;
  }

  if (typeof loose !== "boolean") throw new Error("Preset es2015 'loose' option must be a boolean.");
  if (typeof strict !== "boolean") {
    throw new Error("Preset es2015 'strict' option must be a boolean.");
  }
  if (typeof allowTopLevelThis !== "boolean") {
    throw new Error("Preset es2015 'allowTopLevelThis' option must be a boolean.");
  }
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
      modules === "commonjs" && [require("babel-plugin-transform-es2015-modules-commonjs"), {
        loose, 
        allowTopLevelThis, 
        strict
      }],
      modules === "systemjs" && [require("babel-plugin-transform-es2015-modules-systemjs"), { loose }],
      modules === "amd" && [require("babel-plugin-transform-es2015-modules-amd"), { loose }],
      modules === "umd" && [require("babel-plugin-transform-es2015-modules-umd"), { loose }],
      [require("babel-plugin-transform-regenerator"), { async: false, asyncGenerators: false }]
    // filter out falsy values
    ].filter(Boolean)
  };
}

