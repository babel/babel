// NOTE: This script must be run _after_ build-data.js
import {
  generateData,
  environments,
  writeFile,
  maybeDefineLegacyPluginAliases,
} from "./utils-build-data.mjs";

import pluginBugfixes from "./data/plugin-bugfixes.mjs";
import pluginFeatures from "./data/plugin-features.mjs";
import dataWithoutBugfixes from "../data/plugins.json" with { type: "json" };

const { data: dataWithBugfixes, overlapping } = generateData(
  environments,
  Object.assign({}, pluginBugfixes, pluginFeatures)
);

for (const [key, support] of Object.entries(dataWithBugfixes)) {
  const originalSupport = dataWithoutBugfixes[key];
  if (
    originalSupport &&
    Object.keys(support).length === Object.keys(originalSupport).length &&
    Object.keys(support).every(env => support[env] === originalSupport[env])
  ) {
    // The data with and without bugfixes is the same; we can avoid saving it twice.
    delete dataWithBugfixes[key];
  }
}

for (const [filename, data] of [
  ["plugin-bugfixes", dataWithBugfixes],
  ["overlapping-plugins", overlapping],
]) {
  const dataURL = new URL(`../data/${filename}.json`, import.meta.url);

  if (!writeFile(maybeDefineLegacyPluginAliases(data), dataURL, filename)) {
    process.exitCode = 1;
    break;
  }
}
