import originalPlugins from "@babel/compat-data/plugins" with { type: "json" };
import originalPluginsBugfixes from "@babel/compat-data/plugin-bugfixes" with { type: "json" };
import originalOverlappingPlugins from "@babel/compat-data/overlapping-plugins" with { type: "json" };
import availablePlugins from "./available-plugins.ts";

const keys: <O extends object>(o: O) => (keyof O)[] = Object.keys;

export const plugins = filterAvailable(originalPlugins);
export const pluginsBugfixes = filterAvailable(originalPluginsBugfixes);
export const overlappingPlugins = filterAvailable(originalOverlappingPlugins);

function filterAvailable<Data extends Record<string, unknown>>(
  data: Data,
): { [Name in keyof Data & keyof typeof availablePlugins]: Data[Name] } {
  const result = {} as any;
  for (const plugin of keys(data)) {
    if (Object.hasOwn(availablePlugins, plugin)) {
      result[plugin] = data[plugin];
    }
  }
  return result;
}
