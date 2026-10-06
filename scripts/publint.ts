import { globSync, readFileSync } from "node:fs";
import { availableParallelism } from "node:os";
import { dirname } from "node:path";
import pLimit from "p-limit";
import { publint } from "publint";
import { formatMessage } from "publint/utils";

const paths = globSync("{packages,eslint,codemods}/*/package.json");

const exclude = new Set([
  // CLIs
  "packages/babel-cli",
  "packages/babel-build-external-helpers",
  "packages/babel-node",
  // This will be just JSON
  "packages/babel-compat-data",
  "packages/babel-helper-globals",
  // Not meant to be consumed manually
  "packages/babel-runtime",
  "packages/babel-runtime-corejs3",
  // TODO: Add type definitions
  "packages/babel-register",
]);

const pkgDirs = paths
  .filter(path => {
    const data = JSON.parse(readFileSync(path, "utf-8"));
    return !data.private && !exclude.has(dirname(path));
  })
  .map(dirname);

const results = await pLimit(availableParallelism()).map(pkgDirs, pkgDir =>
  publint({ pkgDir, pack: "yarn" })
);

for (const [i, result] of results.entries()) {
  const pkgDir = pkgDirs[i];
  for (const message of result.messages) {
    if (message.type === "suggestion") continue;
    if (message.type === "error") {
      process.exitCode = 1;
      console.error(message.type, pkgDir, formatMessage(message, result.pkg));
    } else {
      console.log(message.type, pkgDir, formatMessage(message, result.pkg));
    }
  }
}
