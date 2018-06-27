import { declare } from "@babel/helper-plugin-utils";

const proposals = ["minimal"];

export default declare((api, { proposal }) => {
  api.assertVersion(7);

  if (typeof proposal !== "string" || !proposals.includes(proposal)) {
    throw new Error("'proposal' must be one of: " + proposals.join(", "));
  }

  return {
    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push(["pipelineOperator", { proposal }]);
    },
  };
});
