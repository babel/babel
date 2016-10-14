import resolve from "./resolve";
import getPossiblePresetNames from "./get-possible-preset-names";

export default function resolvePreset(presetName: string, dirname: string = process.cwd()): ?string {
  return getPossiblePresetNames(presetName).reduce((accum, curr) => accum || resolve(curr, dirname), null);
}
