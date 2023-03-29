import { declarePreset } from "@babel/helper-plugin-utils";
import transformFlowStripTypes from "@babel/plugin-transform-flow-strip-types";
import normalizeOptions from "./normalize-options";

export default declarePreset((api, opts) => {
  api.assertVersion(7);
  const {
    all,
    allowDeclareFields,
    ignoreExtensions = false,
  } = normalizeOptions(opts);

  const flowPlugin = [transformFlowStripTypes, { all, allowDeclareFields }];

  // TODO: In Babel 7, ignoreExtensions is always true.
  // Allow setting it to false in the next minor.
  if (process.env.BABEL_8_BREAKING ? ignoreExtensions : true) {
    return { plugins: [flowPlugin] };
  }

  if (process.env.BABEL_8_BREAKING) {
    return {
      overrides: [
        {
          test: filename => filename == null || !/\.tsx?$/.test(filename),
          plugins: [flowPlugin],
        },
      ],
    };
  } else {
    // unreachable
  }
});
