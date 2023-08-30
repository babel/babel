/* eslint-disable no-process-exit */

import { execSync } from "child_process";
import path from "path";
import { mkdirSync, copyFileSync } from "fs";

const exec = (command, options) => {
  const result = execSync(command, { encoding: "utf8", ...options });
  console.log(result);
  return result;
};

const snapshotDir = "./babel8_snapshots";

if (!exec("git status --porcelain=v1", { encoding: "utf8" })) {
  process.exit(0);
}

exec("git add .");
exec("git stash save");

const result = exec(`git --no-pager diff --name-only "stash@{0}" HEAD`, {
  encoding: "utf8",
});

if (!result) {
  process.exit(0);
}

const files = result.split("\n");

files.forEach(file => {
  if (!file) return;
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
exec("git stash save");

exec(`git switch -c ${process.env.branch}`);
exec(`git reset --hard ${process.env.hash}`);

exec("git stash pop");

exec(`git config user.name "Babel Bot"`);

exec(`git --no-pager status`);

exec(`git commit -m "Update source snapshots" --no-verify --quiet`);
exec(
  `git push "https://babel-bot:${process.env.token}@github.com/${process.env.repo}.git" ${process.env.branch}`
);
