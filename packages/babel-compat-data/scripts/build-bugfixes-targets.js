"use strict";

// NOTE: This script must be run _after_ build-data.js

const path = require("path");

const {
  generateData,
  environments,
  writeFile,
  maybeDefineLegacyPluginAliases,
} = require("./utils-build-data");

const pluginBugfixes = require("./data/plugin-bugfixes");
const pluginFeatures = require("./data/plugin-features");

const { data: dataWithBugfixes, overlapping } = generateData(
  environments,
  Object.assign({}, pluginBugfixes, pluginFeatures)
);

const dataWithoutBugfixes = require("../data/plugins.json");

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
  const dataPath = path.join(__dirname, `../data/${filename}.json`);

  if (!writeFile(maybeDefineLegacyPluginAliases(data), dataPath, filename)) {
    process.exitCode = 1;
    break;
  }
}
