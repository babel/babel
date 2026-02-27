import { globSync, readFileSync } from "node:fs";
import { dirname } from "node:path";
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

for (const path of paths) {
  const data = JSON.parse(readFileSync(path, "utf-8"));
  if (data.private || exclude.has(dirname(path))) continue;
  const result = await publint({
    pkgDir: dirname(path),
    pack: "yarn",
  });
  for (const message of result.messages) {
    if (message.type === "suggestion") continue;
    if (message.type === "error") {
      process.exitCode = 1;
      console.error(
        message.type,
        dirname(path),
        formatMessage(message, result.pkg)
      );
    } else {
      console.log(
        message.type,
        dirname(path),
        formatMessage(message, result.pkg)
      );
    }
  }
}
