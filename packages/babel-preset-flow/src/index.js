import transformFlowStripTypes from "babel-plugin-transform-flow-strip-types";
import transformClassProperties from "babel-plugin-transform-class-properties";

export default {
  plugins: [
    transformFlowStripTypes,
    transformClassProperties
  ]
};
