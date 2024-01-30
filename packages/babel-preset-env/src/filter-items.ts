import semver from "semver";
import { minVersions } from "./available-plugins.ts";

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
    if (
      Object.hasOwn(minVersions, item) &&
      semver.lt(
        babelVersion,
        // @ts-expect-error we have checked minVersions[item] in has call
        minVersions[item],
      )
    ) {
      items.delete(item);
    }
  });
}
