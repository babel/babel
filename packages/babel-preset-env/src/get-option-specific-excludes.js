const defaultExcludesForLooseMode = ["transform-typeof-symbol"];

export default function({ loose }) {
  return loose ? defaultExcludesForLooseMode : null;
}
