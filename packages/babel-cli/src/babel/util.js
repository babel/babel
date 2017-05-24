const commander = require("commander");
const defaults  = require("lodash/defaults");
const readdir   = require("fs-readdir-recursive");
const index     = require("./index");
const babel     = require("babel-core");
const util      = require("babel-core").util;
const path      = require("path");
const fs        = require("fs");

export function chmod(src, dest) {
  fs.chmodSync(dest, fs.statSync(src).mode);
}

export function readdirFilter(filename) {
  return readdir(filename).filter(function (filename) {
    return util.canCompile(filename);
  });
}

export { readdir };

export const canCompile = util.canCompile;

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
  opts = defaults(opts || {}, index.opts);
  opts.filename = filename;

  const result = babel.transform(code, opts);
  result.filename = filename;
  result.actual = code;
  return result;
}

export function compile(filename, opts) {
  try {
    const code = fs.readFileSync(filename, "utf8");
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
