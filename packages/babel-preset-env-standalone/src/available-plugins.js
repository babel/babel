import { availablePlugins, registerPlugin } from "@babel/standalone";

const notIncludedPlugins = {
  "transform-named-capturing-groups-regex": require("@babel/plugin-transform-named-capturing-groups-regex"),
  "transform-new-target": require("@babel/plugin-transform-new-target"),
  "proposal-json-strings": require("@babel/plugin-proposal-json-strings"),
  "proposal-dynamic-import": require("@babel/plugin-proposal-dynamic-import"),
  "syntax-json-strings": require("@babel/plugin-syntax-json-strings"),
  "syntax-top-level-await": require("@babel/plugin-syntax-top-level-await"),
};

Object.keys(notIncludedPlugins).forEach(pluginName => {
  if (!availablePlugins[pluginName]) {
    registerPlugin(pluginName, notIncludedPlugins[pluginName]);
  }
});

export default availablePlugins;
