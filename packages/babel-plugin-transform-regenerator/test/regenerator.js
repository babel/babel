/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { readFileSync } from "node:fs";
import { createRequire, isBuiltin } from "node:module";
import { dirname, join } from "node:path";
import vm from "node:vm";
import { transformSync } from "@babel/core";
import checkDuplicatedNodes from "@babel/helper-check-duplicate-nodes";

import { commonJS } from "$repo-utils";

import pluginTransformRegenerator from "../lib/index.js";

import pluginTransformClasses from "@babel/plugin-transform-classes";
import pluginTransformForOf from "@babel/plugin-transform-for-of";
import pluginTransformBlockScoping from "@babel/plugin-transform-block-scoping";
import pluginTransformArrowFunctions from "@babel/plugin-transform-arrow-functions";
import pluginTransformParameters from "@babel/plugin-transform-parameters";
import pluginProposalFunctionSent from "@babel/plugin-proposal-function-sent";

const { __dirname, require } = commonJS(import.meta.url);

const fixturesDir = join(__dirname, "regenerator-fixtures");

// https://github.com/facebook/regenerator/blob/cb755fd82c648cbc5307a5a2d61cdd598e698fc4/packages/preset/index.js#L9
const regeneratorPreset = [
  pluginProposalFunctionSent,
  pluginTransformClasses,
  pluginTransformArrowFunctions,
  pluginTransformBlockScoping,
  pluginTransformForOf,
  pluginTransformRegenerator,
];

const looseParserOpts = {
  sourceType: "module",
  allowImportExportEverywhere: true,
  allowReturnOutsideFunction: true,
  allowSuperOutsideMethod: true,
  strictMode: false,
  plugins: ["*", "jsx", "flow"],
};

const presetOptions = {
  plugins: regeneratorPreset,
  parserOpts: { strictMode: false },
};

/**
 * Transform without using the preset (which also transforms things like classes and arrows)
 */
const regeneratorOnlyOptions = {
  plugins: [pluginTransformRegenerator],
  parserOpts: looseParserOpts,
};

const paramsTransformOptions = {
  plugins: [pluginTransformParameters, ...regeneratorPreset],
  parserOpts: looseParserOpts,
};

function customPromiseReplacer(babel) {
  return {
    visitor: {
      FunctionExpression: {
        exit(path) {
          const stmt = path.get("body.body").find(function (stmt) {
            return (
              stmt.isLabeledStatement() &&
              stmt.get("label").isIdentifier({ name: "babelInjectPromise" })
            );
          });
          if (!stmt) return;

          path.traverse({
            ReferencedIdentifier(path) {
              if (path.node.name === "Promise") {
                path.replaceWith(
                  babel.types.cloneNode(stmt.node.body.expression),
                );
              }
            },
          });
        },
      },
    },
  };
}

const customPromiseOptions = {
  plugins: [customPromiseReplacer, ...regeneratorPreset],
  parserOpts: { strictMode: false },
};

function compile(inputFile, options, { oldHelper = false } = {}) {
  const input = readFileSync(join(fixturesDir, inputFile), "utf8");

  let output, ast;
  if (oldHelper) process.env.FORCE_OLD_REGENERATOR = true;
  try {
    ({ code: output, ast } = transformSync(input, {
      ...options,
      ast: true,
      configFile: false,
    }));
  } finally {
    if (oldHelper) delete process.env.FORCE_OLD_REGENERATOR;
  }

  try {
    checkDuplicatedNodes(ast);
  } catch (err) {
    err.message =
      "Occurred while transforming: " + inputFile + "\n" + err.message;
    throw err;
  }
  return output;
}

/**
 * Evaluate `code` as a CommonJS module in a fresh realm. Some fixtures mutate
 * intrinsics (e.g. `Symbol = undefined`, freezing `Object.prototype`), so each
 * of them gets its own global object instead of the shared Jest worker one.
 * Relative modules and `regenerator-runtime` are evaluated in the same realm,
 * while Node.js builtins such as `assert` come from the host.
 */
function runInFreshRealm(code, filename) {
  const context = vm.createContext({
    describe,
    it,
    test,
    xit,
    console,
    process,
    setTimeout,
    clearTimeout,
    setImmediate,
    clearImmediate,
  });
  const moduleCache = new Map();

  function evaluate(code, filename) {
    const module = { exports: {} };
    moduleCache.set(filename, module);
    const fn = vm.compileFunction(
      code,
      ["exports", "require", "module", "__filename", "__dirname"],
      { filename, parsingContext: context },
    );
    fn.call(
      module.exports,
      module.exports,
      createRequireInRealm(filename),
      module,
      filename,
      dirname(filename),
    );
    return module.exports;
  }

  function createRequireInRealm(parentFilename) {
    const resolve = createRequire(parentFilename).resolve;
    return function require(id) {
      if (isBuiltin(id)) return createRequire(parentFilename)(id);
      const filename = resolve(id);
      return (
        moduleCache.get(filename)?.exports ??
        evaluate(readFileSync(filename, "utf8"), filename)
      );
    };
  }

  evaluate(code, filename);
}

/**
 * @param {string} name A name for the compiled output. It is resolved in the fixtures
 *                      directory so that `require("./shared.js")` works.
 * @param {() => string} getCode
 */
function runFixture(name, getCode) {
  describe(`${name}`, () => {
    runInFreshRealm(getCode(), join(fixturesDir, name));
  });
}

describe("regenerator", () => {
  // Matches https://github.com/facebook/regenerator/blob/cb755fd82c648cbc5307a5a2d61cdd598e698fc4/.github/workflows/node.js.yml#L19
  runFixture("tests.es5.js", () => compile("tests.es6.js", presetOptions));
  runFixture("tests.es5-old.js", () =>
    compile("tests.es6.js", presetOptions, { oldHelper: true }),
  );
  runFixture("tests-node4.es5.js", () =>
    compile("tests-node4.es6.js", presetOptions),
  );
  runFixture("non-native.es5.js", () =>
    compile("non-native.js", presetOptions),
  );
  runFixture("async.es5.js", () => compile("async.js", presetOptions));
  runFixture("async.es5-old.js", () =>
    compile("async.js", presetOptions, { oldHelper: true }),
  );
  runFixture("async-custom-promise.es5.js", () =>
    compile("async-custom-promise.js", customPromiseOptions),
  );
  runFixture("regression.es5.js", () =>
    compile("regression.js", paramsTransformOptions),
  );
  runFixture("class.regenerator.js", () =>
    compile("class.js", regeneratorOnlyOptions),
  );
  runFixture("no-symbol.es5.js", () =>
    compile("tests.no-symbol.js", regeneratorOnlyOptions),
  );

  runFixture("class.es5.js", () => compile("class.js", presetOptions));
  runFixture("replaceWith-falsy.es5.js", () =>
    compile("replaceWith-falsy.js", presetOptions),
  );

  // Untransformed fixtures, run against native generators and async functions.
  for (const file of [
    "tests-node4.es6.js",
    "non-writable-tostringtag-property.js",
    "frozen-intrinsics.js",
  ]) {
    runFixture(file, () => readFileSync(join(fixturesDir, file), "utf8"));
  }

  // These tests compile code with Babel, so they run in the host realm.
  describe("tests.transform.js", () => {
    require("./regenerator-fixtures/tests.transform.js");
  });
});
