import semver from "semver";
import { getMinVersion } from "./available-plugins";

export function addProposalSyntaxPlugins(
  items: Set<string>,
  proposalSyntaxPlugins: readonly string[],
) {
  proposalSyntaxPlugins.forEach(plugin => {
    items.add(plugin);
  });
}
export function removeUnnecessaryItems(
  items: Set<string>,
  overlapping: { [name: string]: string[] },
) {
  items.forEach(item => {
    overlapping[item]?.forEach(name => items.delete(name));
  });
}
export function removeUnsupportedItems(
  items: Set<string>,
  babelVersion: string,
) {
  items.forEach(item => {
    const minVersion = getMinVersion(item);
    if (minVersion && semver.lt(babelVersion, minVersion)) {
      items.delete(item);
    }
  });
}
