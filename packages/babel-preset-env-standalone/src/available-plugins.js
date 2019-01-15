import { availablePlugins, registerPlugin } from "@babel/standalone";

const notIncludedPlugins = {
  "transform-named-capturing-groups-regex": require("@babel/plugin-transform-named-capturing-groups-regex"),
  "transform-new-target": require("@babel/plugin-transform-new-target"),
  "proposal-json-strings": require("@babel/plugin-proposal-json-strings"),
};

Object.keys(notIncludedPlugins).forEach(pluginName => {
  if (!availablePlugins[pluginName]) {
    registerPlugin(pluginName, notIncludedPlugins[pluginName]);
  }
});

export default availablePlugins;
