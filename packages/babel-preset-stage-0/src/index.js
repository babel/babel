import presetStage1 from "babel-preset-stage-1";

import transformDoExpressions from "babel-plugin-transform-do-expressions";
import transformFunctionBind from "babel-plugin-transform-function-bind";

export default {
  presets: [
    presetStage1
  ],
  plugins: [
    transformDoExpressions,
    transformFunctionBind
  ]
};
