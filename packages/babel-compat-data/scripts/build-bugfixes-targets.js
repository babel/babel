"use strict";

// NOTE: This script must be run _after_ build-data.js

const semver = require("semver");
const path = require("path");

// TODO: This is an internal file of a separate package
const {
  semverify,
} = require("../../babel-helper-compilation-targets/lib/utils");

const {
  getLowestImplementedVersion,
  environments,
  addOperaAndElectron,
  writeFile,
} = require("./utils-build-data");

const data = require("./data/plugin-bugfixes");
const pluginFeatures = require("./data/plugin-features");

const generatedTargets = {};
const overlappingPlugins = {};

const has = Function.call.bind(Object.hasOwnProperty);

for (const [plugin, { replaces, features }] of Object.entries(data)) {
  if (!has(overlappingPlugins, replaces)) {
    overlappingPlugins[replaces] = [];
    generatedTargets[replaces] = {};
  }
  generatedTargets[plugin] = {};

  let replacedFeatures = pluginFeatures[replaces];
  if (!Array.isArray(replacedFeatures)) {
    replacedFeatures = replacedFeatures.features;
  }

  for (const env of environments) {
    const supportedWithBugfix = getLowestImplementedVersion({ features }, env);
    if (!supportedWithBugfix) continue;

    generatedTargets[plugin][env] = supportedWithBugfix;

    const stillNotSupported = getLowestImplementedVersion(
      { features: replacedFeatures },
      env,
      name => features.some(feat => name.includes(feat))
    );
    if (!stillNotSupported) continue;

    if (
      !has(generatedTargets[replaces], env) ||
      compare(stillNotSupported, generatedTargets[replaces][env]) == -1
    ) {
      generatedTargets[replaces][env] = stillNotSupported;
    }
  }

  overlappingPlugins[replaces].push(plugin);
}

for (const plugin of Object.values(generatedTargets)) {
  addOperaAndElectron(plugin);
}

function compare(a, b) {
  return semver.compare(semverify(a), semverify(b));
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
