import { declarePreset } from "@babel/helper-plugin-utils";
import transformFlowStripTypes from "@babel/plugin-transform-flow-strip-types";
import normalizeOptions from "./normalize-options.ts";

export default declarePreset((api, opts) => {
  api.assertVersion(REQUIRED_VERSION("^7.0.0-0 || ^8.0.0"));
  const {
    all,
    ignoreExtensions = false,
    experimental_useHermesParser: useHermesParser = false,
  } = normalizeOptions(opts);

  const plugins: any[] = [[transformFlowStripTypes, { all }]];

  if (useHermesParser) {
    if (IS_STANDALONE) {
      throw new Error(
        "The Hermes parser is not supported in the @babel/standalone.",
      );
    }
    plugins.unshift("babel-plugin-syntax-hermes-parser");
  }

  if (ignoreExtensions) {
    return { plugins };
  }

  return {
    overrides: [
      {
        test: filename => filename == null || !/\.tsx?$/.test(filename),
        plugins,
      },
    ],
  };
});
