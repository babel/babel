import type Parser from "./parser/index.ts";
import type { PluginConfig } from "./typings.ts";

export type Plugin = PluginConfig;

export type MixinPlugin = (
  superClass: new (...args: any) => Parser,
) => new (...args: any) => Parser;

const PIPELINE_PROPOSALS = ["fsharp", "hack"];
const TOPIC_TOKENS = ["^^", "@@", "^", "%", "#"];

export function validatePlugins(pluginsMap: Map<string, any>) {
  if (pluginsMap.has("decorators")) {
    if (pluginsMap.has("decorators-legacy")) {
      throw new Error(
        "Cannot use the decorators and decorators-legacy plugin together",
      );
    }

    const decoratorsBeforeExport =
      pluginsMap.get("decorators").decoratorsBeforeExport;
    if (
      decoratorsBeforeExport != null &&
      typeof decoratorsBeforeExport !== "boolean"
    ) {
      throw new Error(
        "'decoratorsBeforeExport' must be a boolean, if specified.",
      );
    }

    const allowCallParenthesized =
      pluginsMap.get("decorators").allowCallParenthesized;
    if (
      allowCallParenthesized != null &&
      typeof allowCallParenthesized !== "boolean"
    ) {
      throw new Error("'allowCallParenthesized' must be a boolean.");
    }
  }

  if (pluginsMap.has("flow") && pluginsMap.has("typescript")) {
    throw new Error("Cannot combine flow and typescript plugins.");
  }

  if (pluginsMap.has("placeholders") && pluginsMap.has("v8intrinsic")) {
    throw new Error("Cannot combine placeholders and v8intrinsic plugins.");
  }

  if (pluginsMap.has("pipelineOperator")) {
    const proposal = pluginsMap.get("pipelineOperator").proposal;

    if (!PIPELINE_PROPOSALS.includes(proposal)) {
      const proposalList = PIPELINE_PROPOSALS.map(p => `"${p}"`).join(", ");
      throw new Error(
        `"pipelineOperator" requires "proposal" option whose value must be one of: ${proposalList}.`,
      );
    }

    if (proposal === "hack") {
      if (pluginsMap.has("placeholders")) {
        throw new Error(
          "Cannot combine placeholders plugin and Hack-style pipes.",
        );
      }

      if (pluginsMap.has("v8intrinsic")) {
        throw new Error(
          "Cannot combine v8intrinsic plugin and Hack-style pipes.",
        );
      }

      const topicToken = pluginsMap.get("pipelineOperator").topicToken;

      if (!TOPIC_TOKENS.includes(topicToken)) {
        const tokenList = TOPIC_TOKENS.map(t => `"${t}"`).join(", ");

        throw new Error(
          `"pipelineOperator" in "proposal": "hack" mode also requires a "topicToken" option whose value must be one of: ${tokenList}.`,
        );
      }
    }
  }

  if (pluginsMap.has("moduleAttributes")) {
    throw new Error(
      "`moduleAttributes` has been removed in Babel 8, please migrate to import attributes instead.",
    );
  }

  if (pluginsMap.has("importAssertions")) {
    throw new Error(
      "`importAssertions` has been removed in Babel 8, please use import attributes instead.",
    );
  }

  if (pluginsMap.has("deprecatedImportAssert")) {
    console.warn(
      "`deprecatedImportAssert` has been removed in Babel 8, please use import attributes instead.",
    );
  } else if (
    pluginsMap.has("importAttributes") &&
    pluginsMap.get("importAttributes").deprecatedAssertSyntax
  ) {
    console.warn(
      "The 'importAttributes' plugin has been removed in Babel 8. Please migrate any usage of `assert`-style attributes to `with`.",
    );
  }

  if (pluginsMap.has("recordAndTuple")) {
    throw new Error(
      "The 'recordAndTuple' plugin has been removed in Babel 8. Please remove it from your configuration.",
    );
  }

  if (
    pluginsMap.has("asyncDoExpressions") &&
    !pluginsMap.has("doExpressions")
  ) {
    const error = new Error(
      "'asyncDoExpressions' requires 'doExpressions', please add 'doExpressions' to parser plugins.",
    );
    // @ts-expect-error so @babel/core can provide better error message
    error.missingPlugins = "doExpressions";
    throw error;
  }

  if (
    pluginsMap.has("optionalChainingAssign") &&
    pluginsMap.get("optionalChainingAssign").version !== "2023-07"
  ) {
    throw new Error(
      "The 'optionalChainingAssign' plugin requires a 'version' option," +
        " representing the last proposal update. Currently, the" +
        " only supported value is '2023-07'.",
    );
  }

  if (
    pluginsMap.has("discardBinding") &&
    pluginsMap.get("discardBinding").syntaxType !== "void"
  ) {
    throw new Error(
      "The 'discardBinding' plugin requires a 'syntaxType' option. Currently the only supported value is 'void'.",
    );
  }

  if (pluginsMap.has("decimal")) {
    throw new Error(
      "The 'decimal' plugin has been removed in Babel 8. Please remove it from your configuration.",
    );
  }
  if (pluginsMap.has("importReflection")) {
    throw new Error(
      "The 'importReflection' plugin has been removed in Babel 8. Use 'sourcePhaseImports' instead, and " +
        "replace 'import module' with 'import source' in your code.",
    );
  }
}

// These plugins are defined using a mixin which extends the parser class.

import estree from "./plugins/estree.ts";
import flow from "./plugins/flow/index.ts";
import jsx from "./plugins/jsx/index.ts";
import typescript from "./plugins/typescript/index.ts";
import placeholders from "./plugins/placeholders.ts";
import v8intrinsic from "./plugins/v8intrinsic.ts";

// NOTE: order is important. estree must come first; placeholders must come last.
export const mixinPlugins = {
  estree,
  jsx,
  flow,
  typescript,
  v8intrinsic,
  placeholders,
};

export const mixinPluginNames = Object.keys(mixinPlugins) as readonly (
  | "estree"
  | "jsx"
  | "flow"
  | "typescript"
  | "v8intrinsic"
  | "placeholders"
)[];
