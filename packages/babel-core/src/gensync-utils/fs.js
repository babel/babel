// @flow

import fs from "fs";
import gensync from "gensync";
import mkdir from "mkdirp";

export const readFile = gensync<[string, "utf8"], string>({
  sync: fs.readFileSync,
  errback: fs.readFile,
});

export const writeFile = gensync<[string, string], void>({
  sync: fs.writeFileSync,
  errback: fs.writeFile,
});

export const mkdirp = gensync<[string], void>({
  sync: (path: string) => mkdir.sync(path),
  async: (path: string) => mkdir(path),
});

export const exists = gensync<[string], boolean>({
  sync(path) {
    try {
      fs.accessSync(path);
      return true;
    } catch {
      return false;
    }
  },
  errback: (path, cb) => fs.access(path, undefined, err => cb(null, !err)),
});
