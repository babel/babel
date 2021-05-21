import plugins from "@babel/compat-data/plugins";
import bugfixPlugins from "@babel/compat-data/plugin-bugfixes";
import availablePlugins from "./available-plugins";

const pluginsFiltered = {};
const bugfixPluginsFiltered = {};

for (const plugin of Object.keys(plugins)) {
  if (Object.hasOwnProperty.call(availablePlugins, plugin)) {
    pluginsFiltered[plugin] = plugins[plugin];
  }
}

for (const plugin of Object.keys(bugfixPlugins)) {
  if (Object.hasOwnProperty.call(availablePlugins, plugin)) {
    bugfixPluginsFiltered[plugin] = bugfixPlugins[plugin];
  }
}

pluginsFiltered["proposal-class-properties"] =
  pluginsFiltered["proposal-private-methods"];

export { pluginsFiltered as plugins, bugfixPluginsFiltered as pluginsBugfixes };
