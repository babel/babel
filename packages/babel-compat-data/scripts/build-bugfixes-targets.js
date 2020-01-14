"use strict";

// NOTE: This script must be run _after_ build-data.js

const semver = require("semver");
const path = require("path");
const fs = require("fs");
const isEqual = require("lodash/isEqual");

// TODO: This is an internal file of a separate package
const {
  semverify,
} = require("../../babel-helper-compilation-targets/lib/utils");

const data = require("./data/plugin-bugfixes");
const plugins = require("../data/plugins.json");

const generatedTargets = {};
const overlappingPlugins = {};

const has = Function.call.bind(Object.hasOwnProperty);

for (const [plugin, { replaces, targets }] of Object.entries(data)) {
  if (!has(overlappingPlugins, replaces)) {
    overlappingPlugins[replaces] = [];
    generatedTargets[replaces] = Object.assign({}, plugins[replaces]);
  }
  generatedTargets[plugin] = {};

  for (const [target, [include, exclude]] of Object.entries(targets)) {
    generatedTargets[plugin][target] = exclude;

    if (
      !has(generatedTargets[replaces], target) ||
      compare(include, generatedTargets[replaces][target]) == -1
    ) {
      generatedTargets[replaces][target] = include;
    }
  }

  for (const target of Object.keys(plugins[replaces])) {
    if (!has(generatedTargets[plugin], target)) {
      generatedTargets[plugin][target] = "0";
    }
  }

  overlappingPlugins[replaces].push(plugin);
}

function compare(a, b) {
  return semver.compare(semverify(a), semverify(b));
}

[
  ["plugin-bugfixes", generatedTargets],
  ["overlapping-plugins", overlappingPlugins],
].forEach(([filename, newData]) => {
  const dataPath = path.join(__dirname, `../data/${filename}.json`);

  if (process.argv[2] === "--check") {
    const currentData = require(dataPath);

    if (!isEqual(currentData, newData)) {
      console.error(
        `The newly generated ${filename} data does not match the current ` +
          "files. Re-run `npm run build-data`."
      );
      process.exit(1);
    }

    process.exit(0);
  }

  fs.writeFileSync(dataPath, `${JSON.stringify(newData, null, 2)}\n`);
});
