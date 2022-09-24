import originalPlugins from "@babel/compat-data/plugins";
import originalPluginsBugfixes from "@babel/compat-data/plugin-bugfixes";
import originalOverlappingPlugins from "@babel/compat-data/overlapping-plugins";
import availablePlugins from "./available-plugins";

const keys: <O extends object>(o: O) => (keyof O)[] = Object.keys;

export const plugins = filterAvailable(proposalToTransform(originalPlugins));
export const pluginsBugfixes = filterAvailable(
  proposalToTransform(originalPluginsBugfixes),
);
export const overlappingPlugins = proposalToTransform(
  originalOverlappingPlugins,
);

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

// TODO(Babel 8): Store the plugins directly as transform- in @babel/compat-data
function proposalToTransform<Data extends { [name: string]: unknown }>(
  plugins: Data,
): {
  [Name in keyof Data as Name extends `proposal-${infer Feat}`
    ? `transform-${Feat}`
    : Name]: Data[Name];
} {
  const result = {} as any;
  for (const plugin of keys(plugins)) {
    result[(plugin as string).replace(/^proposal-/, "transform-")] =
      plugins[plugin];
  }
  return result;
}
