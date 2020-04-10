"use strict";

const fs = require("fs");
const flatMap = require("lodash/flatMap");
const mapValues = require("lodash/mapValues");
const findLastIndex = require("lodash/findLastIndex");
const electronToChromiumVersions = require("electron-to-chromium").versions;

const envs = require("../build/compat-table/environments");
const parseEnvsVersions = require("../build/compat-table/build-utils/parse-envs-versions");
const interpolateAllResults = require("../build/compat-table/build-utils/interpolate-all-results");
const compareVersions = require("../build/compat-table/build-utils/compare-versions");

// Add Electron to the list of environments
Object.keys(electronToChromiumVersions).forEach(electron => {
  const chrome = electronToChromiumVersions[electron];

  const electronId = `electron${electron.replace(".", "_")}`;
  let chromeId = `chrome${chrome}`;

  // This is missing
  if (chromeId === "chrome82") chromeId = "chrome81";
  if (!envs[chromeId]) {
    throw new Error(
      `Electron ${electron} inherits from Chrome ${chrome}, which is not defined.`
    );
  }

  envs[electronId] = { equals: chromeId };
});

const envsVersions = parseEnvsVersions(envs);

const compatSources = ["es5", "es6", "es2016plus", "esnext"].map(source => {
  const data = require(`../build/compat-table/data-${source}`);
  interpolateAllResults(data.tests, envs);
  return data;
});

// End of compat-table code adaptation

exports.environments = [
  "chrome",
  "opera",
  "edge",
  "firefox",
  "safari",
  "node",
  "ie",
  "android",
  "ios",
  "phantom",
  "samsung",
  "electron",
];

const compatibilityTests = flatMap(compatSources, data =>
  flatMap(data.tests, test => {
    if (!test.subtests) return test;

    return test.subtests.map(subtest =>
      Object.assign({}, subtest, {
        name: test.name + " / " + subtest.name,
        group: test.name,
      })
    );
  })
);

exports.getLowestImplementedVersion = (
  { features },
  env,
  exclude = () => false
) => {
  const tests = compatibilityTests.filter(test => {
    // TODO (Babel 9): Use ||=, &&=
    let ok = features.includes(test.name);
    ok = ok || (test.group && features.includes(test.group));
    ok = ok || (features.length === 1 && test.name.startsWith(features[0]));
    ok = ok && !exclude(test.name);
    return ok;
  });

  const envTests = tests.map(({ res }) => {
    const lastNotImplemented = findLastIndex(
      envsVersions[env],
      // Babel assumes strict mode
      ({ id }) => !(res[id] === true || res[id] === "strict")
    );

    return envsVersions[env][lastNotImplemented + 1];
  });

  if (envTests.length === 0 || envTests.some(t => !t)) return null;

  const result = envTests.reduce((a, b) => {
    return compareVersions(a, b) > 0 ? a : b;
  });

  // NOTE(bng): A number of environments in compat-table changed to
  // include a trailing zero (node10 -> node10_0), so for now stripping
  // it to be consistent
  return result.version.join(".").replace(/\.0$/, "");
};

exports.generateData = (environments, features) => {
  return mapValues(features, options => {
    if (!options.features) {
      options = {
        features: [options],
      };
    }

    const plugin = {};

    environments.forEach(env => {
      const version = exports.getLowestImplementedVersion(options, env);
      if (version) plugin[env] = version;
    });

    return plugin;
  });
};

exports.writeFile = function (data, dataPath, name) {
  const stringified = JSON.stringify(data, null, 2) + "\n";
  if (process.env.CHECK_COMPAT_DATA) {
    const currentData = fs.readFileSync(dataPath, "utf8");

    // Compare as JSON strings to also check keys ordering
    if (currentData !== stringified) {
      console.error(
        `The newly generated ${name} data does not match the current ` +
          "files. Re-run `make build-compat-data`."
      );

      return false;
    }
  } else {
    fs.writeFileSync(dataPath, stringified);
  }
  return true;
};
