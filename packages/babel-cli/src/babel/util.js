import commander from "commander";
import readdirRecursive from "fs-readdir-recursive";
import * as babel from "@babel/core";
import includes from "lodash/includes";
import path from "path";
import fs from "fs";

export function chmod(src, dest) {
  fs.chmodSync(dest, fs.statSync(src).mode);
}

type ReaddirFilter = (filename: string) => boolean;

export function readdir(
  dirname: string,
  includeDotfiles: boolean,
  filter: ReaddirFilter,
) {
  return readdirRecursive(
    dirname,
    filename =>
      (includeDotfiles || filename[0] !== ".") && (!filter || filter(filename)),
  );
}

export function readdirForCompilable(
  dirname: string,
  includeDotfiles: boolean,
) {
  return readdir(dirname, includeDotfiles, isCompilableExtension);
}

/**
 * Test if a filename ends with a compilable extension.
 */
export function isCompilableExtension(
  filename: string,
  altExts?: Array<string>,
): boolean {
  const exts = altExts || babel.DEFAULT_EXTENSIONS;
  const ext = path.extname(filename);
  return includes(exts, ext);
}

export function addSourceMappingUrl(code, loc) {
  return code + "\n//# sourceMappingURL=" + path.basename(loc);
}

export function log(msg, force) {
  if (force === true || commander.verbose) console.log(msg);
}

export function transform(filename, code, opts, callback) {
  opts = Object.assign({}, opts, {
    filename,
  });

  babel.transform(code, opts, callback);
}

export function compile(filename, opts, callback) {
  babel.transformFile(filename, opts, function(err, res) {
    if (err) {
      if (commander.watch) {
        console.error(err);
        return callback(null, null);
      } else {
        return callback(err);
      }
    }
    return callback(null, res);
  });
}

export function deleteDir(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file) {
      const curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteDir(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

process.on("uncaughtException", function(err) {
  console.error(err);
  process.exit(1);
});

export function requireChokidar() {
  try {
    return require("chokidar");
  } catch (err) {
    console.error(
      "The optional dependency chokidar failed to install and is required for " +
        "--watch. Chokidar is likely not supported on your platform.",
    );
    throw err;
  }
}

export function adjustRelative(relative, keepFileExtension) {
  if (keepFileExtension) {
    return relative;
  }
  return relative.replace(/\.(\w*?)$/, "") + ".js";
}
