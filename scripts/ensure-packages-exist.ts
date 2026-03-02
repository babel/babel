/* eslint-disable n/no-process-exit */

import { execSync } from "node:child_process";
import { createInterface as createRL } from "node:readline/promises";
import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join as joinPath } from "node:path";
import pLimit from "p-limit";
import open from "open";

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

const rl = createRL({
  input: process.stdin,
  output: process.stdout,
});

await rl.question(
  "I can do that for you. Please make sure that you are logged in to the npm command line (run `npm whoami` in a separate terminal), then press Enter to continue."
);

let whoami;
try {
  whoami = execSync("npm whoami --json", {
    stdio: "ignore",
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

  const settingsURL = `https://www.npmjs.com/package/${failure.name}/access`;

  console.log(`Please go to set up OIDC publishing at:\n${settingsURL}`);
  await rl.question("Press ENTER to open in the browser...");
  await open(settingsURL);
  await new Promise(resolve => setTimeout(resolve, 1000));
  await rl.question("Press ENTER when you are done.");
}

console.log("\n\nAll done!");
rl.close();
