import { availablePlugins } from "babel-standalone";

const notIncludedPlugins = {
  "transform-new-target": require("babel-plugin-transform-new-target"),
};

Object.keys(notIncludedPlugins).forEach(pluginName => {
  if (!availablePlugins[pluginName]) {
    availablePlugins[pluginName] = notIncludedPlugins[pluginName];
  }
});

export default availablePlugins;
