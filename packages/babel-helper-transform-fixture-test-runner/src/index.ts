/* eslint-env jest */
import * as babel from "@babel/core";
import type { FileResult } from "@babel/core";
import {
  default as getFixtures,
  resolveOptionPluginOrPreset,
  type Test,
  type TestFile,
  type TaskOptions,
} from "@babel/helper-fixtures";
import { codeFrameColumns } from "@babel/code-frame";
import visualizeSourceMap from "./source-map-visualizer.ts";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { diff } from "jest-diff";

import checkDuplicateNodes from "@babel/helper-check-duplicate-nodes";
import { runCodeMayInWorker } from "./exec.ts";

const EXTERNAL_HELPERS_VERSION = "7.100.0";

async function maybeMockConsole<R>(
  validateLogs: boolean,
  run: () => Promise<R>,
) {
  const actualLogs = { stdout: "", stderr: "" };

  if (!validateLogs) return { result: await run(), actualLogs };

  const spy1 = jest.spyOn(console, "log").mockImplementation(msg => {
    actualLogs.stdout += `${msg}\n`;
  });
  const spy2 = jest.spyOn(console, "warn").mockImplementation(msg => {
    actualLogs.stderr += `${msg}\n`;
  });

  try {
    return { result: await run(), actualLogs };
  } finally {
    spy1.mockRestore();
    spy2.mockRestore();
  }
}

async function run(task: Test) {
  const {
    actual,
    expect: expected,
    exec,
    options: opts,
    doNotSetSourceType,
    optionsDir,
    validateLogs,
    ignoreOutput,
    stdout,
    stderr,
  } = task;

  // todo(flow->ts) add proper return type (added any, because empty object is inferred)
  function getOpts(self: TestFile): any {
    const newOpts = {
      ast: true,
      cwd: path.dirname(self.loc),
      filename: self.loc,
      filenameRelative: self.filename,
      sourceFileName: self.filename,
      ...(doNotSetSourceType ? {} : { sourceType: "script" }),
      babelrc: false,
      configFile: false,
      inputSourceMap: task.inputSourceMap || undefined,
      ...opts,
    };

    return resolveOptionPluginOrPreset(newOpts, optionsDir);
  }

  let execCode = exec.code;
  let result: FileResult;
  let execErr: Error;

  if (execCode) {
    const execOpts = getOpts(exec);
    if (execOpts.targets?.node === "current" && process.env.EXEC_TESTS_NODE) {
      execOpts.targets.node = process.env.EXEC_TESTS_NODE;
    }
    // Ignore Babel logs of exec.js files.
    // They will be validated in input/output files.
    ({ result } = await maybeMockConsole(validateLogs, () =>
      babel.transformAsync(execCode, execOpts),
    ));

    checkDuplicateNodes(result.ast);
    execCode = result.code;

    try {
      await runCodeMayInWorker(execCode, execOpts);
    } catch (err) {
      // Pass empty location to include the whole file in the output.
      if (typeof err === "object" && err.message) {
        err.message =
          `${exec.loc}: ${err.message}\n` +
          codeFrameColumns(execCode, {} as any);
      }

      execErr = err;
    }
  }

  const inputCode = actual.code;
  const expectedCode = expected.code;
  if (!execCode || inputCode) {
    let actualLogs;

    ({ result, actualLogs } = await maybeMockConsole(validateLogs, () =>
      babel.transformAsync(inputCode, getOpts(actual)),
    ));

    const outputCode = normalizeOutput(result.code, {
      normalizePathSeparator: true,
    });

    checkDuplicateNodes(result.ast);
    if (!ignoreOutput) {
      if (
        !expected.code &&
        outputCode &&
        !opts.throws &&
        fs.statSync(path.dirname(expected.loc)).isDirectory() &&
        !process.env.CI
      ) {
        const expectedFile = expected.loc.replace(
          /\.m?js$/,
          result.sourceType === "module" ? ".mjs" : ".js",
        );

        console.log(`New test file created: ${expectedFile}`);
        fs.writeFileSync(expectedFile, `${outputCode}\n`);

        if (expected.loc !== expectedFile) {
          try {
            fs.unlinkSync(expected.loc);
          } catch (_) {}
        }
      } else {
        validateFile(outputCode, expected.loc, expectedCode);

        if (inputCode) {
          expect(expected.loc).toMatch(
            result.sourceType === "module" ? /\.mjs$/ : /\.js$/,
          );
        }
      }
    }

    if (validateLogs) {
      const normalizationOpts = {
        normalizePathSeparator: true,
        normalizePresetEnvDebug: task.taskDir.includes("babel-preset-env"),
      };

      validateFile(
        normalizeOutput(actualLogs.stdout, normalizationOpts),
        stdout.loc,
        stdout.code,
      );
      validateFile(
        normalizeOutput(actualLogs.stderr, normalizationOpts),
        stderr.loc,
        stderr.code,
      );
    }
  }

  if (execErr) {
    throw execErr;
  }

  if (task.validateSourceMapVisual === true) {
    const visual = visualizeSourceMap(result.code, result.map);
    try {
      expect(visual).toEqual(task.sourceMapVisual.code);
    } catch (e) {
      if (!process.env.OVERWRITE && task.sourceMapVisual.code) throw e;

      console.log(`Updated test file: ${task.sourceMapVisual.loc}`);
      fs.writeFileSync(
        task.sourceMapVisual.loc ?? task.taskDir + "/source-map-visual.txt",
        visual + "\n",
      );
    }
  }

  if (opts.sourceMaps === true) {
    try {
      expect(result.map).toEqual(task.sourceMap);
    } catch (e) {
      if (!process.env.OVERWRITE && task.sourceMap) throw e;

      task.sourceMapFile.loc ??= task.taskDir + "/source-map.json";

      console.log(`Updated test file: ${task.sourceMapFile.loc}`);
      fs.writeFileSync(
        task.sourceMapFile.loc,
        JSON.stringify(result.map, null, 2),
      );
    }
  }
}

function validateFile(
  actualCode: string,
  expectedLoc: string,
  expectedCode: string,
) {
  if (actualCode !== expectedCode) {
    if (process.env.OVERWRITE) {
      console.log(`Updated test file: ${expectedLoc}`);
      fs.writeFileSync(expectedLoc, `${actualCode}\n`);
      return;
    }

    throw new Error(
      `Expected ${expectedLoc} to match transform output.\n` +
        `To autogenerate a passing version of this file, delete ` +
        `the file and re-run the tests.\n\n` +
        `Diff:\n\n${diff(expectedCode, actualCode, { expand: false })}`,
    );
  }
}

function escapeRegExp(string: string) {
  return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
}

function normalizeOutput(
  code: string,
  { normalizePathSeparator = false } = {},
) {
  const dir = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../../../",
  );
  const symbol = "<CWD>";
  let result = code
    .trim()
    // (non-win32) /foo/babel/packages -> <CWD>/packages
    // (win32) C:\foo\babel\packages -> <CWD>\packages
    .replace(new RegExp(escapeRegExp(dir), "g"), symbol);
  if (process.platform === "win32") {
    result = result
      // C:/foo/babel/packages -> <CWD>/packages
      .replace(new RegExp(escapeRegExp(dir.replace(/\\/g, "/")), "g"), symbol)
      // C:\\foo\\babel\\packages -> <CWD>\\packages (in js string literal)
      .replace(
        new RegExp(escapeRegExp(dir.replace(/\\/g, "\\\\")), "g"),
        symbol,
      );
    if (normalizePathSeparator) {
      result = result.replace(
        new RegExp(`${escapeRegExp(symbol)}[\\w\\\\/.-]+`, "g"),
        path => path.replace(/\\\\?/g, "/"),
      );
    }
  }

  return result;
}

export type SuiteOptions = {
  ignoreSuites?: string[];
  ignoreTasks?: string[];
};

export default function (
  fixturesLoc: string,
  name: string,
  suiteOpts: SuiteOptions = {},
  taskOpts: TaskOptions = {},
  dynamicOpts?: (options: TaskOptions, task: Test) => void,
) {
  const suites = getFixtures(fixturesLoc);

  for (const testSuite of suites) {
    if (suiteOpts.ignoreSuites?.includes(testSuite.title)) continue;

    describe(name + "/" + testSuite.title, function () {
      for (const task of testSuite.tests) {
        if (
          suiteOpts.ignoreTasks?.includes(task.title) ||
          suiteOpts.ignoreTasks?.includes(testSuite.title + "/" + task.title)
        ) {
          continue;
        }

        const testFn = task.disabled ? it.skip : it;
        const testTitle =
          typeof task.disabled === "string"
            ? `(SKIP: ${task.disabled}) ${task.title}`
            : task.title;

        testFn(
          testTitle,

          async function () {
            const runTask = () => run(task);

            if ("sourceMap" in task.options) {
              throw new Error(
                "`sourceMap` option is deprecated. Use `sourceMaps` instead.",
              );
            }

            if ("sourceMaps" in task.options === false) {
              task.options.sourceMaps = !!task.sourceMap;
            }

            Object.assign(task.options, taskOpts);

            if (dynamicOpts) dynamicOpts(task.options, task);

            if (task.externalHelpers) {
              (task.options.plugins ??= []).push([
                "external-helpers",
                { helperVersion: EXTERNAL_HELPERS_VERSION },
              ]);
            }

            const throwMsg = task.options.throws;
            if (throwMsg) {
              // internal api doesn't have this option but it's best not to pollute
              // the options object with useless options
              delete task.options.throws;

              await assert.rejects(runTask, function (err: Error) {
                assert.ok(
                  throwMsg === true || err.message.includes(throwMsg),
                  `
Expected Error: ${throwMsg}
Actual Error: ${err.message}`,
                );
                return true;
              });
            } else {
              return runTask();
            }
          },
        );
      }
    });
  }
}

export { createTestContext, runCodeInTestContext, runCode } from "./worker.cts";
export { buildProcessTests, buildParallelProcessTests } from "./process.ts";
export type {
  ProcessTestOpts,
  ProcessTest,
  ProcessTestBeforeHook,
  ProcessTestAfterHook,
} from "./process.ts";
