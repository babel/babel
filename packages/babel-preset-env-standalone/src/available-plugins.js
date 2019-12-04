import { availablePlugins, registerPlugin } from "@babel/standalone";
import proposalJsonStrings from "@babel/plugin-proposal-json-strings";
import proposalDynamicImport from "@babel/plugin-proposal-dynamic-import";
import proposalNullishCoalescingOperator from "@babel/plugin-proposal-nullish-coalescing-operator";
import proposalOptionalChaining from "@babel/plugin-proposal-optional-chaining";
import syntaxJsonStrings from "@babel/plugin-syntax-json-strings";
import syntaxNullishCoalescingOperator from "@babel/plugin-syntax-nullish-coalescing-operator";
import syntaxOptionalChaining from "@babel/plugin-syntax-nullish-coalescing-operator";
import syntaxTopLevelAwait from "@babel/plugin-syntax-top-level-await";
import transformNamedCapturingGroupsRegex from "@babel/plugin-transform-named-capturing-groups-regex";
import transformNewTarget from "@babel/plugin-transform-new-target";

const notIncludedPlugins = {
  "proposal-dynamic-import": proposalDynamicImport,
  "proposal-json-strings": proposalJsonStrings,
  "proposal-nullish-coalescing-operator": proposalNullishCoalescingOperator,
  "proposal-optional-chaining": proposalOptionalChaining,
  "syntax-json-strings": syntaxJsonStrings,
  "syntax-nullish-coalescing-operator": syntaxNullishCoalescingOperator,
  "syntax-optional-chaining": syntaxOptionalChaining,
  "syntax-top-level-await": syntaxTopLevelAwait,
  "transform-named-capturing-groups-regex": transformNamedCapturingGroupsRegex,
  "transform-new-target": transformNewTarget,
};

Object.keys(notIncludedPlugins).forEach(pluginName => {
  if (!availablePlugins[pluginName]) {
    registerPlugin(pluginName, notIncludedPlugins[pluginName]);
  }
});

export default availablePlugins;
