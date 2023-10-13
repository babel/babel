import { declare } from "@babel/helper-plugin-utils";
import syntaxPipelineOperator from "@babel/plugin-syntax-pipeline-operator";
import minimalVisitor from "./minimalVisitor.ts";
import hackVisitor from "./hackVisitor.ts";
import fsharpVisitor from "./fsharpVisitor.ts";
import smartVisitor from "./smartVisitor.ts";
import type { Options } from "@babel/plugin-syntax-pipeline-operator";

const visitorsPerProposal = {
  minimal: minimalVisitor,
  hack: hackVisitor,
  fsharp: fsharpVisitor,
  smart: smartVisitor,
};

export default declare((api, options: Options) => {
  api.assertVersion(
    process.env.BABEL_8_BREAKING && process.env.IS_PUBLISH
      ? PACKAGE_JSON.version
      : 7,
  );

  const { proposal } = options;

  if (proposal === "smart") {
    console.warn(
      `The smart-mix pipe operator is deprecated. Use "proposal": "hack" instead.`,
    );
  }

  return {
    name: "proposal-pipeline-operator",
    inherits: syntaxPipelineOperator,
    visitor: visitorsPerProposal[options.proposal],
  };
});
