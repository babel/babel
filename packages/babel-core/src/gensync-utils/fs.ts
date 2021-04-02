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
    return fs.existsSync(path);
  },
});

export const stat = gensync<typeof fs.statSync>({
  sync: fs.statSync,
  errback: fs.stat,
});
