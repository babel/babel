import semver from "semver";
import { OptionValidator } from "@babel/helper-validator-option";
import { unreleasedLabels } from "./targets.ts";
import type { Target, Targets } from "./types.ts";

const versionRegExp =
  /^(?:\d+|\d(?:\d?[^\d\n\r\u2028\u2029]\d+|\d{2,}(?:[^\d\n\r\u2028\u2029]\d+)?))$/;

const v = new OptionValidator(PACKAGE_JSON.name);

export function semverMin(
  first: string | undefined | null,
  second: string,
): string {
  return first && semver.lt(first, second) ? first : second;
}

// Convert version to a semver value.
// 2.5 -> 2.5.0; 1 -> 1.0.0;
export function semverify(version: number | string): string {
  if (typeof version === "string" && semver.valid(version)) {
    return version;
  }

  v.invariant(
    typeof version === "number" ||
      (typeof version === "string" && versionRegExp.test(version)),
    `'${version}' is not a valid version`,
  );

  version = version.toString();

  let pos = 0;
  let num = 0;
  while ((pos = version.indexOf(".", pos + 1)) > 0) {
    num++;
  }
  return version + ".0".repeat(2 - num);
}

export function isUnreleasedVersion(
  version: string | number,
  env: Target,
): boolean {
  const unreleasedLabel =
    // @ts-expect-error unreleasedLabel will be guarded later
    unreleasedLabels[env];
  return (
    !!unreleasedLabel && unreleasedLabel === version.toString().toLowerCase()
  );
}

export function getLowestUnreleased(a: string, b: string, env: Target): string {
  const unreleasedLabel:
    | (typeof unreleasedLabels)[keyof typeof unreleasedLabels]
    | undefined =
    // @ts-expect-error unreleasedLabel is undefined when env is not safari
    unreleasedLabels[env];
  if (a === unreleasedLabel) {
    return b;
  }
  if (b === unreleasedLabel) {
    return a;
  }
  return semverMin(a, b);
}

export function getHighestUnreleased(
  a: string,
  b: string,
  env: Target,
): string {
  return getLowestUnreleased(a, b, env) === a ? b : a;
}

export function getLowestImplementedVersion(
  plugin: Targets,
  environment: Target,
): string {
  const result = plugin[environment];
  // When Android support data is absent, use Chrome data as fallback
  if (!result && environment === "android") {
    return plugin.chrome;
  }
  return result;
}
