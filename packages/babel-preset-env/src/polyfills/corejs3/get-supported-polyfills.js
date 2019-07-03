import modulesByVersion from "../../../data/corejs3-modules-by-version.json";
import semver from "semver";

export default function(version) {
  const corejs = semver.coerce(version);
  const result = new Set();
  for (const { version, modules } of modulesByVersion) {
    if (semver.gt(corejs, version)) break;
    modules.forEach(m => result.add(m));
  }
  return result;
}
