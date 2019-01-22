"use strict";

const fs = require("fs");
const path = require("path");
const semver = require("semver");
const flattenDeep = require("lodash/flattenDeep");
const isEqual = require("lodash/isEqual");
const mapValues = require("lodash/mapValues");
const pickBy = require("lodash/pickBy");
const unreleasedLabels = require("../data/unreleased-labels");
const electronToChromiumVersions = require("electron-to-chromium").versions;

const electronToChromiumKeys = Object.keys(
  electronToChromiumVersions
).reverse();

const chromiumToElectronMap = electronToChromiumKeys.reduce((all, electron) => {
  all[electronToChromiumVersions[electron]] = +electron;
  return all;
}, {});
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

const renameTests = (tests, getName, category) =>
  tests.map(test =>
    Object.assign({}, test, { name: getName(test.name), category })
  );

// The following is adapted from compat-table:
// https://github.com/kangax/compat-table/blob/gh-pages/build.js
//
// It parses and interpolates data so environments that "equal" other
// environments (node4 and chrome45), as well as familial relationships (edge
// and ie11) can be handled properly.

const envs = require("compat-table/environments");

const byTestSuite = suite => browser => {
  return Array.isArray(browser.test_suites)
    ? browser.test_suites.indexOf(suite) > -1
    : true;
};

const compatSources = ["es5", "es6", "es2016plus", "esnext"].reduce((
  result,
  source
) => {
  const data = require(`compat-table/data-${source}`);
  data.browsers = pickBy(envs, byTestSuite(source));
  result.push(data);
  return result;
}, []);

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
        res[bid] =
          browser.ignore_flagged && result === "flagged" ? false : result;
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

compatSources.forEach(({ browsers, tests }) =>
  interpolateAllResults(browsers, tests)
);

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

const compatibilityTests = flattenDeep(
  compatSources.map(data =>
    data.tests.map(test => {
      return test.subtests
        ? [
            test,
            renameTests(
              test.subtests,
              name => test.name + " / " + name,
              test.category
            ),
          ]
        : test;
    })
  )
);

const getLowestImplementedVersion = ({ features }, env) => {
  const tests = compatibilityTests
    .filter(test => {
      return (
        features.indexOf(test.name) >= 0 ||
        // for features === ["DataView"]
        // it covers "DataView (Int8)" and "DataView (UInt8)"
        (features.length === 1 && test.name.indexOf(features[0]) === 0)
      );
    })
    .reduce((result, test) => {
      const isBuiltIn =
        test.category === "built-ins" ||
        test.category === "built-in extensions";

      if (!test.subtests) {
        result.push({
          name: test.name,
          res: test.res,
          isBuiltIn,
        });
      } else {
        test.subtests.forEach(subtest =>
          result.push({
            name: `${test.name}/${subtest.name}`,
            res: subtest.res,
            isBuiltIn,
          })
        );
      }

      return result;
    }, []);

  const unreleasedLabelForEnv = unreleasedLabels[env];
  const envTests = tests.map(({ res: test, isBuiltIn }, i) => {
    // Babel itself doesn't implement the feature correctly,
    // don't count against it
    // only doing this for built-ins atm
    //
    // NOTE: when/if compat-table adds a babel7 key, we'll want to update this
    if (!test.babel6corejs2 && isBuiltIn) {
      return "-1";
    }

    return (
      Object.keys(test)
        .filter(t => t.startsWith(env))
        // Babel assumes strict mode
        .filter(
          test => tests[i].res[test] === true || tests[i].res[test] === "strict"
        )
        // normalize some keys and get version from full string.
        .map(test => {
          return test.replace("_", ".").replace(env, "");
        })
        // version must be label from the unreleasedLabels (like tp) or number.
        .filter(
          version =>
            unreleasedLabelForEnv === version || !isNaN(parseFloat(version))
        )
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

  return envTests
    .map(str => str.replace(env, ""))
    .reduce((a, b) => {
      if (a === unreleasedLabelForEnv || b === unreleasedLabelForEnv) {
        return unreleasedLabelForEnv;
      }

      return semver.lt(semver.coerce(a), semver.coerce(b)) ? b : a;
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

["plugin", "built-in"].forEach(target => {
  const newData = generateData(
    environments,
    require(`../data/${target}-features`)
  );
  const dataPath = path.join(__dirname, `../data/${target}s.json`);

  if (process.argv[2] === "--check") {
    const currentData = require(dataPath);

    if (!isEqual(currentData, newData)) {
      console.error(
        "The newly generated plugin/built-in data does not match the current " +
          "files. Re-run `npm run build-data`."
      );
      process.exit(1);
    }

    process.exit(0);
  }

  fs.writeFileSync(dataPath, `${JSON.stringify(newData, null, 2)}\n`);
});
