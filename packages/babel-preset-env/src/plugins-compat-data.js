// @flow

import plugins from "@babel/compat-data/plugins";
import availablePlugins from "./available-plugins";

const filtered = {};
for (const plugin of Object.keys(plugins)) {
  if (Object.hasOwnProperty.call(availablePlugins, plugin)) {
    filtered[plugin] = plugins[plugin];
  }
}

export { filtered as default };
