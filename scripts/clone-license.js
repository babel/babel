import { readFileSync, writeFileSync } from "fs";
import shell from "shelljs";
import path from "path";

console.log("Cloning LICENSE to babel packages");

const LICENSE = readFileSync("LICENSE", "utf8");

console.log(LICENSE);

shell.ls("-d", "./packages/*/").forEach(dir => {
  if (
    !dir.match(
      /.*packages\/(babel-parser|babel-plugin-transform-object-assign)\/?$/
    )
  ) {
    writeFileSync(path.join(dir, "LICENSE"), LICENSE);
  }
});

shell.ls("-d", "./eslint/*/").forEach(dir => {
  if (!dir.match(/.*eslint\/(babel-eslint-plugin)\/?$/)) {
    writeFileSync(path.join(dir, "LICENSE"), LICENSE);
  }
});
