import semver from "semver";
import { prettifyVersion } from "./pretty";
import {
  semverify,
  isUnreleasedVersion,
  getLowestImplementedVersion,
} from "./utils";
import type { Target, Targets } from "./types";

export function getInclusionReasons(
  item: string,
  targetVersions: Targets,
  list: { [key: string]: Targets },
) {
  const minVersions = list[item] || ({} as Targets);

  return (Object.keys(targetVersions) as Target[]).reduce((result, env) => {
    const minVersion = getLowestImplementedVersion(minVersions, env);
    const targetVersion = targetVersions[env];

    if (!minVersion) {
      result[env] = prettifyVersion(targetVersion);
    } else {
      const minIsUnreleased = isUnreleasedVersion(minVersion, env);
      const targetIsUnreleased = isUnreleasedVersion(targetVersion, env);

      if (
        !targetIsUnreleased &&
        (minIsUnreleased ||
          semver.lt(targetVersion.toString(), semverify(minVersion)))
      ) {
        result[env] = prettifyVersion(targetVersion);
      }
    }

    return result;
  }, {} as Partial<Record<Target, string>>);
}
