//@flow

import type { Targets } from "./types";

import semver from "semver";
import { semverify, isUnreleasedVersion } from "./utils";

export const isPluginRequired = (
  supportedEnvironments: Targets,
  plugin: Targets,
): boolean => {
  const targetEnvironments: Array<string> = Object.keys(supportedEnvironments);

  if (targetEnvironments.length === 0) {
    return true;
  }

  const isRequiredForEnvironments: Array<string> = targetEnvironments.filter(
    environment => {
      // Feature is not implemented in that environment
      if (!plugin[environment]) {
        return true;
      }

      const lowestImplementedVersion: string = plugin[environment];
      const lowestTargetedVersion: string = supportedEnvironments[environment];
      // If targets has unreleased value as a lowest version, then don't require a plugin.
      if (isUnreleasedVersion(lowestTargetedVersion, environment)) {
        return false;
        // Include plugin if it is supported in the unreleased environment, which wasn't specified in targets
      } else if (isUnreleasedVersion(lowestImplementedVersion, environment)) {
        return true;
      }

      if (!semver.valid(lowestTargetedVersion)) {
        throw new Error(
          `Invalid version passed for target "${environment}": "${lowestTargetedVersion}". ` +
            "Versions must be in semver format (major.minor.patch)",
        );
      }

      return semver.gt(
        semverify(lowestImplementedVersion),
        lowestTargetedVersion,
      );
    },
  );

  return isRequiredForEnvironments.length > 0;
};

export const filterItems = (
  list,
  includes,
  excludes,
  targets,
  defaultIncludes,
  defaultExcludes,
  pluginSyntaxMap,
): Set<string> => {
  const result = new Set();

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
};
