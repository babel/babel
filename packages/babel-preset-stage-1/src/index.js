import * as presetStage2 from "babel-preset-stage-2";

import transformClassConstructorCall from "babel-plugin-transform-class-constructor-call";
import transformExportExtensions from "babel-plugin-transform-export-extensions";

export const presets = [
  presetStage2
];

export const plugins = [
  transformClassConstructorCall,
  transformExportExtensions
];
