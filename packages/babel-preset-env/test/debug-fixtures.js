const child = require("child_process");
const fs = require("fs-extra");
const helper = require("@babel/helper-fixtures");
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

const testOutputType = (type, stdTarg, opts) => {
  stdTarg = stdTarg.trim();
  stdTarg = stdTarg.replace(/\\/g, "/");
  const optsTarg = opts[type];

  if (optsTarg) {
    const expectStdout = optsTarg.trim();
    expect(stdTarg).toBe(expectStdout);
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
    spawn.stderr.on("data", chunk => (stderr += chunk));

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
  let cwd;

  beforeEach(() => {
    cwd = process.cwd();
  });

  afterEach(() => {
    process.chdir(cwd);
  });

  fs.readdirSync(fixtureLoc).forEach(testName => {
    if (testName.slice(0, 1) === ".") return;
    const testLoc = path.join(fixtureLoc, testName);

    const opts = {
      args: ["src", "--out-dir", "lib"],
      testLoc: testLoc,
    };

    const stdoutLoc = path.join(testLoc, "stdout.txt");
    const stderrLoc = path.join(testLoc, "stderr.txt");

    if (fs.existsSync(stdoutLoc)) {
      opts.stdout = helper.readFile(stdoutLoc);
    }

    if (fs.existsSync(stderrLoc)) {
      opts.stderr = helper.readFile(stderrLoc);
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
