const chai = require("chai");
const child = require("child_process");
const fs = require("fs-extra");
const helper = require("@babel/helper-fixtures");
const path = require("path");

const debugFixtureLoc = path.join(__dirname, "debug-fixtures");
const silentFixtureLoc = path.join(__dirname, "silent-fixtures");
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

const testOutputType = (type, stdTarg, opts) => {
  stdTarg = stdTarg.trim();
  stdTarg = stdTarg.replace(/\\/g, "/");
  const optsTarg = opts[type];

  if (optsTarg) {
    const expectStdout = optsTarg.trim();
    chai.expect(stdTarg).to.equal(expectStdout, `${type} didn't match`);
  } else {
    const file = path.join(opts.testLoc, `${type}.txt`);
    console.log(`New test file created: ${file}`);
    fs.outputFileSync(file, stdTarg);
  }
};

const assertTest = (stdout, stderr, opts) => {
  testOutputType("stdout", stdout, opts);
  if (stderr) {
    testOutputType("stderr", stderr, opts);
  }
};

const buildTest = opts => {
  const binLoc = require.resolve("@babel/cli/bin/babel");

  return callback => {
    clear();
    saveInFiles(opts.inFiles);

    let args = [binLoc];
    args = args.concat(opts.args);

    const spawn = child.spawn(process.execPath, args);

    let stdout = "";
    let stderr = "";

    spawn.stdout.on("data", chunk => (stdout += chunk));
    if (opts.withStderr) {
      spawn.stderr.on("data", chunk => (stderr += chunk));
    }

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

const checkOutput = checkOpts => {
  fs.readdirSync(checkOpts.fixtureLoc).forEach(testName => {
    if (testName.slice(0, 1) === ".") return;
    const testLoc = path.join(checkOpts.fixtureLoc, testName);

    const opts = {
      args: checkOpts.args,
      testLoc: testLoc,
      withStderr: !!checkOpts.stderrName,
    };

    const stdoutLoc = path.join(testLoc, checkOpts.stdoutName);
    const stderrLoc = checkOpts.stderrName
      ? path.join(testLoc, checkOpts.stderrName)
      : null;

    if (fs.existsSync(stdoutLoc)) {
      opts.stdout = helper.readFile(stdoutLoc);
    }

    if (stderrLoc && fs.existsSync(stderrLoc)) {
      opts.stderr = helper.readFile(stderrLoc);
    }

    const optionsLoc = path.join(testLoc, "options.json");

    if (!fs.existsSync(optionsLoc)) {
      throw new Error(
        `Debug test '${testName}' is missing an options.json file`,
      );
    }

    opts.inFiles = {
      ".babelrc": helper.readFile(optionsLoc),
    };

    const inFilesFolderLoc = checkOpts.dirName
      ? path.join(testLoc, checkOpts.dirName)
      : testLoc;

    if (checkOpts.dirName && !fs.existsSync(inFilesFolderLoc)) {
      opts.inFiles["src/in.js"] = "";
    } else {
      fs.readdirSync(inFilesFolderLoc).forEach(filename => {
        if (filename === "options.json") return;
        opts.inFiles[`src/${filename}`] = helper.readFile(
          path.join(inFilesFolderLoc, filename),
        );
      });
    }
    it(testName, buildTest(opts));
  });
};

describe("debug output", () => {
  checkOutput({
    args: ["src", "--out-dir", "lib"],
    fixtureLoc: debugFixtureLoc,
    stdoutName: "stdout.txt",
    stderrName: "stderr.txt",
    dirName: "in",
  });
});

describe("silent output", () => {
  checkOutput({
    args: ["src/input.js"],
    fixtureLoc: silentFixtureLoc,
    stdoutName: "output.js",
  });
});
