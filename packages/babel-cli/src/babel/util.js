let child      = require("child_process");
let commander = require("commander");
let readdir   = require("fs-readdir-recursive");
let index     = require("./index");
let babel     = require("babel-core");
let util      = require("babel-core").util;
let path      = require("path");
let fs        = require("fs");
let _         = require("lodash");
let each      = require("lodash/each");

export function chmod(src, dest) {
  fs.chmodSync(dest, fs.statSync(src).mode);
}

export function readdirFilter(filename) {
  return readdir(filename).filter(function (filename) {
    return util.canCompile(filename);
  });
}

export { readdir };

export let canCompile = util.canCompile;

export function shouldIgnore(loc) {
  return util.shouldIgnore(loc, index.opts.ignore, index.opts.only);
}

export function addSourceMappingUrl(code, loc) {
  return code + "\n//# sourceMappingURL=" + path.basename(loc);
}

export function log(msg) {
  if (!commander.quiet) console.log(msg);
}

export function transform(filename, code, opts) {
  opts = _.defaults(opts || {}, index.opts);
  opts.filename = filename;

  let result = babel.transform(code, opts);
  result.filename = filename;
  result.actual = code;
  return result;
}

export function compile(filename, opts) {
  try {
    let code = fs.readFileSync(filename, "utf8");
    return transform(filename, code, opts);
  } catch (err) {
    if (commander.watch) {
      console.error(toErrorStack(err));
      return { ignored: true };
    } else {
      throw err;
    }
  }
}

function toErrorStack(err) {
  if (err._babel && err instanceof SyntaxError) {
    return `${err.name}: ${err.message}\n${err.codeFrame}`;
  } else {
    return err.stack;
  }
}

process.on("uncaughtException", function (err) {
  console.error(toErrorStack(err));
  process.exit(1);
});

export function requireChokidar() {
  try {
    return require("chokidar");
  } catch (err) {
    console.error(
      "The optional dependency chokidar failed to install and is required for " +
      "--watch. Chokidar is likely not supported on your platform."
    );
    throw err;
  }
}

export function getSettings(filenames) {
  let File = require("babel-core").File;
  let generalOptions = new File( { filename: "unknown" } ).opts;
  let allOptions = [];

  allOptions.push(generalOptions);

  each(filenames, function (file) {
    let fileOptions = new File( { filename: file } ).opts,
        thisFileOptions = {};

    each(fileOptions, function (fileOption, key) {
      if (!generalOptions.hasOwnProperty(key) || JSON.stringify(generalOptions[key]) != JSON.stringify(fileOption)) {
        thisFileOptions[key] = fileOption;
      }
    });
    allOptions.push(thisFileOptions);
  });

  let printObject = function (filename, opts) {
    console.log(`--- ${filename} options ---`);
    each(opts, function (option, key) {
      console.log(key, ": ", option);
    });
    console.log();
  };

  process.stdout.write(`node version: `);
  child.execSync("node -v", {stdio:[0, 1]});
  process.stdout.write(`npm version: `);
  child.execSync("npm -v", {stdio:[0, 1]});
  process.stdout.write(`packages:\n`);
  child.execSync("npm list", {stdio:[0, 1]});

  each(allOptions, function (fileOptions, index) {
    if (index !== 0) {
      printObject(fileOptions.filename, fileOptions);
    } else {
      let header = `General ${process.cwd()}`;
      printObject(header, fileOptions);
    }
  });
  process.exit(0);
}
