import resolveFromPossibleNames from "./resolve-from-possible-names";
import getPossiblePluginNames from "./get-possible-plugin-names";

export default function resolvePlugin(pluginName: string, dirname: string = process.cwd()): ?string {
  return resolveFromPossibleNames(getPossiblePluginNames(pluginName), dirname);
}
