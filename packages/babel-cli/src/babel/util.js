import commander from "commander";
import readdir from "fs-readdir-recursive";
import * as babel from "babel-core";
import path from "path";
import fs from "fs";

export function chmod(src, dest) {
  fs.chmodSync(dest, fs.statSync(src).mode);
}

export function readdirFilter(filename) {
  return readdir(filename).filter(function (filename) {
    return babel.util.canCompile(filename);
  });
}

export { readdir };

export const canCompile = babel.util.canCompile;

export function shouldIgnore(loc, opts) {
  return babel.util.shouldIgnore(loc, opts.ignore, opts.only);
}

export function addSourceMappingUrl(code, loc) {
  return code + "\n//# sourceMappingURL=" + path.basename(loc);
}

export function log(msg) {
  if (!commander.quiet) console.log(msg);
}

export function transform(filename, code, opts) {
  opts = Object.assign({}, opts, {
    filename,
  });

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
