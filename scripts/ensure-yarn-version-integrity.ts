import { createHash } from "node:crypto";
import fs from "node:fs";
import cp from "node:child_process";

function readPackageManagerSpec() {
  const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf-8"));
  if (!packageJson.packageManager) {
    throw new Error("packageManager field is missing in package.json");
  }
  return packageJson.packageManager;
}

const packageManagerSpecRegex = /^yarn@(\d+\.\d+\.\d+)\+sha512\.([a-f0-9]+)$/;
const yarnPathRegex = /^yarnPath:\s*(\S+)/m;

const match = packageManagerSpecRegex.exec(readPackageManagerSpec());
if (!match) {
  throw new Error(
    "Invalid packageManager format in package.json, expected 'yarn@<version>+sha512.<hash>'. Use 'corepack use yarn@<version>' to get the correct hash."
  );
}
const [, yarnVersion] = match;

cp.execSync(`corepack use yarn@${yarnVersion}`);

// Read the package manager spec again to get the expected hash, since corepack might have updated it
const updatedPackageManagerSpec = readPackageManagerSpec();
const match2 = packageManagerSpecRegex.exec(updatedPackageManagerSpec);
if (!match2) {
  throw new Error(
    `Invalid packageManager format in package.json after corepack update, expected 'yarn@<version>+sha512.<hash>', got '${updatedPackageManagerSpec}'.`
  );
}
const [, , expectedHash] = match2;

const yarnPath = yarnPathRegex.exec(
  fs.readFileSync(".yarnrc.yml", "utf-8")
)?.[1];

if (!yarnPath) {
  throw new Error("yarnPath is missing in .yarnrc.yml");
}

const actualHash = createHash("sha512")
  .update(fs.readFileSync(yarnPath))
  .digest("hex");

if (actualHash !== expectedHash) {
  throw new Error(
    `Yarn version integrity check failed. Expected hash: ${expectedHash}, Actual hash: ${actualHash}`
  );
}
