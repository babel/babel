import path from "path";
import { fileURLToPath } from "url";
import TestStream from "test262-stream";
import TestRunner from "../utils/parser-test-runner.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const ignoredFeatures = new Set([
  "__getter__",
  "__proto__",
  "__setter__",
  "AggregateError",
  "ArrayBuffer",
  "align-detached-buffer-semantics-with-web-reality",
  "arbitrary-module-namespace-names",
  "array-find-from-last",
  "array-grouping",
  "async-functions",
  "async-iteration",
  "arrow-function",
  "Atomics",
  "Atomics.waitAsync",
  "BigInt",
  "caller",
  "class",
  "class-fields-private",
  "class-fields-private-in",
  "class-fields-public",
  "class-methods-private",
  "class-static-block",
  "class-static-fields-private",
  "class-static-fields-public",
  "class-static-methods-private",
  "cleanupSome",
  "coalesce-expression",
  "computed-property-names",
  "const",
  "cross-realm",
  "DataView",
  "default-parameters",
  "destructuring-assignment",
  "destructuring-binding",
  "dynamic-import",
  "error-cause",
  "export-star-as-namespace-from-module",
  "FinalizationGroup",
  "FinalizationRegistry",
  "FinalizationRegistry.prototype.cleanupSome",
  "Float32Array",
  "Float64Array",
  "for-in-order",
  "for-of",
  "generators",
  "globalThis",
  "hashbang",
  "host-gc-required",
  "Int8Array",
  "Int16Array",
  "Int32Array",
  "Intl-enumeration",
  "IsHTMLDDA",
  "import.meta",
  "intl-normative-optional",
  "json-modules",
  "json-superset",
  "legacy-regexp",
  "let",
  "logical-assignment-operators",
  "Map",
  "new.target",
  "numeric-separator-literal",
  "Object.fromEntries",
  "Object.hasOwn",
  "Object.is",
  "object-rest",
  "object-spread",
  "optional-catch-binding",
  "optional-chaining",
  "Promise",
  "Promise.allSettled",
  "Promise.any",
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
  "resizable-arraybuffer",
  "rest-parameters",
  "ShadowRealm",
  "SharedArrayBuffer",
  "Set",
  "String.fromCodePoint",
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
  "top-level-await",
  "Temporal",
  "TypedArray",
  "u180e",
  "Uint8Array",
  "Uint8ClampedArray",
  "Uint16Array",
  "Uint32Array",
  "WeakMap",
  "WeakSet",
  "WeakRef",
  "well-formed-json-stringify",
  "symbols-as-weakmap-keys",
  "change-array-by-copy",
  "regexp-duplicate-named-groups",
  "regexp-match-indices",
]);

function featureShouldIgnore(feature) {
  return (
    ignoredFeatures.has(feature) ||
    // All prototype method must not introduce new language syntax
    feature.includes(".prototype.") ||
    // Ignore Intl features
    feature.startsWith("Intl.")
  );
}

const ignoredTests = ["built-ins/RegExp/", "language/literals/regexp/"];

const featuresToPlugins = new Map([
  ["import-assertions", "importAssertions"],
  [
    "decorators",
    [
      ["decorators", { version: "2021-12", decoratorsBeforeExport: false }],
      "decoratorAutoAccessors",
    ],
  ],
]);

const unmappedFeatures = new Set();

function* getPlugins(features) {
  if (!features) return;

  for (const f of features) {
    if (featuresToPlugins.has(f)) {
      yield featuresToPlugins.get(f);
    } else if (!featureShouldIgnore(f)) {
      unmappedFeatures.add(f);
    }
  }
}

const runner = new TestRunner({
  testDir: path.join(dirname, "../../../build/test262").replace(/\\/g, "/"),
  allowlist: path.join(dirname, "allowlist.txt"),
  logInterval: 500,
  shouldUpdate: process.argv.includes("--update-allowlist"),

  async *getTests() {
    const stream = new TestStream(this.testDir, {
      omitRuntime: true,
    });

    for await (const test of stream) {
      // strip test/
      const fileName = test.file.slice(5).replace(/\\/g, "/");

      if (ignoredTests.some(start => fileName.startsWith(start))) continue;

      yield {
        contents: test.contents,
        fileName,
        id: `${fileName}(${test.scenario})`,
        sourceType: test.attrs.flags.module ? "module" : "script",
        plugins: Array.from(getPlugins(test.attrs.features)).flat(),
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
      console.warn("");
      console.warn(
        "The following Features are not currently mapped or ignored:"
      );
      console.warn(
        Array.from(unmappedFeatures).join("\n").replace(/^/gm, "   ")
      );

      process.exitCode = 1;
    }
  })
  .catch(err => {
    console.error(err);
    process.exitCode = 1;
  });
