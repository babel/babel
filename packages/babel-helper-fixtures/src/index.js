import pathExists from "path-exists";
import trimRight from "trim-right";
import resolve from "try-resolve";
import path from "path";
import fs from "fs";
import _ from "lodash";

function humanize(val, noext) {
  if (noext) val = path.basename(val, path.extname(val));
  return val.replace(/-/g, " ");
}

export default function get(entryLoc) {
  let suites = [];

  let rootOpts = {};
  let rootOptsLoc = resolve(entryLoc + "/options");
  if (rootOptsLoc) rootOpts = require(rootOptsLoc);

  _.each(fs.readdirSync(entryLoc), function (suiteName) {
    if (suiteName[0] === ".") return;

    let suite = {
      options: _.clone(rootOpts),
      tests: [],
      title: humanize(suiteName),
      filename: entryLoc + "/" + suiteName
    };
    suites.push(suite);

    let suiteOptsLoc = resolve(suite.filename + "/options");
    if (suiteOptsLoc) suite.options = require(suiteOptsLoc);

    if (fs.statSync(suite.filename).isFile()) {
      push(suiteName, suite.filename);
    } else {
      _.each(fs.readdirSync(suite.filename), function (taskName) {
        let taskDir = suite.filename + "/" + taskName;
        push(taskName, taskDir);
      });
    }

    function push(taskName, taskDir) {
      // tracuer error tests
      if (taskName.indexOf("Error_") >= 0) return;

      let actualLocAlias = suiteName + "/" + taskName + "/actual.js";
      let expectLocAlias = suiteName + "/" + taskName + "/expected.js";
      let execLocAlias   = suiteName + "/" + taskName + "/exec.js";

      let actualLoc = taskDir + "/actual.js";
      let expectLoc = taskDir + "/expected.js";
      let execLoc   = taskDir + "/exec.js";

      if (resolve.relative(expectLoc + "on")) {
        expectLoc += "on";
        expectLocAlias += "on";
      }

      if (fs.statSync(taskDir).isFile()) {
        let ext = path.extname(taskDir);
        if (ext !== ".js" && ext !== ".module.js") return;

        execLoc = taskDir;
      }

      let taskOpts = _.merge({
        filenameRelative: expectLocAlias,
        sourceFileName:   actualLocAlias,
        sourceMapName:    expectLocAlias
      }, _.cloneDeep(suite.options));

      let taskOptsLoc = resolve(taskDir + "/options");
      if (taskOptsLoc) _.merge(taskOpts, require(taskOptsLoc));

      let test = {
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

      let shouldSkip = function (code) {
        return code.indexOf("// Error:") >= 0 || code.indexOf("// Skip.") >= 0;
      };

      if (shouldSkip(test.actual.code) || shouldSkip(test.exec.code)) {
        return;
      } else if (test.exec.code.indexOf("// Async.") >= 0) {
        //test.options.asyncExec = true;
        return;
      }

      suite.tests.push(test);

      let sourceMappingsLoc = taskDir + "/source-mappings.json";
      if (pathExists.sync(sourceMappingsLoc)) {
        test.sourceMappings = JSON.parse(readFile(sourceMappingsLoc));
      }

      let sourceMapLoc = taskDir + "/source-map.json";
      if (pathExists.sync(sourceMapLoc)) {
        test.sourceMap = JSON.parse(readFile(sourceMapLoc));
      }
    }
  });

  return suites;
}

function readFile(filename) {
  if (pathExists.sync(filename)) {
    let file = trimRight(fs.readFileSync(filename, "utf8"));
    file = file.replace(/\r\n/g, "\n");
    return file;
  } else {
    return "";
  }
}
