import readdirRecursive from "fs-readdir-recursive";
import * as babel from "@babel/core";
import path from "path";
import fs from "fs";
import { createRequire } from "module";

export function chmod(src: string, dest: string): void {
  try {
    fs.chmodSync(dest, fs.statSync(src).mode);
  } catch (err) {
    console.warn(`Cannot change permissions of ${dest}`);
  }
}

type ReaddirFilter = (filename: string) => boolean;

export function readdir(
  dirname: string,
  includeDotfiles: boolean,
  filter?: ReaddirFilter,
): Array<string> {
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
): Array<string> {
  return readdir(dirname, includeDotfiles, function (filename) {
    return isCompilableExtension(filename, altExts);
  });
}

/**
 * Test if a filename ends with a compilable extension.
 */
export function isCompilableExtension(
  filename: string,
  altExts?: readonly string[],
): boolean {
  const exts = altExts || babel.DEFAULT_EXTENSIONS;
  const ext = path.extname(filename);
  return exts.includes(ext);
}

export function addSourceMappingUrl(code: string, loc: string): string {
  return code + "\n//# sourceMappingURL=" + path.basename(loc);
}

const CALLER = {
  name: "@babel/cli",
};

export function transform(
  filename: string,
  code: string,
  opts: any,
): Promise<any> {
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

export function compile(filename: string, opts: any | Function): Promise<any> {
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

export function deleteDir(path: string): void {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file) {
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

process.on("uncaughtException", function (err) {
  console.error(err);
  process.exitCode = 1;
});

export function requireChokidar(): any {
  // $FlowIgnore - https://github.com/facebook/flow/issues/6913#issuecomment-662787504
  const require = createRequire(import /*::("")*/.meta.url);

  try {
    // todo(babel 8): revert `@nicolo-ribaudo/chokidar-2` hack
    return parseInt(process.versions.node) >= 8
      ? require("chokidar")
      : require("@nicolo-ribaudo/chokidar-2");
  } catch (err) {
    console.error(
      "The optional dependency chokidar failed to install and is required for " +
        "--watch. Chokidar is likely not supported on your platform.",
    );
    throw err;
  }
}

export function withExtension(filename: string, ext: string = ".js") {
  const newBasename = path.basename(filename, path.extname(filename)) + ext;
  return path.join(path.dirname(filename), newBasename);
}

export function debounce(fn: () => void, time: number) {
  let timer;
  function debounced() {
    clearTimeout(timer);
    timer = setTimeout(fn, time);
  }
  debounced.flush = () => {
    clearTimeout(timer);
    fn();
  };
  return debounced;
}
