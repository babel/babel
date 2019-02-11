export const defaultWebIncludes = [
  "web.timers",
  "web.immediate",
  "web.dom.iterable",
];

export default function(targets) {
  const targetNames = Object.keys(targets);
  const isAnyTarget = !targetNames.length;
  const isWebTarget = targetNames.some(name => name !== "node");

  return isAnyTarget || isWebTarget ? defaultWebIncludes : null;
}
