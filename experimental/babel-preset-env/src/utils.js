// @flow
import semver from "semver";

export const _extends = Object.assign ||
  function(target) {
    for (let i = 1; i < arguments.length; i++) {
      const source = arguments[i];
      for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

// Convert version to a semver value.
// 2.5 -> 2.5.0; 1 -> 1.0.0;
export const semverify = (version) => {
  if (typeof version === "string" && semver.valid(version)) {
    return version;
  }

  const split = version.toString().split(".");

  while (split.length < 3) {
    split.push(0);
  }

  return split.join(".");
};

export const prettifyVersion = (version) => {
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

export const prettifyTargets = (targets = {}) => {
  return Object.keys(targets).reduce(
    (results, target) => {
      let value = targets[target];

      if (typeof value === "string") {
        value = prettifyVersion(value);
      }

      results[target] = value;
      return results;
    },
    {},
  );
};
