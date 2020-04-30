"use strict";

// NOTE: This script must be run _after_ build-data.js

const path = require("path");

const {
  getLowestImplementedVersion,
  environments,
  writeFile,
} = require("./utils-build-data");

const data = require("./data/plugin-bugfixes");
const pluginFeatures = require("./data/plugin-features");

const generatedTargets = {};
const overlappingPlugins = {};

const allReplacedFeatures = {};

const has = Function.call.bind(Object.hasOwnProperty);

for (const [plugin, { replaces, features }] of Object.entries(data)) {
  if (!has(overlappingPlugins, replaces)) {
    overlappingPlugins[replaces] = [];
    generatedTargets[replaces] = {};
    allReplacedFeatures[replaces] = [];
  }
  generatedTargets[plugin] = {};

  allReplacedFeatures[replaces].push(...features);

  overlappingPlugins[replaces].push(plugin);

  for (const env of environments) {
    const supportedWithBugfix = getLowestImplementedVersion({ features }, env);
    if (supportedWithBugfix) {
      generatedTargets[plugin][env] = supportedWithBugfix;
    }
  }
}

for (const [replaced, features] of Object.entries(allReplacedFeatures)) {
  let replacedFeatures = pluginFeatures[replaced];
  if (!Array.isArray(replacedFeatures)) {
    replacedFeatures = replacedFeatures.features;
  }

  for (const env of environments) {
    const stillNotSupported = getLowestImplementedVersion(
      { features: replacedFeatures },
      env,
      name => features.some(feat => name.includes(feat))
    );

    if (stillNotSupported) {
      generatedTargets[replaced][env] = stillNotSupported;
    }
  }
}

for (const [filename, data] of [
  ["plugin-bugfixes", generatedTargets],
  ["overlapping-plugins", overlappingPlugins],
]) {
  const dataPath = path.join(__dirname, `../data/${filename}.json`);

  if (!writeFile(data, dataPath, filename)) {
    process.exitCode = 1;
    break;
  }
}
