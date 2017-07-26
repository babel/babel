import presetStage3 from "babel-preset-stage-3";

import transformClassProperties from "babel-plugin-transform-class-properties";
import transformFunctionSent from "babel-plugin-transform-function-sent";

export default function() {
  return {
    presets: [presetStage3],
    plugins: [transformClassProperties, transformFunctionSent],
  };
}
