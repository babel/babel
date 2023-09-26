/* eslint-disable no-process-exit */

import { execSync } from "child_process";
import path from "path";
import { mkdirSync, copyFileSync } from "fs";

const exec = (command, options) => {
  const result = execSync(command, { encoding: "utf8", ...options });
  return result;
};

const snapshotDir = "./babel8_snapshots";
const isCI = !!process.env.CI;

if (!exec("git status --porcelain=v1", { encoding: "utf8" })) {
  process.exit(0);
}

exec("git add .");

const result = exec(`git --no-pager diff --name-only HEAD`, {
  encoding: "utf8",
});

if (!result) {
  process.exit(0);
}

const files = result.split("\n");

files.forEach(file => {
  if (!file || !file.startsWith("packages")) return;

  const dst = path.join(snapshotDir, file);
  try {
    mkdirSync(path.dirname(dst), { recursive: true });
  } catch {}
  copyFileSync(file, dst);
});

if (!exec("git status --porcelain=v1", { encoding: "utf8" })) {
  process.exit(0);
}

exec("git reset .");
exec(`git add ${snapshotDir}`);
exec("git restore .");

if (!isCI) {
  process.exit(0);
}

if (exec("git status --porcelain=v1", { encoding: "utf8" })) {
  console.error("Snapshots are out of date");
  console.error("Please run `make update-source-snapshots`");
  process.exit(1);
}
