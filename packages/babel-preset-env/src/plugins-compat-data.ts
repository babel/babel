import plugins from "@babel/compat-data/plugins";
import bugfixPlugins from "@babel/compat-data/plugin-bugfixes";
import availablePlugins from "./available-plugins";

const pluginsFiltered = {};
const bugfixPluginsFiltered = {};

for (const plugin of Object.keys(plugins)) {
  if (Object.hasOwnProperty.call(availablePlugins, plugin)) {
    // @ts-expect-error fixme: refine pluginsFiltered types
    pluginsFiltered[plugin] = plugins[plugin];
  }
}

for (const plugin of Object.keys(bugfixPlugins)) {
  if (Object.hasOwnProperty.call(availablePlugins, plugin)) {
    // @ts-expect-error fixme: refine bugfixPluginsFiltered types
    bugfixPluginsFiltered[plugin] = bugfixPlugins[plugin];
  }
}

export { pluginsFiltered as plugins, bugfixPluginsFiltered as pluginsBugfixes };
