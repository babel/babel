import { declare } from "@babel/helper-plugin-utils";
import transformFlowStripTypes from "@babel/plugin-transform-flow-strip-types";

export default declare(
  (api, { all, allowDeclareFields, ignoreExtensions = false }) => {
    api.assertVersion(7);

    const flowPlugin = [transformFlowStripTypes, { all, allowDeclareFields }];

    if (ignoreExtensions) {
      return { plugins: [flowPlugin] };
    }

    return {
      overrides: [
        {
          test: filename => filename == null || !/\.tsx?$/.test(filename),
          plugins: [flowPlugin],
        },
      ],
    };
  },
);
