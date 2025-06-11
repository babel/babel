/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  readFile,
  writeFileSync,
  copyFileSync,
  mkdirSync,
  readFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { spawn } from "node:child_process";
import { transformSync } from "@babel/core";
import _checkDuplicatedNodes from "@babel/helper-check-duplicate-nodes";
const checkDuplicatedNodes =
  _checkDuplicatedNodes.default || _checkDuplicatedNodes;

import { describeGte, commonJS } from "$repo-utils";

import pluginTransformRegenerator from "../lib/index.js";

import pluginTransformClasses from "@babel/plugin-transform-classes";
import pluginTransformForOf from "@babel/plugin-transform-for-of";
import pluginTransformBlockScoping from "@babel/plugin-transform-block-scoping";
import pluginTransformArrowFunctions from "@babel/plugin-transform-arrow-functions";
import pluginTransformParameters from "@babel/plugin-transform-parameters";
import pluginProposalFunctionSent from "@babel/plugin-proposal-function-sent";

const { require, __dirname } = commonJS(import.meta.url);

const mochaDir = dirname(require.resolve("mocha"));

// https://github.com/facebook/regenerator/blob/cb755fd82c648cbc5307a5a2d61cdd598e698fc4/packages/preset/index.js#L9
const regeneratorPreset = [
  pluginProposalFunctionSent,
  pluginTransformClasses,
  pluginTransformArrowFunctions,
  pluginTransformBlockScoping,
  pluginTransformForOf,
  pluginTransformRegenerator,
];

function convert(es6File, es5File, callback) {
  const transformOptions = {
    plugins: regeneratorPreset,
    parserOpts: {
      strictMode: false,
    },
    ast: true,
    configFile: false,
  };

  readFile(join(__dirname, es6File), "utf-8", function (err, es6) {
    if (err) {
      return callback(err);
    }

    const { code: es5, ast } = transformSync(es6, transformOptions);
    writeFileSync(join(__dirname, es5File), es5);
    try {
      checkDuplicatedNodes(ast);
    } catch (err) {
      err.message =
        "Occurred while transforming: " + es6File + "\n" + err.message;
      throw err;
    }
    callback();
  });
}

function convertOldHelper(es6File, es5File, callback) {
  const transformOptions = {
    plugins: regeneratorPreset,
    parserOpts: {
      strictMode: false,
    },
    ast: true,
    configFile: false,
  };

  readFile(join(__dirname, es6File), "utf-8", function (err, es6) {
    if (err) {
      return callback(err);
    }

    let es5, ast;
    process.env.FORCE_OLD_REGENERATOR = true;
    try {
      ({ code: es5, ast } = transformSync(es6, transformOptions));
    } finally {
      delete process.env.FORCE_OLD_REGENERATOR;
    }
    writeFileSync(join(__dirname, es5File), es5);
    try {
      checkDuplicatedNodes(ast);
    } catch (err) {
      err.message =
        "Occurred while transforming: " + es6File + "\n" + err.message;
      throw err;
    }
    callback();
  });
}

function enqueue(cmd, args = []) {
  describe("regenerator", () => {
    if (typeof cmd === "function") {
      it(`${cmd.name} (${args.join(", ")})`, () =>
        new Promise((resolve, reject) =>
          cmd(...args, err => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          }),
        ));
    } else if (cmd === "mocha") {
      // Matches https://github.com/facebook/regenerator/blob/cb755fd82c648cbc5307a5a2d61cdd598e698fc4/.github/workflows/node.js.yml#L19
      describeGte("12.0.0")("mocha", () => {
        it(`${args.join(" ")}`, () =>
          new Promise((resolve, reject) => {
            let stdout = "";
            let stderr = "";
            const cp = spawn(
              process.execPath,
              [
                join(mochaDir, "bin", "mocha.js"),
                // https://github.com/nodejs/node/pull/58588#issuecomment-2961692890
                "--timeout",
                "10000",
                "--reporter",
                "spec",
                ...args,
              ],
              { cwd: __dirname },
            );
            cp.stdout.on("data", chunk => {
              stdout += chunk;
            });
            cp.stderr.on("data", chunk => {
              stderr += chunk;
            });
            cp.on("exit", async err => {
              if (err) {
                reject(new Error(`STDOUT:\n${stdout}\nSTDERR:\n${stderr}`));
              } else {
                resolve();
              }
            });
          }));
      });
    } else {
      it(`${cmd} ${args.join(" ")}`, () =>
        new Promise((resolve, reject) => {
          const cp = spawn(cmd, args, { cwd: __dirname });
          let stderr = "";
          cp.stderr.on("data", chunk => {
            stderr += chunk;
          });
          cp.on("exit", async err => {
            if (err) {
              reject(new Error("Exited with " + err + "\n" + stderr));
            } else {
              resolve();
            }
          });
        }));
    }
  });
}

try {
  mkdirSync(join(__dirname, "regenerator-fixtures/tmp"));
} catch {}
// TODO: Remove fallback after dropping Node.js 6
// "minNodeVersion": "8.0.0" <-- For Ctrl+F when dropping node 6
(copyFileSync || ((from, to) => writeFileSync(to, readFileSync(from))))(
  join(__dirname, "./regenerator-fixtures/shared.js"),
  join(__dirname, "./regenerator-fixtures/tmp/shared.js"),
);

enqueue(convert, [
  "./regenerator-fixtures/tests.es6.js",
  "./regenerator-fixtures/tmp/tests.es5.js",
]);

enqueue(convertOldHelper, [
  "./regenerator-fixtures/tests.es6.js",
  "./regenerator-fixtures/tmp/tests.es5-old.js",
]);

enqueue(convert, [
  "./regenerator-fixtures/tests-node4.es6.js",
  "./regenerator-fixtures/tmp/tests-node4.es5.js",
]);

enqueue(convert, [
  "./regenerator-fixtures/non-native.js",
  "./regenerator-fixtures/tmp/non-native.es5.js",
]);

enqueue(convert, [
  "./regenerator-fixtures/async.js",
  "./regenerator-fixtures/tmp/async.es5.js",
]);

enqueue(convertOldHelper, [
  "./regenerator-fixtures/async.js",
  "./regenerator-fixtures/tmp/async.es5-old.js",
]);

enqueue(convert, [
  "./regenerator-fixtures/class.js",
  "./regenerator-fixtures/tmp/class.es5.js",
]);

enqueue(convertWithRegeneratorPluginOnly, [
  "./regenerator-fixtures/class.js",
  "./regenerator-fixtures/tmp/class.regenerator.js",
]);

enqueue(convertWithRegeneratorPluginOnly, [
  "./regenerator-fixtures/tests.no-symbol.js",
  "./regenerator-fixtures/tmp/no-symbol.es5.js",
]);

Error.stackTraceLimit = 1000;

/**
 * Convert without using the preset (which also transforms things like classes and arrows)
 */
function convertWithRegeneratorPluginOnly(inputFile, outputFile, callback) {
  const transformOptions = {
    plugins: [pluginTransformRegenerator],
    parserOpts: {
      sourceType: "module",
      allowImportExportEverywhere: true,
      allowReturnOutsideFunction: true,
      allowSuperOutsideMethod: true,
      strictMode: false,
      plugins: ["*", "jsx", "flow"],
    },
    ast: true,
    configFile: false,
  };

  readFile(join(__dirname, inputFile), "utf-8", function (err, input) {
    if (err) {
      return callback(err);
    }

    const { code: output, ast } = transformSync(input, transformOptions);
    writeFileSync(join(__dirname, outputFile), output);
    try {
      checkDuplicatedNodes(ast);
    } catch (err) {
      err.message =
        "Occurred while transforming: " + inputFile + "\n" + err.message;
      throw err;
    }
    callback();
  });
}

function convertWithParamsTransform(es6File, es5File, callback) {
  const transformOptions = {
    plugins: [pluginTransformParameters, ...regeneratorPreset],
    parserOpts: {
      sourceType: "module",
      allowImportExportEverywhere: true,
      allowReturnOutsideFunction: true,
      allowSuperOutsideMethod: true,
      strictMode: false,
      plugins: ["*", "jsx", "flow"],
    },
    ast: true,
    configFile: false,
  };

  readFile(join(__dirname, es6File), "utf-8", function (err, es6) {
    if (err) {
      return callback(err);
    }

    const { code: es5, ast } = transformSync(es6, transformOptions);
    writeFileSync(join(__dirname, es5File), es5);
    try {
      checkDuplicatedNodes(ast);
    } catch (err) {
      err.message =
        "Occurred while transforming: " + es6File + "\n" + err.message;
      throw err;
    }
    callback();
  });
}

enqueue(convertWithParamsTransform, [
  "./regenerator-fixtures/regression.js",
  "./regenerator-fixtures/tmp/regression.es5.js",
]);

function convertWithCustomPromiseReplacer(es6File, es5File, callback) {
  const transformOptions = {
    plugins: [
      function (babel) {
        return {
          visitor: {
            FunctionExpression: {
              exit(path) {
                const stmt = path.get("body.body").find(function (stmt) {
                  return (
                    stmt.isLabeledStatement() &&
                    stmt
                      .get("label")
                      .isIdentifier({ name: "babelInjectPromise" })
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
      },
      ...regeneratorPreset,
    ],
    parserOpts: {
      strictMode: false,
    },
    ast: true,
    configFile: false,
  };

  readFile(join(__dirname, es6File), "utf-8", function (err, es6) {
    if (err) {
      return callback(err);
    }

    const { code: es5, ast } = transformSync(es6, transformOptions);
    writeFileSync(join(__dirname, es5File), es5);
    try {
      checkDuplicatedNodes(ast);
    } catch (err) {
      err.message =
        "Occurred while transforming: " + es6File + "\n" + err.message;
      callback(err);
    }
    callback();
  });
}

enqueue(convertWithCustomPromiseReplacer, [
  "./regenerator-fixtures/async-custom-promise.js",
  "./regenerator-fixtures/tmp/async-custom-promise.es5.js",
]);

enqueue(convert, [
  "./regenerator-fixtures/replaceWith-falsy.js",
  "./regenerator-fixtures/tmp/replaceWith-falsy.es5.js",
]);

enqueue("mocha", ["./regenerator-fixtures/tmp/tests.es5.js"]);
enqueue("mocha", ["./regenerator-fixtures/tmp/tests.es5-old.js"]);
enqueue("mocha", ["./regenerator-fixtures/tmp/tests-node4.es5.js"]);
enqueue("mocha", ["./regenerator-fixtures/tmp/non-native.es5.js"]);
enqueue("mocha", ["./regenerator-fixtures/tmp/async.es5.js"]);
enqueue("mocha", ["./regenerator-fixtures/tmp/async.es5-old.js"]);
enqueue("mocha", ["./regenerator-fixtures/tmp/async-custom-promise.es5.js"]);
enqueue("mocha", ["./regenerator-fixtures/tmp/regression.es5.js"]);
enqueue("mocha", ["./regenerator-fixtures/tests.transform.js"]);
enqueue("mocha", ["./regenerator-fixtures/tmp/class.regenerator.js"]);

enqueue("mocha", ["./regenerator-fixtures/tests-node4.es6.js"]);

enqueue("mocha", [
  "./regenerator-fixtures/non-writable-tostringtag-property.js",
]);

enqueue("mocha", ["./regenerator-fixtures/frozen-intrinsics.js"]);

enqueue("mocha", ["./regenerator-fixtures/tmp/no-symbol.es5.js"]);
