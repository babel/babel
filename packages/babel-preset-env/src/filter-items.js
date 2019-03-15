// @flow
import semver from "semver";
import { semverify, isUnreleasedVersion } from "./utils";

import type { Targets } from "./types";

export function isPluginRequired(
  supportedEnvironments: Targets,
  plugin: Targets,
) {
  const targetEnvironments = Object.keys(supportedEnvironments);

  if (targetEnvironments.length === 0) {
    return true;
  }

  const isRequiredForEnvironments = targetEnvironments.filter(environment => {
    // Feature is not implemented in that environment
    if (!plugin[environment]) {
      return true;
    }

    const lowestImplementedVersion = plugin[environment];
    const lowestTargetedVersion = supportedEnvironments[environment];

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

  return isRequiredForEnvironments.length > 0;
}

export default function(
  list: { [feature: string]: Targets },
  includes: Set<string>,
  excludes: Set<string>,
  targets: Targets,
  defaultIncludes: Array<string> | null,
  defaultExcludes: Array<string> | null,
  pluginSyntaxMap: Map<string, string | null>,
) {
  const result = new Set<string>();

  for (const item in list) {
    if (
      !excludes.has(item) &&
      (isPluginRequired(targets, list[item]) || includes.has(item))
    ) {
      result.add(item);
    } else if (pluginSyntaxMap) {
      const shippedProposalsSyntax = pluginSyntaxMap.get(item);

      if (shippedProposalsSyntax) {
        result.add(shippedProposalsSyntax);
      }
    }
  }

  if (defaultIncludes) {
    defaultIncludes.forEach(item => !excludes.has(item) && result.add(item));
  }

  if (defaultExcludes) {
    defaultExcludes.forEach(item => !includes.has(item) && result.delete(item));
  }

  return result;
}
