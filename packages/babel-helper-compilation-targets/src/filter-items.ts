// TODO(Babel 8): Use "semver" directly
import semver from "@nicolo-ribaudo/semver-v6";

import pluginsCompatData from "@babel/compat-data/plugins";

import type { Targets } from "./types";
import {
  getLowestImplementedVersion,
  isUnreleasedVersion,
  semverify,
} from "./utils";

export function targetsSupported(target: Targets, support: Targets) {
  const targetEnvironments = Object.keys(target) as Array<keyof Targets>;

  if (targetEnvironments.length === 0) {
    return false;
  }

  const unsupportedEnvironments = targetEnvironments.filter(environment => {
    const lowestImplementedVersion = getLowestImplementedVersion(
      support,
      environment,
    );

    // Feature is not implemented in that environment
    if (!lowestImplementedVersion) {
      return true;
    }

    const lowestTargetedVersion = target[environment];

    // If targets has unreleased value as a lowest version, then don't require a plugin.
    if (isUnreleasedVersion(lowestTargetedVersion, environment)) {
      return false;
    }

    // Include plugin if it is supported in the unreleased environment, which wasn't specified in targets
    if (isUnreleasedVersion(lowestImplementedVersion, environment)) {
      return true;
    }

    if (!semver.valid(lowestTargetedVersion.toString())) {
      throw new Error(
        `Invalid version passed for target "${environment}": "${lowestTargetedVersion}". ` +
          "Versions must be in semver format (major.minor.patch)",
      );
    }

    return semver.gt(
      semverify(lowestImplementedVersion),
      lowestTargetedVersion.toString(),
    );
  });

  return unsupportedEnvironments.length === 0;
}

export function isRequired(
  name: string,
  targets: Targets,
  {
    compatData = pluginsCompatData,
    includes,
    excludes,
  }: {
    compatData?: { [feature: string]: Targets };
    includes?: Set<string>;
    excludes?: Set<string>;
  } = {},
) {
  if (excludes?.has(name)) return false;
  if (includes?.has(name)) return true;
  return !targetsSupported(targets, compatData[name]);
}

export default function filterItems(
  list: { [feature: string]: Targets },
  includes: Set<string>,
  excludes: Set<string>,
  targets: Targets,
  defaultIncludes: Array<string> | null,
  defaultExcludes?: Array<string> | null,
  pluginSyntaxMap?: Map<string, string | null>,
) {
  const result = new Set<string>();
  const options = { compatData: list, includes, excludes };

  for (const item in list) {
    if (isRequired(item, targets, options)) {
      result.add(item);
    } else if (pluginSyntaxMap) {
      const shippedProposalsSyntax = pluginSyntaxMap.get(item);

      if (shippedProposalsSyntax) {
        result.add(shippedProposalsSyntax);
      }
    }
  }

  defaultIncludes?.forEach(item => !excludes.has(item) && result.add(item));
  defaultExcludes?.forEach(item => !includes.has(item) && result.delete(item));

  return result;
}
