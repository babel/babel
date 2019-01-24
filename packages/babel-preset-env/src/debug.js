/*eslint quotes: ["error", "double", { "avoidEscape": true }]*/
import semver from "semver";
import { isUnreleasedVersion, prettifyVersion, semverify } from "./utils";

const wordEnds = size => {
  return size > 1 ? "s" : "";
};

// Outputs a message that shows which target(s) caused an item to be included:
// transform-foo { "edge":"13", "firefox":"49", "ie":"10" }
export const logPluginOrPolyfill = (item, targetVersions, list) => {
  const minVersions = list[item] || {};

  const filteredList = Object.keys(targetVersions).reduce((result, env) => {
    const minVersion = minVersions[env];
    const targetVersion = targetVersions[env];

    if (!minVersion) {
      result[env] = prettifyVersion(targetVersion);
    } else {
      const minIsUnreleased = isUnreleasedVersion(minVersion, env);
      const targetIsUnreleased = isUnreleasedVersion(targetVersion, env);

      if (
        !targetIsUnreleased &&
        (minIsUnreleased || semver.lt(targetVersion, semverify(minVersion)))
      ) {
        result[env] = prettifyVersion(targetVersion);
      }
    }

    return result;
  }, {});

  const formattedTargets = JSON.stringify(filteredList)
    .replace(/,/g, ", ")
    .replace(/^\{"/, '{ "')
    .replace(/"\}$/, '" }');

  console.log(`  ${item} ${formattedTargets}`);
};

export const logEntryPolyfills = (
  importPolyfillIncluded,
  polyfills,
  filename,
  polyfillTargets,
  allBuiltInsList,
) => {
  if (!importPolyfillIncluded) {
    console.log(`\n[${filename}] \`import '@babel/polyfill'\` was not found.`);
    return;
  }
  if (!polyfills.size) {
    console.log(
      `\n[${filename}] Based on your targets, polyfills were not added.`,
    );
    return;
  }

  console.log(
    `\n[${filename}] Replaced \`@babel/polyfill\` with the following polyfill${wordEnds(
      polyfills.size,
    )}:`,
  );
  for (const polyfill of polyfills) {
    logPluginOrPolyfill(polyfill, polyfillTargets, allBuiltInsList);
  }
};

export const logUsagePolyfills = (
  polyfills,
  filename,
  polyfillTargets,
  allBuiltInsList,
) => {
  if (!polyfills.size) {
    console.log(
      `\n[${filename}] Based on your code and targets, core-js polyfills were not added.`,
    );
    return;
  }
  console.log(
    `\n[${filename}] Added following core-js polyfill${wordEnds(
      polyfills.size,
    )}:`,
  );
  for (const polyfill of polyfills) {
    logPluginOrPolyfill(polyfill, polyfillTargets, allBuiltInsList);
  }
};
