import cloneDeep from "lodash/cloneDeep";
import trimEnd from "lodash/trimEnd";
import resolve from "try-resolve";
import clone from "lodash/clone";
import extend from "lodash/extend";
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

function assertDirectory(loc) {
  if (!fs.statSync(loc).isDirectory()) {
    throw new Error(`Expected ${loc} to be a directory.`);
  }
}

function shouldIgnore(name, blacklist?: Array<string>) {
  if (blacklist && blacklist.indexOf(name) >= 0) {
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

  return matches[0] || filepath + ".js";
}

export default function get(entryLoc): Array<Suite> {
  const suites = [];

  let rootOpts = {};
  const rootOptsLoc = resolve(entryLoc + "/options");
  if (rootOptsLoc) rootOpts = require(rootOptsLoc);

  for (const suiteName of fs.readdirSync(entryLoc)) {
    if (shouldIgnore(suiteName)) continue;

    const suite = {
      options: clone(rootOpts),
      tests: [],
      title: humanize(suiteName),
      filename: entryLoc + "/" + suiteName,
    };

    assertDirectory(suite.filename);
    suites.push(suite);

    const suiteOptsLoc = resolve(suite.filename + "/options");
    if (suiteOptsLoc) suite.options = require(suiteOptsLoc);

    for (const taskName of fs.readdirSync(suite.filename)) {
      push(taskName, suite.filename + "/" + taskName);
    }

    function push(taskName, taskDir) {
      const actualLoc = findFile(taskDir + "/input");
      const expectLoc = findFile(taskDir + "/output", true /* allowJSON */);
      let execLoc = findFile(taskDir + "/exec");

      const actualLocAlias =
        suiteName + "/" + taskName + "/" + path.basename(actualLoc);
      const expectLocAlias =
        suiteName + "/" + taskName + "/" + path.basename(actualLoc);
      let execLocAlias =
        suiteName + "/" + taskName + "/" + path.basename(actualLoc);

      if (fs.statSync(taskDir).isFile()) {
        const ext = path.extname(taskDir);
        if (EXTENSIONS.indexOf(ext) === -1) return;

        execLoc = taskDir;
        execLocAlias = suiteName + "/" + taskName;
      }

      const taskOpts = cloneDeep(suite.options);

      const taskOptsLoc = resolve(taskDir + "/options");
      if (taskOptsLoc) extend(taskOpts, require(taskOptsLoc));

      const test = {
        optionsDir: taskOptsLoc ? path.dirname(taskOptsLoc) : null,
        title: humanize(taskName, true),
        disabled: taskName[0] === ".",
        options: taskOpts,
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
            `'minNodeVersion' has invalid semver format: ${
              taskOpts.minNodeVersion
            }`,
          );
        }

        if (semver.lt(nodeVersion, minimumVersion)) {
          return;
        }

        // Delete to avoid option validation error
        delete taskOpts.minNodeVersion;
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
    let file = trimEnd(fs.readFileSync(filename, "utf8"));
    file = file.replace(/\r\n/g, "\n");
    return file;
  } else {
    return "";
  }
}
