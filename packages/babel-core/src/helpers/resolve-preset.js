import resolveFromPossibleNames from "./resolve-from-possible-names";
import getPossiblePresetNames from "./get-possible-preset-names";

export default function resolvePreset(presetName: string, dirname: string = process.cwd()): ?string {
  return resolveFromPossibleNames(getPossiblePresetNames(presetName), dirname);
}
