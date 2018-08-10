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

const ignoredFeatures = [
  "async-functions",
  "async-iteration",
  "arrow-function",
  "class",
  "const",
  "destructuring-assignment",
  "for-of",
  "generators",
  "let",
  "template",
  "Reflect.construct",
  "Symbol",
  "TypedArray",
  "cross-realm",
  "Reflect",
  "DataView",
  "ArrayBuffer",
  "Symbol.toStringTag",
  "Atomics",
  "SharedArrayBuffer",
  "Int8Array",
  "Symbol.toPrimitive",
  "caller",
  "Symbol.iterator",
  "u180e",
  "Proxy",
  "Symbol.match",
  "regexp-dotall",
  "Symbol.matchAll",
  "Set",
  "WeakSet",
  "globalThis",
  "Intl.Locale",
  "tail-call-optimization",
  "default-parameters",
  "new.target",
  "super",
  "Symbol.unscopables",
  "Symbol.species",
  "Symbol.asyncIterator",
  "Float32Array",
  "Float64Array",
  "Uint16Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "computed-property-names",
  "well-formed-json-stringify",
  "object-spread",
  "object-rest",
  "optional-catch-binding",
  "Object.fromEntries",
  "Object.is",
  "Reflect.setPrototypeOf",
  "Reflect.set",
  "String.fromCodePoint",
  "regexp-lookbehind",
  "regexp-named-groups",
  "regexp-unicode-property-escapes",
  "Symbol.hasInstance",
  "Symbol.isConcatSpreadable",
  "Symbol.replace",
  "Symbol.search",
  "Symbol.split",
  "Array.prototype.values",
  "Intl.ListFormat",
  "Intl.RelativeTimeFormat",
  "Intl.Segmenter",
  "destructuring-binding",
  "json-superset",
  "Map",
  "IsHTMLDDA",
  "Array.prototype.flat",
  "Array.prototype.flatMap",
  "DataView.prototype.setUint8",
  "DataView.prototype.getFloat32",
  "DataView.prototype.getFloat64",
  "DataView.prototype.getInt16",
  "DataView.prototype.getInt32",
  "DataView.prototype.getInt8",
  "DataView.prototype.getUint16",
  "DataView.prototype.getUint32",
  "WeakMap",
  "Promise.prototype.finally",
  "String.prototype.endsWith",
  "String.prototype.includes",
  "String.prototype.matchAll",
  "string-trimming",
  "String.prototype.trimEnd",
  "String.prototype.trimStart",
  "Symbol.prototype.description",
];

const featuresToPlugins = {
  BigInt: "bigInt",
  "class-fields-private": "classPrivateProperties",
  "class-fields-public": "classProperties",
  "class-methods-private": "classPrivateMethods",
  "class-static-fields-public": "classProperties",
  "class-static-fields-private": "classPrivateProperties",
  "class-static-methods-private": "classPrivateMethods",
  "dynamic-import": "dynamicImport",
  "export-star-as-namespace-from-module": "exportNamespaceFrom",
  "import.meta": "importMeta",
  "numeric-separator-literal": "numericSeparator",
};

function getPlugins(features) {
  return (
    features &&
    features
      .map(f => {
        if (!featuresToPlugins[f] && !ignoredFeatures.includes(f)) {
          unmappedFeatures.add(f);
        }
        return featuresToPlugins[f];
      })
      .filter(Boolean)
  );
}

const unmappedFeatures = new Set();

exports.getUnmappedFeatures = function() {
  return unmappedFeatures;
};

exports.getTests = function(testDir) {
  const stream = new TestStream(testDir, {
    omitRuntime: true,
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
