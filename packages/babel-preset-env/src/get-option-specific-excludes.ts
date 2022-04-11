const defaultExcludesForLooseMode = ["transform-typeof-symbol"];

export default function ({ loose }: { loose: boolean }): null | string[] {
  return loose ? defaultExcludesForLooseMode : null;
}
