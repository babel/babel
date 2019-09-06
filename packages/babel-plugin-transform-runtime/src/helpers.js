import semver from "semver";
import { types as t } from "@babel/core";

export function hasMinVersion(minVersion, runtimeVersion) {
  // If the range is unavailable, we're running the script during Babel's
  // build process, and we want to assume that all versions are satisfied so
  // that the built output will include all definitions.
  if (!runtimeVersion) return true;

  // semver.intersects() has some surprising behavior with comparing ranges
  // with preprelease versions. We add '^' to ensure that we are always
  // comparing ranges with ranges, which sidesteps this logic.
  // For example:
  //
  //   semver.intersects(`<7.0.1`, "7.0.0-beta.0") // false - surprising
  //   semver.intersects(`<7.0.1`, "^7.0.0-beta.0") // true - expected
  //
  // This is because the first falls back to
  //
  //   semver.satisfies("7.0.0-beta.0", `<7.0.1`) // false - surprising
  //
  // and this fails because a prerelease version can only satisfy a range
  // if it is a prerelease within the same major/minor/patch range.
  //
  // Note: If this is found to have issues, please also revisit the logic in
  // babel-core's availableHelper() API.
  if (semver.valid(runtimeVersion)) runtimeVersion = `^${runtimeVersion}`;

  return (
    !semver.intersects(`<${minVersion}`, runtimeVersion) &&
    !semver.intersects(`>=8.0.0`, runtimeVersion)
  );
}

export function verifyRuntimeVersion(
  options,
  moduleName,
  runtimeVersion,
  actualRuntimeVersion,
) {
  if (!actualRuntimeVersion) return;

  const minActualVersion = semver.minVersion(actualRuntimeVersion).version;
  const minVersion = semver.minVersion(runtimeVersion).version;

  if (minActualVersion === minVersion) return;

  const fixedOptions = JSON.stringify(
    {
      plugins: [
        [
          "@babel/plugin-transform-runtime",
          { ...options, version: minActualVersion },
        ],
      ],
    },
    null,
    2,
  ).replace(/^/gm, "  ".repeat(2));

  if (semver.gt(minActualVersion, minVersion)) {
    console.warn(
      `The installed version of "${moduleName}" (${actualRuntimeVersion}) is greater ` +
        `than the version specified in "@babel/transform-runtime"'s options ` +
        `(${options.version}). This difference won't cause any problem in runtime ` +
        `functionality, but it will make your compiled code larger since Babel ` +
        `can't rely on some new or modified helpers to be present in the installed ` +
        `"${moduleName}". For this reason, some helpers will be inlined in your code ` +
        `as if you weren't using "@babel/plugin-transform-runtime", leadng to bigger bundles.\n` +
        `To fix this problem, you can specify the correct version in ` +
        `"@babel/transform-runtime"'s options:\n\n${fixedOptions}`,
    );
  } else {
    console.warn(
      `The installed version of "${moduleName}" (${actualRuntimeVersion}) is lower ` +
        `than the version specified in "@babel/transform-runtime"'s options ` +
        `(${options.version}). For this reason, Babel will assume that some helpers ` +
        `are supported by the installed "${moduleName}" version, even if they ` +
        `might not actually be present.\n` +
        `To fix this problem, you must specify the correct version in ` +
        `"@babel/transform-runtime"'s options:\n\n${fixedOptions}`,
    );
  }
}

// Note: We can't use NodePath#couldBeBaseType because it doesn't support arrays.
// Even if we added support for arrays, this package needs to be compatible with
// ^7.0.0 so we can't rely on it.
export function typeAnnotationToString(node) {
  switch (node.type) {
    case "GenericTypeAnnotation":
      if (t.isIdentifier(node.id, { name: "Array" })) return "array";
      break;
    case "StringTypeAnnotation":
      return "string";
  }
}
