import { availablePlugins, registerPlugin } from "@babel/standalone";

const notIncludedPlugins = {
  "transform-new-target": require("@babel/plugin-transform-new-target"),
  "proposal-json-strings": require("@babel/plugin-proposal-json-strings"),
};

Object.keys(notIncludedPlugins).forEach(pluginName => {
  if (!availablePlugins[pluginName]) {
    registerPlugin(pluginName, notIncludedPlugins[pluginName]);
  }
});

export default availablePlugins;
