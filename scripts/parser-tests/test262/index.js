const path = require("path");
const TestStream = require("test262-stream");
const TestRunner = require("../utils/parser-test-runner");

const ignoredFeatures = [
  "AggregateError",
  "Array.prototype.flat",
  "Array.prototype.flatMap",
  "Array.prototype.values",
  "ArrayBuffer",
  "async-functions",
  "async-iteration",
  "arrow-function",
  "Atomics",
  "caller",
  "class",
  "computed-property-names",
  "const",
  "cross-realm",
  "DataView",
  "DataView.prototype.getFloat32",
  "DataView.prototype.getFloat64",
  "DataView.prototype.getInt8",
  "DataView.prototype.getInt16",
  "DataView.prototype.getInt32",
  "DataView.prototype.getUint16",
  "DataView.prototype.getUint32",
  "DataView.prototype.setUint8",
  "default-parameters",
  "destructuring-assignment",
  "destructuring-binding",
  "FinalizationGroup",
  "Float32Array",
  "Float64Array",
  "for-in-order",
  "for-of",
  "generators",
  "globalThis",
  "hashbang",
  "host-gc-required",
  "Int8Array",
  "Int32Array",
  "Intl.DateTimeFormat-datetimestyle",
  "Intl.DateTimeFormat-dayPeriod",
  "Intl.DateTimeFormat-fractionalSecondDigits",
  "Intl.DateTimeFormat-formatRange",
  "Intl.DisplayNames",
  "Intl.ListFormat",
  "Intl.Locale",
  "Intl.NumberFormat-unified",
  "Intl.RelativeTimeFormat",
  "Intl.Segmenter",
  "IsHTMLDDA",
  "json-superset",
  "let",
  "Map",
  "new.target",
  "Object.fromEntries",
  "Object.is",
  "object-rest",
  "object-spread",
  "optional-catch-binding",
  "Promise.allSettled",
  "Promise.prototype.finally",
  "Proxy",
  "proxy-missing-checks",
  "Reflect",
  "Reflect.construct",
  "Reflect.set",
  "Reflect.setPrototypeOf",
  "regexp-dotall",
  "regexp-lookbehind",
  "regexp-named-groups",
  "regexp-unicode-property-escapes",
  "rest-parameters",
  "SharedArrayBuffer",
  "Set",
  "String.fromCodePoint",
  "String.prototype.endsWith",
  "String.prototype.includes",
  "String.prototype.matchAll",
  "String.prototype.replaceAll",
  "String.prototype.trimEnd",
  "String.prototype.trimStart",
  "string-trimming",
  "super",
  "Symbol",
  "Symbol.asyncIterator",
  "Symbol.hasInstance",
  "Symbol.isConcatSpreadable",
  "Symbol.iterator",
  "Symbol.match",
  "Symbol.matchAll",
  "Symbol.prototype.description",
  "Symbol.replace",
  "Symbol.search",
  "Symbol.split",
  "Symbol.species",
  "Symbol.toPrimitive",
  "Symbol.toStringTag",
  "Symbol.unscopables",
  "tail-call-optimization",
  "template",
  "TypedArray",
  "u180e",
  "Uint8Array",
  "Uint8ClampedArray",
  "Uint16Array",
  "WeakMap",
  "WeakSet",
  "WeakRef",
  "well-formed-json-stringify",
];

const ignoredTests = ["built-ins/RegExp/", "language/literals/regexp/"];

const featuresToPlugins = {
  BigInt: "bigInt",
  "class-fields-private": "classPrivateProperties",
  "class-fields-public": "classProperties",
  "class-methods-private": "classPrivateMethods",
  "class-static-fields-public": "classProperties",
  "class-static-fields-private": "classPrivateProperties",
  "class-static-methods-private": "classPrivateMethods",
  "coalesce-expression": "nullishCoalescingOperator",
  "dynamic-import": "dynamicImport",
  "export-star-as-namespace-from-module": "exportNamespaceFrom",
  "import.meta": "importMeta",
  "logical-assignment-operators": "logicalAssignment",
  "numeric-separator-literal": "numericSeparator",
  "optional-chaining": "optionalChaining",
  "top-level-await": "topLevelAwait",
};

const unmappedFeatures = new Set();

function* getPlugins(features) {
  if (!features) return;

  for (const f of features) {
    if (featuresToPlugins[f]) {
      yield featuresToPlugins[f];
    } else if (!ignoredFeatures.includes(f)) {
      unmappedFeatures.add(f);
    }
  }
}

const runner = new TestRunner({
  testDir: path.join(__dirname, "../../../build/test262"),
  allowlist: path.join(__dirname, "allowlist.txt"),
  logInterval: 500,
  shouldUpdate: process.argv.includes("--update-allowlist"),

  async *getTests() {
    const stream = new TestStream(this.testDir, {
      omitRuntime: true,
    });

    for await (const test of stream) {
      // strip test/
      const fileName = test.file.substr(5);

      if (ignoredTests.some(start => fileName.startsWith(start))) continue;

      yield {
        contents: test.contents,
        fileName,
        id: `${fileName}(${test.scenario})`,
        sourceType: test.attrs.flags.module ? "module" : "script",
        plugins: Array.from(getPlugins(test.attrs.features)),
        expectedError:
          !!test.attrs.negative &&
          (test.attrs.negative.phase === "parse" ||
            test.attrs.negative.phase === "early"),
      };
    }
  },
});

runner
  .run()
  .then(() => {
    if (unmappedFeatures.size) {
      console.log("");
      console.log(
        "The following Features are not currently mapped or ignored:"
      );
      console.log(
        Array.from(unmappedFeatures).join("\n").replace(/^/gm, "   ")
      );
    }
  })
  .catch(err => {
    console.error(err);
    process.exitCode = 1;
  });
