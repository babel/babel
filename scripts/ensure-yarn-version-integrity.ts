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

const match = packageManagerSpecRegex.exec(readPackageManagerSpec());
if (!match) {
  throw new Error(
    "Invalid packageManager format in package.json, expected 'yarn@<version>+sha512.<hash>'. Use 'corepack prepare yarn@<version>' to get the correct hash."
  );
}
const [, yarnVersion] = match;

cp.execSync(`corepack use yarn@${yarnVersion}`);

// Read the package manager spec again to get the expected hash, since corepack might have updated it
const match2 = packageManagerSpecRegex.exec(readPackageManagerSpec())!;
const [, , expectedHash] = match2;

const yarnPath = `./.yarn/releases/yarn-${yarnVersion}.cjs`;

const actualHash = createHash("sha512")
  .update(fs.readFileSync(yarnPath))
  .digest("hex");

if (actualHash !== expectedHash) {
  throw new Error(
    `Yarn version integrity check failed. Expected hash: ${expectedHash}, Actual hash: ${actualHash}`
  );
}
