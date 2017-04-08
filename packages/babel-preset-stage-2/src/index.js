import presetStage3 from "babel-preset-stage-3";

import transformClassProperties from "babel-plugin-transform-class-properties";
import transformUnicodePropertyRegex from "babel-plugin-transform-unicode-property-regex";

export default function () {
  return {
    presets: [
      presetStage3,
    ],
    plugins: [
      transformClassProperties,
      transformUnicodePropertyRegex,
    ],
  };
}
