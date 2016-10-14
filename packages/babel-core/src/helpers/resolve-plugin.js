import resolve from "./resolve";
import getPossiblePluginNames from "./get-possible-plugin-names";

export default function resolvePlugin(pluginName: string, dirname: string = process.cwd()): ?string {
  return getPossiblePluginNames(pluginName).reduce((accum, curr) => accum || resolve(curr, dirname), null);
}
