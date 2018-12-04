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
  return readdirRecursive(dirname, (filename, _index, currentDirectory) => {
    const stat = fs.statSync(path.join(currentDirectory, filename));

    if (stat.isDirectory()) return true;

    return (
      (includeDotfiles || filename[0] !== ".") && (!filter || filter(filename))
    );
  });
}

export function readdirForCompilable(
  dirname: string,
  includeDotfiles: boolean,
  altExts?: Array<string>,
) {
  return readdir(dirname, includeDotfiles, function(filename) {
    return isCompilableExtension(filename, altExts);
  });
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

const CALLER = {
  name: "@babel/cli",
};

export function transform(filename, code, opts) {
  opts = {
    ...opts,
    caller: CALLER,
    filename,
  };

  return new Promise((resolve, reject) => {
    babel.transform(code, opts, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

export function compile(filename, opts) {
  opts = {
    ...opts,
    caller: CALLER,
  };

  return new Promise((resolve, reject) => {
    babel.transformFile(filename, opts, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
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

export function deleteFile(path) {
  if (fs.existsSync(path)) {
    fs.unlink(path, err => {
      if (err) throw err;
    });
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
