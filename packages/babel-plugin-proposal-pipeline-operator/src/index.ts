import { declare } from "@babel/helper-plugin-utils";
import syntaxPipelineOperator from "@babel/plugin-syntax-pipeline-operator";
import hackVisitor from "./hackVisitor.ts";
import fsharpVisitor from "./fsharpVisitor.ts";
import type { Options } from "@babel/plugin-syntax-pipeline-operator";

const visitorsPerProposal = {
  hack: hackVisitor,
  fsharp: fsharpVisitor,
};

export default declare((api, options: Options) => {
  api.assertVersion(REQUIRED_VERSION(7));

  return {
    name: "proposal-pipeline-operator",
    inherits: syntaxPipelineOperator,
    visitor: visitorsPerProposal[options.proposal],
  };
});
