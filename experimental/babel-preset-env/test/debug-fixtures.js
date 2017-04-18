const chai = require("chai");
const child = require("child_process");
const fs = require("fs-extra");
const helper = require("babel-helper-fixtures");
const path = require("path");

const fixtureLoc = path.join(__dirname, "debug-fixtures");
const tmpLoc = path.join(__dirname, "tmp");

const clear = () => {
  process.chdir(__dirname);
  if (fs.existsSync(tmpLoc)) fs.removeSync(tmpLoc);
  fs.mkdirSync(tmpLoc);
  process.chdir(tmpLoc);
};

const saveInFiles = files => {
  Object.keys(files).forEach(filename => {
    const content = files[filename];
    fs.outputFileSync(filename, content);
  });
};

const assertTest = (stdout, stderr, opts) => {
  stderr = stderr.trim();

  if (stderr) {
    throw new Error("stderr:\n" + stderr);
  }

  stdout = stdout.trim();
  stdout = stdout.replace(/\\/g, "/");

  if (opts.stdout) {
    const expectStdout = opts.stdout.trim();
    chai.expect(stdout).to.equal(expectStdout, "stdout didn't match");
  } else {
    const file = path.join(opts.testLoc, "stdout.txt");
    console.log(`New test file created: ${file}`);
    fs.outputFileSync(file, stdout);
  }
};

const buildTest = opts => {
  const binLoc = path.join(process.cwd(), "node_modules/.bin/babel");

  return callback => {
    clear();
    saveInFiles(opts.inFiles);

    let args = [binLoc];
    args = args.concat(opts.args);

    const spawn = child.spawn(process.execPath, args);

    let stdout = "";
    let stderr = "";

    spawn.stdout.on("data", chunk => stdout += chunk);
    spawn.stderr.on("data", chunk => stderr += chunk);

    spawn.on("close", () => {
      let err;

      try {
        assertTest(stdout, stderr, opts);
      } catch (e) {
        err = e;
      }

      callback(err);
    });
  };
};

describe("debug output", () => {
  fs.readdirSync(fixtureLoc).forEach(testName => {
    const testLoc = path.join(fixtureLoc, testName);

    const opts = {
      args: ["src", "--out-dir", "lib"],
      testLoc: testLoc,
    };

    const stdoutLoc = path.join(testLoc, "stdout.txt");

    if (fs.existsSync(stdoutLoc)) {
      opts.stdout = helper.readFile(stdoutLoc);
    }

    const optionsLoc = path.join(testLoc, "options.json");

    if (!fs.existsSync(optionsLoc)) {
      throw new Error(
        `Debug test '${testName}' is missing an options.json file`,
      );
    }

    const inFilesFolderLoc = path.join(testLoc, "in");

    opts.inFiles = {
      ".babelrc": helper.readFile(optionsLoc),
    };

    if (!fs.existsSync(inFilesFolderLoc)) {
      opts.inFiles["src/in.js"] = "";
    } else {
      fs.readdirSync(inFilesFolderLoc).forEach(filename => {
        opts.inFiles[`src/${filename}`] = helper.readFile(
          path.join(inFilesFolderLoc, filename),
        );
      });
    }
    it(testName, buildTest(opts));
  });
});
