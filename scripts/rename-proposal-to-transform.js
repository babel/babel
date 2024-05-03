#!/usr/bin/env node

import path from "node:path";
import fs from "node:fs";
import { Glob } from "glob";
import { execSync } from "node:child_process";

const oldName = process.argv[2].match(/proposal-[\w-]+/)[0];
const newName = process.argv[3] || oldName.replace("proposal-", "transform-");

const oldPackageFolder = path.resolve(process.cwd(), process.argv[2]);
const oldPackageJSONPath = path.join(oldPackageFolder, "package.json");

console.info("Updating package.json...");
{
  const pkgJSON = (await import(oldPackageJSONPath, { with: { type: "json" } }))
    .default;
  pkgJSON.name = pkgJSON.name.replace(oldName, newName);
  pkgJSON.description = pkgJSON.description.replace(
    /the ([a-z-]+?)s? proposal/gi,
    "$1s"
  );
  pkgJSON.repository.directory = pkgJSON.repository.directory.replace(
    oldName,
    newName
  );
  pkgJSON.homepage = pkgJSON.homepage?.replace(oldName, newName);
  fs.writeFileSync(oldPackageJSONPath, JSON.stringify(pkgJSON, null, 2) + "\n");
}

console.info("Updating the plugin name...");
pluginName: {
  const indexPath = path.join(oldPackageFolder, "src", "index.ts");

  let indexContents;
  try {
    indexContents = fs.readFileSync(indexPath, "utf8");
  } catch (error) {
    console.warn("Could not find src/index.ts, skipping...");
    break pluginName;
  }

  const newContents = indexContents.replace(
    new RegExp(`(?<=name:\\s*")${oldName}`),
    newName
  );
  if (newContents === indexContents) {
    console.warn("Could not find name in src/index.ts, skipping...");
    break pluginName;
  }

  fs.writeFileSync(indexPath, newContents);
}

console.info("Updating the README...");
readme: {
  const readmePath = path.join(oldPackageFolder, "README.md");

  let indexContents;
  try {
    indexContents = fs.readFileSync(readmePath, "utf8");
  } catch (error) {
    console.warn("Could not find README.md, skipping...");
    break readme;
  }

  const newContents = indexContents.replaceAll(oldName, newName);
  if (newContents === indexContents) {
    console.warn("Could not find name in README.md, skipping...");
    break readme;
  }

  fs.writeFileSync(readmePath, newContents);
}

console.info("Renaming the folder...");
{
  const newPackageFolder = oldPackageFolder.replace(oldName, newName);
  if (fs.existsSync(newPackageFolder)) {
    fs.rmSync(newPackageFolder, { recursive: true });
  }
  fs.renameSync(oldPackageFolder, newPackageFolder);
}

console.info("Renaming all usages in tests...");
await globRename(
  "./{packages,eslint,codemods}/*/test/fixtures/**/options.json"
);

console.info("Renaming all usages in package.json files...");
await globRename("./{packages,eslint,codemods}/*/package.json");

console.info("Renaming other well-known usages...");
await globRename([
  "packages/babel-core/src/parser/util/missing-plugin-helper.ts",
  "packages/babel-preset-env/src/available-plugins.ts",
  "packages/babel-standalone/scripts/pluginConfig.json",
]);

async function globRename(pattern) {
  for await (const filename of new Glob(pattern, {})) {
    const oldContents = fs.readFileSync(filename, "utf8");
    const newContents = oldContents.replaceAll(oldName, newName);
    if (oldContents !== newContents) {
      fs.writeFileSync(filename, newContents);
    }
  }
}

if (!process.env.SKIP_BOOTSTRAP) {
  console.info("Running `make bootstrap`...");
  execSync("make bootstrap", { stdio: "inherit" });
}
