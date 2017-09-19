// @flow

import semver from "semver";
import type { Targets } from "./types";

// Convert version to a semver value.
// 2.5 -> 2.5.0; 1 -> 1.0.0;
export const semverify = (version: string | number): string => {
  if (typeof version === "string" && semver.valid(version)) {
    return version;
  }

  const split = version.toString().split(".");

  while (split.length < 3) {
    split.push("0");
  }

  return split.join(".");
};

export const prettifyVersion = (version: string): string => {
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
};

export const prettifyTargets = (targets: Targets): Object => {
  return Object.keys(targets).reduce((results, target) => {
    let value = targets[target];

    if (typeof value === "string") {
      value = prettifyVersion(value);
    }

    results[target] = value;
    return results;
  }, {});
};

export const filterStageFromList = (list: any, stageList: any) => {
  return Object.keys(list).reduce((result, item) => {
    if (!stageList[item]) {
      result[item] = list[item];
    }

    return result;
  }, {});
};
