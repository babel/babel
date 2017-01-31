import syntaxTrailingFunctionCommas from "babel-plugin-syntax-trailing-function-commas";
import transformAsyncToGenerator from "babel-plugin-transform-async-to-generator";
import transformExponentiationOperator from "babel-plugin-transform-exponentiation-operator";
import transformObjectRestSpread from "babel-plugin-transform-object-rest-spread";
import transformAsyncGeneratorFunctions from "babel-plugin-transform-async-generator-functions";

function preset(context, opts = {}) {
  let useBuiltIns = false;
  if (opts.useBuiltIns !== undefined) useBuiltIns = opts.useBuiltIns;
  if (typeof useBuiltIns !== "boolean") throw new Error("Preset stage3 'useBuiltIns' option must be a boolean.");

  return {
    plugins: [
      syntaxTrailingFunctionCommas, // in ES2017 (remove as a breaking change)
      transformAsyncToGenerator, // in ES2017 (remove as a breaking change)
      transformExponentiationOperator,  // in ES2016 (remove as a breaking change)
      transformAsyncGeneratorFunctions,
      [transformObjectRestSpread, { useBuiltIns }]
    ]
  };
}

/**
 * This preset was originally an object, before function-based configurable presets were introduced.
 * For backward-compatibility with anything that may have been loading this preset and expecting
 * it to be a simple Babel config object, we export the old config here via default object.
 */
const oldConfig = preset({});

export default oldConfig;

// However, for backward compatibility with babel-core < v6.13.x, we use the 'buildPreset'
// property of the preset object for the preset creation function with the enumerability
// caveat mentioned below.
Object.defineProperty(oldConfig, "buildPreset", {
  configurable: true,
  writable: true,
  // We make this non-enumerable so old versions of babel-core won't see it as an unknown property,
  // while allowing new versions to see it as a preset builder function.
  enumerable: false,
  value: preset,
});
