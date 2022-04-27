import { declarePreset } from "@babel/helper-plugin-utils";
import transformFlowStripTypes from "@babel/plugin-transform-flow-strip-types";
import normalizeOptions from "./normalize-options";

export default declarePreset((api, opts) => {
  api.assertVersion(7);
  const { all, allowDeclareFields } = normalizeOptions(opts);

  return {
    plugins: [[transformFlowStripTypes, { all, allowDeclareFields }]],
  };
});
