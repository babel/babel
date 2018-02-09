const chai = require("chai");
const child = require("child_process");
const fs = require("fs-extra");
const helper = require("@babel/helper-fixtures");
const path = require("path");

const debugFixtureLoc = path.join(__dirname, "debug-fixtures");
const tmpLoc = path.join(__dirname, "tmp");

const DIR_NAME = "in";
const STDOUT_NAME = "stdout.txt";
const STDERR_NAME = "stderr.txt";

const debugConfig = {
  args: ["src", "--out-dir", "lib"],
  withStderr: true,
};

const silentConfig = {
  args: ["src/in.js"],
};

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
  const { testName, testLoc, options, args, withStderr } = checkOpts;

  const opts = {
    args,
    testLoc,
    withStderr: checkOpts.withStderr,
  };

  const stdoutLoc = path.join(testLoc, STDOUT_NAME);
  const stderrLoc = withStderr ? path.join(testLoc, STDERR_NAME) : null;

  if (fs.existsSync(stdoutLoc)) {
    opts.stdout = helper.readFile(stdoutLoc);
  }

  if (stderrLoc && fs.existsSync(stderrLoc)) {
    opts.stderr = helper.readFile(stderrLoc);
  }

  opts.inFiles = {
    ".babelrc": JSON.stringify(options),
  };

  const inFilesFolderLoc = path.join(testLoc, DIR_NAME);

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
};

describe("debug output", () => {
  fs.readdirSync(debugFixtureLoc).forEach(testName => {
    // Ignore hidden files.
    if (testName.slice(0, 1) === ".") return;
    const testLoc = path.join(debugFixtureLoc, testName);
    const optionsLoc = path.join(testLoc, "options.json");

    if (!fs.existsSync(optionsLoc)) {
      throw new Error(
        `Debug test '${testName}' is missing an options.json file`,
      );
    }

    const options = JSON.parse(helper.readFile(optionsLoc));
    /* This test is intentionally set to silent to suppress the polyfill warnings,
       since we want to ensure these imports get removed. */
    const isSilent = options.silent;
    delete options.silent;

    const config = isSilent ? silentConfig : debugConfig;

    checkOutput({ ...config, testName, testLoc, options });
  });
});
