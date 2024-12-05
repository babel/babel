import readdirRecursive from "fs-readdir-recursive";
import * as babel from "@babel/core";
import path from "path";
import fs from "fs";

import * as watcher from "./watcher.ts";

import type { FileResult, InputOptions } from "@babel/core";

export function chmod(src: string, dest: string): void {
  try {
    fs.chmodSync(dest, fs.statSync(src).mode);
  } catch (_) {
    console.warn(`Cannot change permissions of ${dest}`);
  }
}

export function alphasort(a: string, b: string) {
  return a.localeCompare(b, "en");
}

type ReaddirFilter = (filename: string) => boolean;

export function readdir(
  dirname: string,
  includeDotfiles: boolean,
  filter?: ReaddirFilter,
): Array<string> {
  if (process.env.BABEL_8_BREAKING) {
    return (
      fs
        .readdirSync(dirname, { recursive: true, withFileTypes: true })
        .filter(dirent => {
          // exclude directory entries from readdir results
          if (dirent.isDirectory()) return false;
          const filename = dirent.name;
          return (
            (includeDotfiles || filename[0] !== ".") &&
            (!filter || filter(filename))
          );
        })
        .map(dirent => path.join(dirent.parentPath, dirent.name))
        // readdirSyncRecursive conducts BFS, sort the entries so we can match the DFS behaviour of fs-readdir-recursive
        // https://github.com/nodejs/node/blob/d6b12f5b77e35c58a611d614cf0aac674ec2c3ed/lib/fs.js#L1421
        .sort(alphasort)
    );
  } else {
    return readdirRecursive(
      "",
      (filename, index, currentDirectory) => {
        const stat = fs.statSync(path.join(currentDirectory, filename));

        // ensure we recurse into .* folders
        if (stat.isDirectory()) return true;

        return (
          (includeDotfiles || filename[0] !== ".") &&
          (!filter || filter(filename))
        );
      },
      // @ts-expect-error improve @types/fs-readdir-recursive typings
      [],
      dirname,
    );
  }
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

export function hasDataSourcemap(code: string): boolean {
  const pos = code.lastIndexOf("\n", code.length - 2);
  return pos !== -1 && code.lastIndexOf("//# sourceMappingURL") < pos;
}

const CALLER = {
  name: "@babel/cli",
};

export function transformRepl(filename: string, code: string, opts: any) {
  opts = {
    ...opts,
    caller: CALLER,
    filename,
  };

  return new Promise<FileResult>((resolve, reject) => {
    babel.transform(code, opts, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

export async function compile(filename: string, opts: InputOptions) {
  opts = {
    ...opts,
    caller: CALLER,
  };

  const result = process.env.BABEL_8_BREAKING
    ? await babel.transformFileAsync(filename, opts)
    : await new Promise<FileResult>((resolve, reject) => {
        babel.transformFile(filename, opts, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });

  if (result) {
    if (!process.env.BABEL_8_BREAKING) {
      if (!result.externalDependencies) return result;
    }
    watcher.updateExternalDependencies(filename, result.externalDependencies);
  }

  return result;
}

export function deleteDir(path: string): void {
  fs.rmSync(path, { force: true, recursive: true });
}

process.on("uncaughtException", function (err) {
  console.error(err);
  process.exitCode = 1;
});

export function withExtension(filename: string, ext: string = ".js") {
  const newBasename = path.basename(filename, path.extname(filename)) + ext;
  return path.join(path.dirname(filename), newBasename);
}

export function debounce(fn: () => void, time: number) {
  let timer: NodeJS.Timeout;
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
