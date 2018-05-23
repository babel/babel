import { declare } from "@babel/helper-plugin-utils";
import transformFlowStripTypes from "@babel/plugin-transform-flow-strip-types";

export default declare(api => {
  api.assertVersion(7);

  return {
    plugins: [transformFlowStripTypes],
  };
});
