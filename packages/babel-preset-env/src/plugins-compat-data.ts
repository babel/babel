import originalPlugins from "@babel/compat-data/plugins";
import originalPluginsBugfixes from "@babel/compat-data/plugin-bugfixes";
import originalOverlappingPlugins from "@babel/compat-data/overlapping-plugins";
import { hasPlugin } from "./available-plugins";

const keys: <O extends object>(o: O) => (keyof O)[] = Object.keys;

export const plugins = filterAvailable(originalPlugins);
export const pluginsBugfixes = filterAvailable(originalPluginsBugfixes);
export const overlappingPlugins = filterAvailable(originalOverlappingPlugins);

function filterAvailable<Data extends object>(data: Data): Data {
  const result = {} as any;
  for (const plugin of keys(data)) {
    if (hasPlugin(plugin as string)) {
      result[plugin] = data[plugin];
    }
  }
  return result;
}
