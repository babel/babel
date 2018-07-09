import { TransformModeOption } from "./options";
import type { Targets, TransformModeOption } from "./types";

const defaultWebIncludes = ["web.timers", "web.immediate", "web.dom.iterable"];
const defaultExcludesForPerformanceMode = ["transform-typeof-symbol"];

export const getPlatformSpecificDefaultFor = (
  targets: Targets,
): ?Array<string> => {
  const targetNames = Object.keys(targets);
  const isAnyTarget = !targetNames.length;
  const isWebTarget = targetNames.some(name => name !== "node");

  return isAnyTarget || isWebTarget ? defaultWebIncludes : null;
};

export const getOptionSpecificExcludesFor = ({
  transformMode,
}: {
  transformMode: TransformModeOption,
}): ?Array<string> => {
  if (transformMode === TransformModeOption.performance) {
    return defaultExcludesForPerformanceMode;
  }
  return null;
};
