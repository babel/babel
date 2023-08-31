import semver from "semver";
import { unreleasedLabels } from "./targets.ts";
import type { Targets, Target } from "./types.ts";

export function prettifyVersion(version: string) {
  if (typeof version !== "string") {
    return version;
  }

  const { major, minor, patch } = semver.parse(version);

  const parts = [major];

  if (minor || patch) {
    parts.push(minor);
  }

  if (patch) {
    parts.push(patch);
  }

  return parts.join(".");
}

export function prettifyTargets(targets: Targets): Targets {
  return Object.keys(targets).reduce((results, target: Target) => {
    let value = targets[target];

    const unreleasedLabel =
      // @ts-expect-error undefined is strictly compared with string later
      unreleasedLabels[target];
    if (typeof value === "string" && unreleasedLabel !== value) {
      value = prettifyVersion(value);
    }

    results[target] = value;
    return results;
  }, {} as Targets);
}
