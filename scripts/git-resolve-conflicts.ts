import { execSync } from "node:child_process";
import { basename } from "node:path";

const conflicts = new Set(
  execSync("git diff --name-only --diff-filter=U", {
    encoding: "utf8",
  })
    .trim()
    .split("\n")
    .map(v => basename(v))
);

if (conflicts.has("yarn.lock")) {
  execSync(`git checkout --ours yarn.lock`, {
    stdio: "inherit",
  });
  execSync(`yarn dedupe`, {
    stdio: "inherit",
  });
  // It is impossible to completely remove duplicates in one go.
  execSync(`yarn dedupe`, {
    stdio: "inherit",
  });
  execSync(`git add yarn.lock`, {
    stdio: "inherit",
  });
}
if (conflicts.has("Makefile.mjs")) {
  execSync(`git checkout --ours Makefile.mjs`, {
    stdio: "inherit",
  });
  execSync(`node ./scripts/pack-script.js`, {
    stdio: "inherit",
  });
  execSync(`git add Makefile.mjs`, {
    stdio: "inherit",
  });
}
