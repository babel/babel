/* eslint-disable n/no-process-exit */

import { execSync } from "node:child_process";
import { createInterface as createRL } from "node:readline/promises";
import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join as joinPath } from "node:path";
import pLimit from "p-limit";

const packages = execSync("yarn workspaces list --no-private --json", {
  encoding: "utf-8",
})
  .split("\n")
  .filter(Boolean)
  .map(line => JSON.parse(line).name);

const results = await pLimit(10).map(packages, async name => {
  const response = await fetch(`https://registry.npmjs.org/${name}`);
  if (response.status === 200) {
    return { name, found: true };
  } else if (response.status === 404) {
    return { name, found: false };
  } else {
    throw new Error(
      `Failed to fetch package ${name}: ${response.status} ${response.statusText}`
    );
  }
});

const failures = results.filter(result => !result.found);

if (failures.length === 0) {
  console.log("All packages exist on npm :)");
  process.exit(0);
}

console.error("The following packages do not exist on npm:");
for (const failure of failures) {
  console.error(`- ${failure.name}`);
}

console.log(
  `A maintainer needs to create these missing packages, and set up OIDC publishing with the following settings:
  Publisher: GitHub Actions
  Organization or user: babel
  Repository: babel
  Workflow filename: release.yml
  Environment name: npm
They can also run locally the following command:
  node scripts/ensure-packages-exist.ts`
);

if (process.argv.includes("--check-only")) {
  process.exit(1);
}

const npmVersion = execSync("npm --version", { encoding: "utf-8" }).trim();
const [major, minor] = npmVersion.split(".").map(Number);
if (major < 11 || (major === 11 && minor < 15)) {
  console.error(
    `npm >= 11.15.0 is required to configure trusted publishing (found ${npmVersion}). Aborting.`
  );
  process.exit(1);
}

const rl = createRL({
  input: process.stdin,
  output: process.stdout,
});

await rl.question(
  "I can do that for you. Please make sure that you are logged in to the npm command line (run `npm whoami` in a separate terminal), then press Enter to continue.\n" +
    "When asked to authenticate on the npm website, you can check the option to skip two-factor authentication for the next 5 minutes to avoid being asked for every package."
);

let whoami;
try {
  whoami = execSync("npm whoami --json", {
    stdio: ["ignore", "pipe", "ignore"],
    encoding: "utf-8",
  });
} catch {
  console.error("You are not logged in to npm. Aborting.");
  process.exit(1);
}

const username = JSON.parse(whoami);
console.log(`Logged in as ${username}. Creating packages...`);

const tmpPrefix = joinPath(tmpdir(), "placeholder-package-");

for (const failure of failures) {
  console.log(`\n\nCreating package ${failure.name}...`);

  const tmpDir = await mkdtemp(tmpPrefix);
  await writeFile(
    joinPath(tmpDir, "package.json"),
    JSON.stringify({
      name: failure.name,
      version: "0.0.0",
      description: "Placeholder",
      license: "MIT",
    })
  );
  execSync(`npm publish --access public`, {
    stdio: "inherit",
    cwd: tmpDir,
  });

  console.log(`Setting up OIDC publishing for ${failure.name}...`);
  execSync(
    `npm trust github ${failure.name} --file release.yml --repository babel/babel --environment npm --allow-publish --yes`,
    { stdio: "inherit" }
  );

  // Avoid hitting the npm rate limits
  await new Promise(resolve => setTimeout(resolve, 2000));
}

console.log("\n\nAll done!");
rl.close();
