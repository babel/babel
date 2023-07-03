/// <reference path="../../../lib/semver.d.ts" />

// TODO(Babel 8): Use "semver" directly
import semver from "@nicolo-ribaudo/semver-v6";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import type { InputOptions } from "@babel/core";
import type { EncodedSourceMap } from "@jridgewell/gen-mapping";

const require = createRequire(import.meta.url);

const nodeVersion = semver.clean(process.version.slice(1));

function humanize(val: string, noext?: boolean) {
  if (noext) val = path.basename(val, path.extname(val));
  return val.replace(/-/g, " ");
}

interface TestIO {
  loc: string;
  code: string;
}

export interface TestFile extends TestIO {
  filename: string;
}

export interface Test {
  taskDir: string;
  title: string;
  disabled: boolean;
  options: TaskOptions;
  optionsDir: string;
  doNotSetSourceType: boolean;
  externalHelpers: boolean;
  ignoreOutput: boolean;
  stdout: TestIO;
  stderr: TestIO;
  exec: TestFile;
  actual: TestFile;
  expect: TestFile;
  inputSourceMap?: EncodedSourceMap;
  sourceMap: string;
  sourceMapFile: TestFile;
  validateLogs: boolean;
}

export interface TaskOptions extends InputOptions {
  BABEL_8_BREAKING?: boolean;
  DO_NOT_SET_SOURCE_TYPE?: boolean;
  externalHelpers?: boolean;
  ignoreOutput?: boolean;
  minNodeVersion?: string;
  sourceMap?: boolean;
  os?: string | string[];
  validateLogs?: boolean;
  throws?: boolean | string;
}

type Suite = {
  options: TaskOptions;
  tests: Array<Test>;
  title: string;
  filename: string;
};

function tryResolve(module: string) {
  try {
    return require.resolve(module);
  } catch (e) {
    return null;
  }
}
function assertDirectory(loc: string) {
  if (!fs.statSync(loc).isDirectory()) {
    throw new Error(`Expected ${loc} to be a directory.`);
  }
}

function shouldIgnore(name: string, ignore?: Array<string>) {
  if (ignore && ignore.indexOf(name) >= 0) {
    return true;
  }

  const ext = path.extname(name);
  const base = path.basename(name, ext);

  return (
    name[0] === "." ||
    ext === ".md" ||
    base === "LICENSE" ||
    base === "options" ||
    name === "package.json"
  );
}

const EXTENSIONS = [".js", ".mjs", ".ts", ".tsx", ".cts", ".mts", ".vue"];
const JSON_AND_EXTENSIONS = [".json", ...EXTENSIONS];

function findFile(filepath: string, allowJSON?: boolean) {
  const matches = [];
  const extensions = allowJSON ? JSON_AND_EXTENSIONS : EXTENSIONS;

  for (const ext of extensions) {
    const name = filepath + ext;

    if (fs.existsSync(name)) matches.push(name);
  }

  if (matches.length > 1) {
    throw new Error(`Found conflicting file matches: ${matches.join(", ")}`);
  }

  return matches[0];
}

function pushTask(
  taskName: string,
  taskDir: string,
  suite: Suite,
  suiteName: string,
) {
  const taskDirStats = fs.statSync(taskDir);
  let actualLoc = findFile(taskDir + "/input");
  let execLoc = findFile(taskDir + "/exec");

  // If neither input nor exec is present it is not a real testcase
  if (taskDirStats.isDirectory() && !actualLoc && !execLoc) {
    if (fs.readdirSync(taskDir).length > 0) {
      console.warn(`Skipped test folder with invalid layout: ${taskDir}`);
    }
    return;
  } else if (!actualLoc) {
    actualLoc = taskDir + "/input.js";
  } else if (!execLoc) {
    execLoc = taskDir + "/exec.js";
  }

  const expectLoc =
    findFile(taskDir + "/output", true /* allowJSON */) ||
    findFile(`${taskDir}/output.extended`, true) ||
    taskDir + "/output.js";
  const stdoutLoc = taskDir + "/stdout.txt";
  const stderrLoc = taskDir + "/stderr.txt";

  const actualLocAlias =
    suiteName + "/" + taskName + "/" + path.basename(actualLoc);
  const expectLocAlias =
    suiteName + "/" + taskName + "/" + path.basename(actualLoc);
  let execLocAlias =
    suiteName + "/" + taskName + "/" + path.basename(actualLoc);

  if (taskDirStats.isFile()) {
    const ext = path.extname(taskDir);
    if (EXTENSIONS.indexOf(ext) === -1) return;

    execLoc = taskDir;
    execLocAlias = suiteName + "/" + taskName;
  }

  const taskOpts: TaskOptions = JSON.parse(JSON.stringify(suite.options));

  const taskOptsLoc = tryResolve(taskDir + "/options");
  if (taskOptsLoc) Object.assign(taskOpts, require(taskOptsLoc));

  const test: Test = {
    taskDir,
    optionsDir: taskOptsLoc ? path.dirname(taskOptsLoc) : null,
    title: humanize(taskName, true),
    disabled:
      taskName[0] === "." ||
      (process.env.BABEL_8_BREAKING
        ? taskOpts.BABEL_8_BREAKING === false
        : taskOpts.BABEL_8_BREAKING === true),
    options: taskOpts,
    doNotSetSourceType: taskOpts.DO_NOT_SET_SOURCE_TYPE,
    externalHelpers:
      taskOpts.externalHelpers ??
      !!tryResolve("@babel/plugin-external-helpers"),
    validateLogs: taskOpts.validateLogs,
    ignoreOutput: taskOpts.ignoreOutput,
    stdout: { loc: stdoutLoc, code: readFile(stdoutLoc) },
    stderr: { loc: stderrLoc, code: readFile(stderrLoc) },
    exec: {
      loc: execLoc,
      code: readFile(execLoc),
      filename: execLocAlias,
    },
    actual: {
      loc: actualLoc,
      code: readFile(actualLoc),
      filename: actualLocAlias,
    },
    expect: {
      loc: expectLoc,
      code: readFile(expectLoc),
      filename: expectLocAlias,
    },
    sourceMap: undefined,
    sourceMapFile: undefined,
    inputSourceMap: undefined,
  };

  delete taskOpts.BABEL_8_BREAKING;
  delete taskOpts.DO_NOT_SET_SOURCE_TYPE;

  // If there's node requirement, check it before pushing task
  if (taskOpts.minNodeVersion) {
    const minimumVersion = semver.clean(taskOpts.minNodeVersion);

    if (minimumVersion == null) {
      throw new Error(
        `'minNodeVersion' has invalid semver format: ${taskOpts.minNodeVersion}`,
      );
    }

    if (semver.lt(nodeVersion, minimumVersion)) {
      return;
    }

    // Delete to avoid option validation error
    delete taskOpts.minNodeVersion;
  }

  if (taskOpts.os) {
    let os = taskOpts.os;

    if (!Array.isArray(os) && typeof os !== "string") {
      throw new Error(
        `'os' should be either string or string array: ${taskOpts.os}`,
      );
    }

    if (typeof os === "string") {
      os = [os];
    }

    if (!os.includes(process.platform)) {
      return;
    }

    delete taskOpts.os;
  }

  // traceur checks

  if (test.exec.code.indexOf("// Async.") >= 0) {
    return;
  }

  suite.tests.push(test);

  const sourceMapLoc = taskDir + "/source-map.json";
  if (fs.existsSync(sourceMapLoc)) {
    test.sourceMap = JSON.parse(readFile(sourceMapLoc));
  }
  test.sourceMapFile = {
    loc: sourceMapLoc,
    code: test.sourceMap,
    filename: "",
  };

  const inputMapLoc = taskDir + "/input-source-map.json";
  if (fs.existsSync(inputMapLoc)) {
    test.inputSourceMap = JSON.parse(readFile(inputMapLoc));
  }

  if (taskOpts.throws) {
    if (test.expect.code) {
      throw new Error(
        "Test cannot throw and also return output code: " + expectLoc,
      );
    }
    if (test.sourceMap) {
      throw new Error(
        "Test cannot throw and also return sourcemaps: " + sourceMapLoc,
      );
    }
  }

  if (!test.validateLogs && (test.stdout.code || test.stderr.code)) {
    throw new Error(
      "stdout.txt and stderr.txt are only allowed when the 'validateLogs' option is enabled: " +
        (test.stdout.code ? stdoutLoc : stderrLoc),
    );
  }
  if (test.ignoreOutput) {
    if (test.expect.code) {
      throw new Error(
        "Test cannot ignore its output and also validate it: " + expectLoc,
      );
    }
    if (!test.validateLogs) {
      throw new Error(
        "ignoreOutput can only be used when validateLogs is true: " +
          taskOptsLoc,
      );
    }
  }

  // Delete to avoid option validation error
  delete test.options.validateLogs;
  delete test.options.ignoreOutput;
  delete test.options.externalHelpers;
}

function wrapPackagesArray(
  type: "plugin" | "preset",
  names: (string | [string, object?, string?])[],
  optionsDir: string,
) {
  return names.map(function (val) {
    if (typeof val === "string") val = [val];

    // relative path (outside of monorepo)
    if (val[0][0] === ".") {
      if (!optionsDir) {
        throw new Error(
          "Please provide an options.json in test dir when using a " +
            "relative plugin path.",
        );
      }

      val[0] = path.resolve(optionsDir, val[0]);
    } else {
      let name = val[0];
      const match = name.match(/^(@babel\/(?:plugin-|preset-)?)(.*)$/);
      if (match) {
        name = match[2];
      }

      const monorepoPath = path.join(
        path.dirname(fileURLToPath(import.meta.url)),
        "../../..",
        name.startsWith("codemod") ? "codemods" : "packages",
        `babel-${type}-${name}/lib/index.js`,
      );

      if (fs.existsSync(monorepoPath)) {
        if (match) {
          throw new Error(
            `Remove the "${match[1]}" prefix from "${val[0]}", to load it from the monorepo`,
          );
        }

        val[0] = monorepoPath;
      }
    }

    return val;
  });
}

/**
 * Resolve plugins/presets defined in options.json
 *
 * @export
 * @param {{}} options the imported options.json
 * @param {string} optionsDir the directory where options.json is placed
 * @returns {{}} options whose plugins/presets are resolved
 */
export function resolveOptionPluginOrPreset(
  options: any,
  optionsDir: string,
): {} {
  if (options.overrides) {
    for (const subOption of options.overrides) {
      resolveOptionPluginOrPreset(subOption, optionsDir);
    }
  }
  if (options.env) {
    for (const envName in options.env) {
      if (!{}.hasOwnProperty.call(options.env, envName)) continue;
      resolveOptionPluginOrPreset(options.env[envName], optionsDir);
    }
  }
  if (options.plugins) {
    options.plugins = wrapPackagesArray("plugin", options.plugins, optionsDir);
  }
  if (options.presets) {
    options.presets = wrapPackagesArray(
      "preset",
      options.presets,
      optionsDir,
    ).map(function (val) {
      if (val.length > 3) {
        throw new Error(
          "Unexpected extra options " +
            JSON.stringify(val.slice(3)) +
            " passed to preset.",
        );
      }

      return val;
    });
  }
  return options;
}

export default function get(entryLoc: string): Array<Suite> {
  const suites = [];

  let rootOpts: TaskOptions = {};
  const rootOptsLoc = tryResolve(entryLoc + "/options");
  if (rootOptsLoc) rootOpts = require(rootOptsLoc);

  for (const suiteName of fs.readdirSync(entryLoc)) {
    if (shouldIgnore(suiteName)) continue;

    const suite = {
      options: { ...rootOpts },
      tests: [] as Test[],
      title: humanize(suiteName),
      filename: entryLoc + "/" + suiteName,
    };

    assertDirectory(suite.filename);
    suites.push(suite);

    const suiteOptsLoc = tryResolve(suite.filename + "/options");
    if (suiteOptsLoc) {
      suite.options = resolveOptionPluginOrPreset(
        require(suiteOptsLoc),
        suite.filename,
      );
    }

    for (const taskName of fs.readdirSync(suite.filename)) {
      pushTask(taskName, suite.filename + "/" + taskName, suite, suiteName);
    }
  }

  return suites;
}

export function multiple(entryLoc: string, ignore?: Array<string>) {
  const categories: Record<string, unknown> = {};

  for (const name of fs.readdirSync(entryLoc)) {
    if (shouldIgnore(name, ignore)) continue;

    const loc = path.join(entryLoc, name);
    assertDirectory(loc);

    categories[name] = get(loc);
  }

  return categories;
}

export function readFile(filename: string) {
  if (fs.existsSync(filename)) {
    let file = fs.readFileSync(filename, "utf8").trimRight();
    file = file.replace(/\r\n/g, "\n");
    return file;
  } else {
    return "";
  }
}
