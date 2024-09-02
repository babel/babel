// Must run at a git working dir

import { execSync } from "child_process";

const fixCommand = process.argv[2];

if (execSync("git status --porcelain=v1", { encoding: "utf8" })) {
  console.log(
    `Please re-run "${fixCommand}" and checkout the following changes to git`
  );
  execSync("git status", { stdio: "inherit" });

  if (process.env.GITHUB_ACTIONS) {
    console.log("::group::git diff");
    execSync("git diff", { stdio: "inherit" });
    console.log("::endgroup::");
  }

  process.exitCode = 1;
}
