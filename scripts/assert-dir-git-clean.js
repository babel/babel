// Must run at a git working dir

import { execSync } from "child_process";

if (execSync("git status --porcelain=v1", { encoding: "utf8" })) {
  console.log(
    'Please re-run "make build" and checkout the following changes to git'
  );
  execSync("git status", { stdio: "inherit" });
  // eslint-disable-next-line no-process-exit
  process.exit(1);
}
