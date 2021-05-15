import semver from "semver";
import { unreleasedLabels } from "./targets";

export function prettifyVersion(version: string) {
  if (typeof version !== "string") {
    return version;
  }

  const parts = [semver.major(version)];
  const minor = semver.minor(version);
  const patch = semver.patch(version);

  if (minor || patch) {
    parts.push(minor);
  }

  if (patch) {
    parts.push(patch);
  }

  return parts.join(".");
}

export function prettifyTargets(targets: Targets): Targets {
  return Object.keys(targets).reduce((results, target) => {
    let value = targets[target];

    const unreleasedLabel = unreleasedLabels[target];
    if (typeof value === "string" && unreleasedLabel !== value) {
      value = prettifyVersion(value);
    }

    results[target] = value;
    return results;
  }, {});
}
