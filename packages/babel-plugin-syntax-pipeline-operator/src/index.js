import { declare } from "@babel/helper-plugin-utils";

export const proposals = ["minimal", "fsharp", "hack"];
const documentationURL =
  "https://babeljs.io/docs/en/babel-plugin-proposal-pipeline-operator";

export default declare((api, { proposal }) => {
  api.assertVersion(7);

  if (typeof proposal !== "string" || !proposals.includes(proposal)) {
    const proposalList = proposals.map(p => `"${p}"`).join(", ");
    throw new Error(
      `The pipeline plugin requires a "proposal" option. "proposal" must be one of: ${proposalList}. See <${documentationURL}>.`,
    );
  }

  return {
    name: "syntax-pipeline-operator",

    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push(["pipelineOperator", { proposal }]);
    },
  };
});
