import * as presetStage1 from "babel-preset-stage-1";

import transformDoExpressions from "babel-plugin-transform-do-expressions";
import transformFunctionBind from "babel-plugin-transform-function-bind";

export const presets = [
  presetStage1
];

export const plugins = [
  transformDoExpressions,
  transformFunctionBind
];
