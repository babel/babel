"use strict";

const fs = require("fs");
const path = require("path");

const flatten = require("lodash/flatten");
const flattenDeep = require("lodash/flattenDeep");
const isEqual = require("lodash/isEqual");
const mapValues = require("lodash/mapValues");
const pickBy = require("lodash/pickBy");
const electronToChromiumVersions = require("electron-to-chromium").versions;
const pluginFeatures = require("../data/plugin-features");
const builtInFeatures = require("../data/built-in-features");

const electronToChromiumKeys = Object.keys(
  electronToChromiumVersions
).reverse();

const chromiumToElectronMap = electronToChromiumKeys.reduce(
  (all, electron) => {
    all[electronToChromiumVersions[electron]] = +electron;
    return all;
  },
  {}
);
const chromiumToElectronVersions = Object.keys(chromiumToElectronMap);

const findClosestElectronVersion = targetVersion => {
  const chromiumVersionsLength = chromiumToElectronVersions.length;
  const maxChromium = +chromiumToElectronVersions[chromiumVersionsLength - 1];
  if (targetVersion > maxChromium) return null;

  const closestChrome = chromiumToElectronVersions.find(
    version => targetVersion <= version
  );
  return chromiumToElectronMap[closestChrome];
};

const chromiumToElectron = chromium =>
  chromiumToElectronMap[chromium] || findClosestElectronVersion(chromium);

const renameTests = (tests, getName) =>
  tests.map(test => Object.assign({}, test, { name: getName(test.name) }));

// The following is adapted from compat-table:
// https://github.com/kangax/compat-table/blob/gh-pages/build.js
//
// It parses and interpolates data so environments that "equal" other
// environments (node4 and chrome45), as well as familial relationships (edge
// and ie11) can be handled properly.

const envs = require("compat-table/environments");

const byTestSuite = suite =>
  browser => {
    return Array.isArray(browser.test_suites)
      ? browser.test_suites.indexOf(suite) > -1
      : true;
  };

const es6 = require("compat-table/data-es6");
es6.browsers = pickBy(envs, byTestSuite("es6"));

const es2016plus = require("compat-table/data-es2016plus");
es2016plus.browsers = pickBy(envs, byTestSuite("es2016plus"));

const interpolateAllResults = (rawBrowsers, tests) => {
  const interpolateResults = res => {
    let browser;
    let prevBrowser;
    let result;
    let prevResult;
    let prevBid;

    for (const bid in rawBrowsers) {
      // For browsers that are essentially equal to other browsers,
      // copy over the results.
      browser = rawBrowsers[bid];
      if (browser.equals && res[bid] === undefined) {
        result = res[browser.equals];
        res[bid] = browser.ignore_flagged && result === "flagged"
          ? false
          : result;
        // For each browser, check if the previous browser has the same
        // browser full name (e.g. Firefox) or family name (e.g. Chakra) as this one.
      } else if (
        prevBrowser &&
        (prevBrowser.full.replace(/,.+$/, "") ===
          browser.full.replace(/,.+$/, "") ||
          (browser.family !== undefined &&
            prevBrowser.family === browser.family))
      ) {
        // For each test, check if the previous browser has a result
        // that this browser lacks.
        result = res[bid];
        prevResult = res[prevBid];
        if (prevResult !== undefined && result === undefined) {
          res[bid] = prevResult;
        }
      }
      prevBrowser = browser;
      prevBid = bid;
    }
  };

  // Now print the results.
  tests.forEach(function(t) {
    // Calculate the result totals for tests which consist solely of subtests.
    if ("subtests" in t) {
      t.subtests.forEach(function(e) {
        interpolateResults(e.res);
      });
    } else {
      interpolateResults(t.res);
    }
  });
};

interpolateAllResults(es6.browsers, es6.tests);
interpolateAllResults(es2016plus.browsers, es2016plus.tests);

// End of compat-table code adaptation

const environments = [
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
];

const envMap = {
  safari51: "safari5",
  safari71_8: "safari8",
  safari10_1: "safari10.1",
  firefox3_5: "firefox3",
  firefox3_6: "firefox3",
  node010: "node0.10",
  node012: "node0.12",
  iojs: "node3.3",
  node64: "node6",
  node65: "node6.5",
  node76: "node7.6",
  android40: "android4.0",
  android41: "android4.1",
  android42: "android4.2",
  android43: "android4.3",
  android44: "android4.4",
  android50: "android5.0",
  android51: "android5.1",
  ios51: "ios5.1",
  ios10_3: "ios10.3",
};

const compatibilityTests = flattenDeep(
  [es6, es2016plus].map(data =>
    data.tests.map(test => {
      return test.subtests
        ? [test, renameTests(test.subtests, name => test.name + " / " + name)]
        : test;
    }))
);

const getLowestImplementedVersion = ({ features }, env) => {
  const tests = flatten(
    compatibilityTests
      .filter(test => {
        return features.indexOf(test.name) >= 0 ||
          // for features === ["DataView"]
          // it covers "DataView (Int8)" and "DataView (UInt8)"
          (features.length === 1 && test.name.indexOf(features[0]) === 0);
      })
      .map(test => {
        const isBuiltIn = test.category === "built-ins" ||
          test.category === "built-in extensions";

        return test.subtests
          ? test.subtests.map(subtest => ({
              name: `${test.name}/${subtest.name}`,
              res: subtest.res,
              isBuiltIn,
            }))
          : {
              name: test.name,
              res: test.res,
              isBuiltIn,
            };
      })
  );

  const envTests = tests.map(({ res: test, name, isBuiltIn }, i) => {
    // Babel itself doesn't implement the feature correctly,
    // don't count against it
    // only doing this for built-ins atm
    if (!test.babel && isBuiltIn) {
      return "-1";
    }

    return (
      Object.keys(test)
        .filter(t => t.startsWith(env))
        // Babel assumes strict mode
        .filter(
          test => tests[i].res[test] === true || tests[i].res[test] === "strict"
        )
        // normalize some keys
        .map(test => envMap[test] || test)
        .filter(test => !isNaN(parseFloat(test.replace(env, ""))))
        .shift()
    );
  });

  const envFiltered = envTests.filter(t => t);
  if (envTests.length > envFiltered.length || envTests.length === 0) {
    // envTests.forEach((test, i) => {
    //   if (!test) {
    //     // print unsupported features
    //     if (env === 'node') {
    //       console.log(`ENV(${env}): ${tests[i].name}`);
    //     }
    //   }
    // });
    return null;
  }

  return envTests.map(str => Number(str.replace(env, ""))).reduce((a, b) => {
    return a < b ? b : a;
  });
};

const generateData = (environments, features) => {
  return mapValues(features, options => {
    if (!options.features) {
      options = {
        features: [options],
      };
    }

    const plugin = {};

    environments.forEach(env => {
      const version = getLowestImplementedVersion(options, env);
      if (version !== null) {
        plugin[env] = version.toString();
      }
    });

    if (plugin.chrome) {
      // add opera
      if (plugin.chrome >= 28) {
        plugin.opera = (plugin.chrome - 13).toString();
      } else if (plugin.chrome === 5) {
        plugin.opera = "12";
      }

      // add electron
      const electronVersion = chromiumToElectron(plugin.chrome);
      if (electronVersion) {
        plugin.electron = electronVersion.toString();
      }
    }

    return plugin;
  });
};

const pluginsDataPath = path.join(__dirname, "../data/plugins.json");
const builtInsDataPath = path.join(__dirname, "../data/built-ins.json");

const newPluginData = generateData(environments, pluginFeatures);
const newBuiltInsData = generateData(environments, builtInFeatures);

if (process.argv[2] === "--check") {
  const currentPluginData = require(pluginsDataPath);
  const currentBuiltInsData = require(builtInsDataPath);

  if (
    !isEqual(currentPluginData, newPluginData) ||
    !isEqual(currentBuiltInsData, newBuiltInsData)
  ) {
    console.error(
      "The newly generated plugin/built-in data does not match the current " +
        "files. Re-run `npm run build-data`."
    );
    process.exit(1);
  }

  process.exit(0);
}

fs.writeFileSync(
  pluginsDataPath,
  JSON.stringify(newPluginData, null, 2) + "\n"
);

fs.writeFileSync(
  builtInsDataPath,
  JSON.stringify(newBuiltInsData, null, 2) + "\n"
);
