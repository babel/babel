// @flow

import fs from "fs";
import gensync from "gensync";

export const readFile = gensync<[string, "utf8"], string>({
  sync: fs.readFileSync,
  errback: fs.readFile,
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
