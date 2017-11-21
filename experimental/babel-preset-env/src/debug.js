/*eslint quotes: ["error", "double", { "avoidEscape": true }]*/
import semver from "semver";
import { prettifyVersion, semverify } from "./utils";

const wordEnds = size => {
  return size > 1 ? "s" : "";
};

export const logMessage = (message, context) => {
  const pre = context ? `[${context}] ` : "";
  const logStr = `  ${pre}${message}`;
  console.error(logStr);
};

export const logPlugin = (plugin, targets, list, context) => {
  const envList = list[plugin] || {};
  const filteredList = Object.keys(targets).reduce((a, b) => {
    if (!envList[b] || semver.lt(targets[b], semverify(envList[b]))) {
      a[b] = prettifyVersion(targets[b]);
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
    console.error(
      `
[${filename}] \`import '@babel/polyfill'\` was not found.`,
    );
    return;
  }
  if (!polyfills.size) {
    console.error(
      `
[${filename}] Based on your targets, none were added.`,
    );
    return;
  }

  console.error(
    `
[${filename}] Replaced \`@babel/polyfill\` with the following polyfill${wordEnds(
      polyfills.size,
    )}:`,
  );
  onDebug(polyfills);
};

export const logUsagePolyfills = (polyfills, filename, onDebug) => {
  if (!polyfills.size) {
    console.error(
      `
[${filename}] Based on your code and targets, none were added.`,
    );
    return;
  }
  console.error(
    `
[${filename}] Added following polyfill${wordEnds(polyfills.size)}:`,
  );
  onDebug(polyfills);
};
