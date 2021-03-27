import fs from "fs";
import gensync from "gensync";

export const readFile = gensync<(filepath: string, encoding: "utf8") => string>(
  {
    sync: fs.readFileSync,
    errback: fs.readFile,
  },
);

export const exists = gensync<(filepath: string) => boolean>({
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

export const stat = gensync<typeof fs.statSync>({
  sync: fs.statSync,
  errback: fs.stat,
});
