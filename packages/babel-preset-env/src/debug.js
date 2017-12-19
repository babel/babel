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

export const logPlugin = (plugin, targets, list, context) => {
  const envList = list[plugin] || {};
  const filteredList = Object.keys(targets).reduce((a, b) => {
    const version = envList[b];
    const target = targets[b];

    if (!version) {
      a[b] = prettifyVersion(target);
    } else {
      const versionIsUnreleased = isUnreleasedVersion(version, b);
      const targetIsUnreleased = isUnreleasedVersion(target, b);

      if (
        (versionIsUnreleased && !targetIsUnreleased) ||
        (!targetIsUnreleased && semver.lt(target, semverify(version)))
      ) {
        a[b] = prettifyVersion(target);
      }
    }

    return a;
  }, {});

  const formattedTargets = JSON.stringify(filteredList)
    .replace(/,/g, ", ")
    .replace(/^\{"/, '{ "')
    .replace(/"\}$/, '" }');

  logMessage(`${plugin} ${formattedTargets}`, context);
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
