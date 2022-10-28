// Must run at a git working dir

import { execSync } from "child_process";

const fixCommand = `make ${process.argv[2]}`;

if (execSync("git status --porcelain=v1", { encoding: "utf8" })) {
  console.log(
    `Please re-run "${fixCommand}" and checkout the following changes to git`
  );
  execSync("git status", { stdio: "inherit" });
  // eslint-disable-next-line no-process-exit
  process.exit(1);
}
