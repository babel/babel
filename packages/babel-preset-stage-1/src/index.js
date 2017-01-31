import presetStage2 from "babel-preset-stage-2";

import transformClassConstructorCall from "babel-plugin-transform-class-constructor-call";
import transformExportExtensions from "babel-plugin-transform-export-extensions";

function preset(context, opts = {}) {
  return {
    presets: [
      [presetStage2.buildPreset, opts]
    ],
    plugins: [
      transformClassConstructorCall,
      transformExportExtensions
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
