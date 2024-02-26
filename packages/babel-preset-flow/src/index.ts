import { declarePreset } from "@babel/helper-plugin-utils";
import transformFlowStripTypes from "@babel/plugin-transform-flow-strip-types";
import normalizeOptions from "./normalize-options.ts";

export default declarePreset((api, opts) => {
  api.assertVersion(
    process.env.BABEL_8_BREAKING && process.env.IS_PUBLISH
      ? PACKAGE_JSON.version
      : 7,
  );
  const {
    all,
    allowDeclareFields,
    ignoreExtensions = false,
    experimental_useHermesParser: useHermesParser = false,
  } = normalizeOptions(opts);

  const plugins: any[] = [
    [transformFlowStripTypes, { all, allowDeclareFields }],
  ];

  if (useHermesParser) {
    if (Number.parseInt(process.versions.node, 10) < 12) {
      throw new Error(
        "The Hermes parser is only supported in Node 12 and later.",
      );
    }
    if (IS_STANDALONE) {
      throw new Error(
        "The Hermes parser is not supported in the @babel/standalone.",
      );
    }
    plugins.unshift("babel-plugin-syntax-hermes-parser");
  }

  // TODO: In Babel 7, ignoreExtensions is always true.
  // Allow setting it to false in the next minor.
  if (process.env.BABEL_8_BREAKING ? ignoreExtensions : true) {
    return { plugins };
  }

  if (process.env.BABEL_8_BREAKING) {
    return {
      overrides: [
        {
          test: filename => filename == null || !/\.tsx?$/.test(filename),
          plugins,
        },
      ],
    };
  } else {
    // unreachable
  }
});
