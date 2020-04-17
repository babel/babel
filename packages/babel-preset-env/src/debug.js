// @flow

import {
  getInclusionReasons,
  type Targets,
} from "@babel/helper-compilation-targets";

const wordEnds = (size: number) => {
  return size > 1 ? "s" : "";
};

// Outputs a message that shows which target(s) caused an item to be included:
// transform-foo { "edge":"13", "firefox":"49", "ie":"10" }
export const logPluginOrPolyfill = (
  item: string,
  targetVersions: Targets,
  list: { [key: string]: Targets },
) => {
  const filteredList = getInclusionReasons(item, targetVersions, list);

  const formattedTargets = JSON.stringify(filteredList)
    .replace(/,/g, ", ")
    .replace(/^\{"/, '{ "')
    .replace(/"\}$/, '" }');

  console.log(`  ${item} ${formattedTargets}`);
};

export const logEntryPolyfills = (
  polyfillName: string,
  importPolyfillIncluded: boolean,
  polyfills: Set<string>,
  filename: string,
  polyfillTargets: Targets,
  allBuiltInsList: { [key: string]: Targets },
) => {
  // normalize filename to generate consistent preset-env test fixtures
  if (process.env.BABEL_ENV === "test") {
    filename = filename.replace(/\\/g, "/");
  }
  if (!importPolyfillIncluded) {
    console.log(`\n[${filename}] Import of ${polyfillName} was not found.`);
    return;
  }
  if (!polyfills.size) {
    console.log(
      `\n[${filename}] Based on your targets, polyfills were not added.`,
    );
    return;
  }

  console.log(
    `\n[${filename}] Replaced ${polyfillName} entries with the following polyfill${wordEnds(
      polyfills.size,
    )}:`,
  );
  for (const polyfill of polyfills) {
    logPluginOrPolyfill(polyfill, polyfillTargets, allBuiltInsList);
  }
};

export const logUsagePolyfills = (
  polyfills: Set<string>,
  filename: string,
  polyfillTargets: Targets,
  allBuiltInsList: { [key: string]: Targets },
) => {
  // normalize filename to generate consistent preset-env test fixtures
  if (process.env.BABEL_ENV === "test") {
    filename = filename.replace(/\\/g, "/");
  }
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
