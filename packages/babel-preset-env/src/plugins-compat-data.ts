import originalPlugins from "@babel/compat-data/plugins";
import originalPluginsBugfixes from "@babel/compat-data/plugin-bugfixes";
import originalOverlappingPlugins from "@babel/compat-data/overlapping-plugins";
import availablePlugins from "./available-plugins";

const keys: <O extends object>(o: O) => (keyof O)[] = Object.keys;

export const plugins = filterAvailable(originalPlugins);
export const pluginsBugfixes = filterAvailable(originalPluginsBugfixes);
export const overlappingPlugins = filterAvailable(originalOverlappingPlugins);

function filterAvailable<Data extends { [name: string]: unknown }>(
  data: Data,
): { [Name in keyof Data & keyof typeof availablePlugins]: Data[Name] } {
  const result = {} as any;
  for (const plugin of keys(data)) {
    if (Object.hasOwnProperty.call(availablePlugins, plugin)) {
      result[plugin] = data[plugin];
    }
  }
  return result;
}
