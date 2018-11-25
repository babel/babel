import type { Targets } from "./types";

const defaultWebIncludes = ["web.timers", "web.immediate", "web.dom.iterable"];
const defaultExcludesForLooseMode = ["transform-typeof-symbol"];

export const getPlatformSpecificDefaultFor = (
  targets: Targets,
): ?Array<string> => {
  const targetNames = Object.keys(targets);
  const isAnyTarget = !targetNames.length;
  const isWebTarget = targetNames.some(name => name !== "node");

  return isAnyTarget || isWebTarget ? defaultWebIncludes : null;
};

export const getOptionSpecificExcludesFor = ({
  loose,
}: {
  loose: boolean,
}): ?Array<string> => {
  if (loose) {
    return defaultExcludesForLooseMode;
  }
  return null;
};
