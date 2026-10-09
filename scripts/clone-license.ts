import { readFileSync, writeFileSync } from "node:fs";
import shell from "shelljs";
import path from "node:path";

console.log("Cloning LICENSE to babel packages");

const LICENSE = readFileSync("LICENSE", "utf8");

console.log(LICENSE);

shell.ls("-d", "./packages/*/").forEach(dir => {
  if (
    !/.*packages\/babel-(?:helpers|parser|plugin-transform-regenerator)\/?$/.exec(
      dir
    )
  ) {
    writeFileSync(path.join(dir, "LICENSE"), LICENSE);
  }
});

shell.ls("-d", "./eslint/*/").forEach(dir => {
  if (!/.*eslint\/babel-eslint-plugin\/?$/.exec(dir)) {
    writeFileSync(path.join(dir, "LICENSE"), LICENSE);
  }
});
