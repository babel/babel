import cloneDeep from "lodash/cloneDeep";
import semver from "semver";
import path from "path";
import fs from "fs";

const nodeVersion = semver.clean(process.version.slice(1));

function humanize(val, noext) {
  if (noext) val = path.basename(val, path.extname(val));
  return val.replace(/-/g, " ");
}

type TestFile = {
  loc: string,
  code: string,
  filename: string,
};

type Test = {
  title: string,
  disabled: boolean,
  options: Object,
  exec: TestFile,
  actual: TestFile,
  expected: TestFile,
};

type Suite = {
  options: Object,
  tests: Array<Test>,
  title: string,
  filename: string,
};

function tryResolve(module) {
  try {
    return require.resolve(module);
  } catch (e) {
    return null;
  }
}
function assertDirectory(loc) {
  if (!fs.statSync(loc).isDirectory()) {
    throw new Error(`Expected ${loc} to be a directory.`);
  }
}

function shouldIgnore(name, ignore?: Array<string>) {
  if (ignore && ignore.indexOf(name) >= 0) {
    return true;
  }

  const ext = path.extname(name);
  const base = path.basename(name, ext);

  return (
    name[0] === "." || ext === ".md" || base === "LICENSE" || base === "options"
  );
}

const EXTENSIONS = [".js", ".mjs", ".ts", ".tsx"];

function findFile(filepath: string, allowJSON: boolean) {
  const matches = [];

  for (const ext of EXTENSIONS.concat(allowJSON ? ".json" : [])) {
    const name = filepath + ext;

    if (fs.existsSync(name)) matches.push(name);
  }

  if (matches.length > 1) {
    throw new Error(`Found conflicting file matches: ${matches.join(", ")}`);
  }

  return matches[0];
}

function pushTask(taskName, taskDir, suite, suiteName) {
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

  const taskOpts = cloneDeep(suite.options);

  const taskOptsLoc = tryResolve(taskDir + "/options");
  if (taskOptsLoc) Object.assign(taskOpts, require(taskOptsLoc));

  const test = {
    optionsDir: taskOptsLoc ? path.dirname(taskOptsLoc) : null,
    title: humanize(taskName, true),
    disabled: taskName[0] === ".",
    options: taskOpts,
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
  };

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

  const sourceMappingsLoc = taskDir + "/source-mappings.json";
  if (fs.existsSync(sourceMappingsLoc)) {
    test.sourceMappings = JSON.parse(readFile(sourceMappingsLoc));
  }

  const sourceMapLoc = taskDir + "/source-map.json";
  if (fs.existsSync(sourceMapLoc)) {
    test.sourceMap = JSON.parse(readFile(sourceMapLoc));
  }

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
    if (test.sourceMappings) {
      throw new Error(
        "Test cannot throw and also return sourcemappings: " +
          sourceMappingsLoc,
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
  if (test.options.ignoreOutput) {
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
}

export default function get(entryLoc): Array<Suite> {
  const suites = [];

  let rootOpts = {};
  const rootOptsLoc = tryResolve(entryLoc + "/options");
  if (rootOptsLoc) rootOpts = require(rootOptsLoc);

  for (const suiteName of fs.readdirSync(entryLoc)) {
    if (shouldIgnore(suiteName)) continue;

    const suite = {
      options: { ...rootOpts },
      tests: [],
      title: humanize(suiteName),
      filename: entryLoc + "/" + suiteName,
    };

    assertDirectory(suite.filename);
    suites.push(suite);

    const suiteOptsLoc = tryResolve(suite.filename + "/options");
    if (suiteOptsLoc) suite.options = require(suiteOptsLoc);

    for (const taskName of fs.readdirSync(suite.filename)) {
      pushTask(taskName, suite.filename + "/" + taskName, suite, suiteName);
    }
  }

  return suites;
}

export function multiple(entryLoc, ignore?: Array<string>) {
  const categories = {};

  for (const name of fs.readdirSync(entryLoc)) {
    if (shouldIgnore(name, ignore)) continue;

    const loc = path.join(entryLoc, name);
    assertDirectory(loc);

    categories[name] = get(loc);
  }

  return categories;
}

export function readFile(filename) {
  if (fs.existsSync(filename)) {
    let file = fs.readFileSync(filename, "utf8").trimRight();
    file = file.replace(/\r\n/g, "\n");
    return file;
  } else {
    return "";
  }
}
