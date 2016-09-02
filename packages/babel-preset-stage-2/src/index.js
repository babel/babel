import * as presetStage3 from "babel-preset-stage-3";

import transformClassProperties from "babel-plugin-transform-class-properties";
import transformObjectRestSpread from "babel-plugin-transform-object-rest-spread";
import transformDecorators from "babel-plugin-transform-decorators";

export const presets = [
  presetStage3
];

export const plugins = [
  transformClassProperties,
  transformObjectRestSpread,
  transformDecorators
];
