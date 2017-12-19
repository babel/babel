/*eslint quotes: ["error", "double", { "avoidEscape": true }]*/
import semver from "semver";
import { isUnreleasedVersion, prettifyVersion, semverify } from "./utils";

const wordEnds = size => {
  return size > 1 ? "s" : "";
};

export const logMessage = (message, context) => {
  const pre = context ? `[${context}] ` : "";
  const logStr = `  ${pre}${message}`;
  console.log(logStr);
};

// Outputs a message that shows which target(s) caused an item to be included:
// transform-foo { "edge":"13", "firefox":"49", "ie":"10" }
export const logPlugin = (item, targetVersions, list, context) => {
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

  logMessage(`${item} ${formattedTargets}`, context);
};

export const logEntryPolyfills = (
  importPolyfillIncluded,
  polyfills,
  filename,
  onDebug,
) => {
  if (!importPolyfillIncluded) {
    console.log(
      `
[${filename}] \`import '@babel/polyfill'\` was not found.`,
    );
    return;
  }
  if (!polyfills.size) {
    console.log(
      `
[${filename}] Based on your targets, none were added.`,
    );
    return;
  }

  console.log(
    `
[${filename}] Replaced \`@babel/polyfill\` with the following polyfill${wordEnds(
      polyfills.size,
    )}:`,
  );
  onDebug(polyfills);
};

export const logUsagePolyfills = (polyfills, filename, onDebug) => {
  if (!polyfills.size) {
    console.log(
      `
[${filename}] Based on your code and targets, none were added.`,
    );
    return;
  }
  console.log(
    `
[${filename}] Added following polyfill${wordEnds(polyfills.size)}:`,
  );
  onDebug(polyfills);
};
