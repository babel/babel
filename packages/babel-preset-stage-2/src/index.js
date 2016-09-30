import presetStage3 from "babel-preset-stage-3";

import transformClassProperties from "babel-plugin-transform-class-properties";
import transformDecorators from "babel-plugin-transform-decorators";

export default {
  presets: [
    presetStage3
  ],
  plugins: [
    transformClassProperties,
    transformDecorators
  ]
};
