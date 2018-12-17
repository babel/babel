import type { Targets } from "./types";

const defaultWebIncludes = [
  "web.dom-collections.for-each",
  "web.dom-collections.iterator",
  "web.immediate",
  "web.queue-microtask",
  "web.timers",
  "web.url",
  "web.url.to-json",
  "web.url-search-params",
  "web.url-search-params.sort",
];

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
