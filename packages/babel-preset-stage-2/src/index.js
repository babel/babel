import presetStage3 from "babel-preset-stage-3";

import transformClassProperties from "babel-plugin-transform-class-properties";
import transformDecorators from "babel-plugin-transform-decorators";
import syntaxDynamicImport from "babel-plugin-syntax-dynamic-import";

function preset(context, opts = {}) {
  let spec = false;
  let useBuiltIns = false;

  if (opts.spec !== undefined) spec = opts.spec;
  if (typeof spec !== "boolean") {
    throw new Error("Preset stage-2 'spec' option must be a boolean.");
  }

  if (opts.useBuiltIns !== undefined) useBuiltIns = opts.useBuiltIns;
  if (typeof useBuiltIns !== "boolean") {
    throw new Error("Preset stage-2 'useBuiltIns' option must be a boolean.");
  }

  return {
    presets: [
      [presetStage3.buildPreset, { useBuiltIns }]
    ],
    plugins: [
      syntaxDynamicImport,
      [transformClassProperties, { spec }],
      transformDecorators
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
