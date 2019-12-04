import { availablePlugins, registerPlugin } from "@babel/standalone";

const notIncludedPlugins = {
  "transform-named-capturing-groups-regex": require("@babel/plugin-transform-named-capturing-groups-regex"),
  "transform-new-target": require("@babel/plugin-transform-new-target"),
  "proposal-json-strings": require("@babel/plugin-proposal-json-strings"),
  "proposal-dynamic-import": require("@babel/plugin-proposal-dynamic-import"),
  "proposal-nullish-coalescing-operator": require("@babel/plugin-proposal-nullish-coalescing-operator"),
  "syntax-json-strings": require("@babel/plugin-syntax-json-strings"),
  "syntax-top-level-await": require("@babel/plugin-syntax-top-level-await"),
  "syntax-nullish-coalescing-operator": require("@babel/plugin-syntax-nullish-coalescing-operator"),
};

Object.keys(notIncludedPlugins).forEach(pluginName => {
  if (!availablePlugins[pluginName]) {
    registerPlugin(pluginName, notIncludedPlugins[pluginName]);
  }
});

export default availablePlugins;
