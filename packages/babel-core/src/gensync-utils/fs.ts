import fs from "fs";
import gensync from "gensync";

export const readFile = gensync<(filepath: string, encoding: "utf8") => string>(
  {
    sync: fs.readFileSync,
    errback: fs.readFile,
  },
);

export const stat = gensync<typeof fs.statSync>({
  sync: fs.statSync,
  errback: fs.stat,
});
