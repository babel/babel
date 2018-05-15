"use strict";

const fs = require("graceful-fs");
const promisify = require("util").promisify;
const TestStream = require("test262-stream");
const pfs = {
  readFile: promisify(fs.readFile),
  writeFile: promisify(fs.writeFile),
  readdir: promisify(fs.readdir),
  stat: promisify(fs.stat),
};

const parse = require("../../../packages/babel-parser").parse;

const featuresToPlugins = {
  BigInt: "bigInt",
  "class-fields-public": "classProperties",
  "class-fields-private": "classPrivateProperties",
  "async-iteration": "asyncGenerators",
  "object-rest": "objectRestSpread",
  "object-spread": "objectRestSpread",
  "optional-catch-binding": "optionalCatchBinding",
  "numeric-separator-literal": "numericSeparator",
};

function getPlugins(features) {
  return features && features.map(f => featuresToPlugins[f]).filter(Boolean);
}

exports.getTests = function(testDir) {
  const stream = new TestStream(testDir, {
    omitRuntime: true,
    acceptVersion: "3.0.0",
  });
  const tests = [];

  stream.on("data", test => {
    // strip test/
    const fileName = test.file.substr(5);

    tests.push({
      contents: test.contents,
      fileName,
      id: `${fileName}(${test.scenario})`,
      sourceType: test.attrs.flags.module ? "module" : "script",
      plugins: getPlugins(test.attrs.features),
      expectedError:
        !!test.attrs.negative &&
        (test.attrs.negative.phase === "parse" ||
          test.attrs.negative.phase === "early"),
    });
  });

  return new Promise((resolve, reject) => {
    stream.on("end", () => resolve(tests));
    stream.on("error", reject);
  });
};

exports.runTest = function(test) {
  try {
    parse(test.contents, {
      sourceType: test.sourceType,
      plugins: test.plugins,
    });
    test.actualError = false;
  } catch (err) {
    test.actualError = true;
  }

  test.result = test.expectedError !== test.actualError ? "fail" : "pass";

  return test;
};

exports.getWhitelist = function(filename) {
  return pfs.readFile(filename, "utf-8").then(function(contents) {
    return contents
      .split("\n")
      .map(function(line) {
        return line.replace(/#.*$/, "").trim();
      })
      .filter(function(line) {
        return line.length > 0;
      })
      .reduce(function(table, filename) {
        table[filename] = true;
        return table;
      }, Object.create(null));
  });
};

exports.updateWhitelist = function(filename, summary) {
  return pfs.readFile(filename, "utf-8").then(function(contents) {
    const toRemove = summary.disallowed.success
      .concat(summary.disallowed.failure)
      .map(function(test) {
        return test.id;
      });
    const toAdd = summary.disallowed.falsePositive
      .concat(summary.disallowed.falseNegative)
      .map(function(test) {
        return test.id;
      });
    const newContents = contents
      .split("\n")
      .map(function(line) {
        const testId = line.replace(/#.*$/, "").trim();

        if (toRemove.indexOf(testId) > -1) {
          return null;
        }

        return line;
      })
      .filter(function(line) {
        return line !== null;
      })
      .concat(toAdd)
      .join("\n");

    return pfs.writeFile(filename, newContents, "utf-8");
  });
};

exports.interpret = function(results, whitelist) {
  const summary = {
    passed: true,
    allowed: {
      success: [],
      failure: [],
      falsePositive: [],
      falseNegative: [],
    },
    disallowed: {
      success: [],
      failure: [],
      falsePositive: [],
      falseNegative: [],
    },
    unrecognized: null,
  };

  results.forEach(function(result) {
    let classification, isAllowed;
    const inWhitelist = result.id in whitelist;
    delete whitelist[result.id];

    if (!result.expectedError) {
      if (!result.actualError) {
        classification = "success";
        isAllowed = !inWhitelist;
      } else {
        classification = "falseNegative";
        isAllowed = inWhitelist;
      }
    } else {
      if (!result.actualError) {
        classification = "falsePositive";
        isAllowed = inWhitelist;
      } else {
        classification = "failure";
        isAllowed = !inWhitelist;
      }
    }

    summary.passed &= isAllowed;
    summary[isAllowed ? "allowed" : "disallowed"][classification].push(result);
  });

  summary.unrecognized = Object.keys(whitelist);
  summary.passed = !!summary.passed && summary.unrecognized.length === 0;

  return summary;
};
