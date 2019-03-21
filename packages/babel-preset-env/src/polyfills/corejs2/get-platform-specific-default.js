// @flow

import type { Targets } from "../../types";

export const defaultWebIncludes = [
  "web.timers",
  "web.immediate",
  "web.dom.iterable",
];

export default function(targets: Targets): null | string[] {
  const targetNames = Object.keys(targets);
  const isAnyTarget = !targetNames.length;
  const isWebTarget = targetNames.some(name => name !== "node");

  return isAnyTarget || isWebTarget ? defaultWebIncludes : null;
}
