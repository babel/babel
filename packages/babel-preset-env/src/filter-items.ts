/// <reference path="../../../lib/semver.d.ts" />

// TODO(Babel 8): Use "semver" directly
import semver from "@nicolo-ribaudo/semver-v6";
import { minVersions } from "./available-plugins";

const has = Function.call.bind(Object.hasOwnProperty);

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
      has(minVersions, item) &&
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
