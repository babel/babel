import resolve from "try-resolve";
import path from "path";
import fs from "fs";
import _ from "lodash";

function humanize(val, noext) {
  if (noext) val = path.basename(val, path.extname(val));
  return val.replace(/-/g, " ");
}

type TestFile = {
  loc: string;
  code: string;
  filename: string;
};

type Test = {
  title: string;
  disabled: boolean;
  options: Object;
  exec: TestFile;
  actual: TestFile;
  expected: TestFile;
};

type Suite = {
  options: Object;
  tests: Array<Test>;
  title: string;
  filename: string;
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

  let ext = path.extname(name);
  let base = path.basename(name, ext);

  return name[0] === "." || ext === ".md" || base === "LICENSE" || base === "options";
}

export default function get(entryLoc): Array<Suite> {
  let suites = [];

  let rootOpts = {};
  let rootOptsLoc = resolve(entryLoc + "/options");
  if (rootOptsLoc) rootOpts = require(rootOptsLoc);

  for (let suiteName of fs.readdirSync(entryLoc)) {
    if (shouldIgnore(suiteName)) continue;

    let suite = {
      options: _.clone(rootOpts),
      tests: [],
      title: humanize(suiteName),
      filename: entryLoc + "/" + suiteName
    };

    assertDirectory(suite.filename);
    suites.push(suite);

    let suiteOptsLoc = resolve(suite.filename + "/options");
    if (suiteOptsLoc) suite.options = require(suiteOptsLoc);

    for (let taskName of fs.readdirSync(suite.filename)) {
      if (shouldIgnore(taskName)) continue;
      push(taskName, suite.filename + "/" + taskName);
    }

    function push(taskName, taskDir) {
      let actualLocAlias = suiteName + "/" + taskName + "/actual.js";
      let expectLocAlias = suiteName + "/" + taskName + "/expected.js";
      let execLocAlias   = suiteName + "/" + taskName + "/exec.js";

      let actualLoc = taskDir + "/actual.js";
      let expectLoc = taskDir + "/expected.js";
      let execLoc   = taskDir + "/exec.js";

      if (fs.statSync(taskDir).isFile()) {
        let ext = path.extname(taskDir);
        if (ext !== ".js" && ext !== ".module.js") return;

        execLoc = taskDir;
      }

      if (resolve.relative(expectLoc + "on")) {
        expectLoc += "on";
        expectLocAlias += "on";
      }

      let taskOpts = _.cloneDeep(suite.options);

      let taskOptsLoc = resolve(taskDir + "/options");
      if (taskOptsLoc) _.merge(taskOpts, require(taskOptsLoc));

      let test = {
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
          filename: expectLocAlias
        }
      };

      // traceur checks

      if (test.exec.code.indexOf("// Async.") >= 0) {
        return;
      }

      suite.tests.push(test);

      let sourceMappingsLoc = taskDir + "/source-mappings.json";
      if (fs.existsSync(sourceMappingsLoc)) {
        test.sourceMappings = JSON.parse(readFile(sourceMappingsLoc));
      }

      let sourceMapLoc = taskDir + "/source-map.json";
      if (fs.existsSync(sourceMapLoc)) {
        test.sourceMap = JSON.parse(readFile(sourceMapLoc));
      }
    }
  }

  return suites;
}

export function multiple(entryLoc, ignore?: Array<string>) {
  let categories = {};

  for (let name of fs.readdirSync(entryLoc)) {
    if (shouldIgnore(name, ignore)) continue;

    let loc = path.join(entryLoc, name);
    assertDirectory(loc);

    categories[name] = get(loc);
  }

  return categories;
}

export function readFile(filename) {
  if (fs.existsSync(filename)) {
    let file = _.trimEnd(fs.readFileSync(filename, "utf8"));
    file = file.replace(/\r\n/g, "\n");
    return file;
  } else {
    return "";
  }
}
