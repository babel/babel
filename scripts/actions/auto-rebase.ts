import type { getOctokit, context } from "@actions/github";
import { execSync, spawnSync } from "node:child_process";

export default async function (
  github: ReturnType<typeof getOctokit>,
  ctx: typeof context,
  pull_number: number
) {
  const { data: pullRequest } = await github.rest.pulls.get({
    owner: ctx.repo.owner,
    repo: ctx.repo.repo,
    pull_number,
  });

  const headBranch = pullRequest.head.ref;
  const headRepo = pullRequest.head.repo!.full_name;
  const baseBranch = pullRequest.base.ref;
  const baseRepo = pullRequest.base.repo.full_name;

  console.log(
    `Rebasing branch ${headRepo}:${headBranch} onto ${baseRepo}:${baseBranch}...`
  );

  const result = spawnSync(
    "git",
    ["pull", "--rebase", `https://github.com/${baseRepo}.git`, baseBranch],
    { stdio: "inherit" }
  );

  if (result.status === 0) {
    console.log("Rebase completed successfully without conflicts.");
    return;
  }

  while (true) {
    execSync("node ./scripts/git-resolve-conflicts.ts", { stdio: "inherit" });

    const hash = execSync("git rev-parse REBASE_HEAD", {
      encoding: "utf8",
    }).trim();
    const result = spawnSync("git", ["rebase", "--continue"], {
      encoding: "utf8",
      stdio: "inherit",
      env: { ...process.env, GIT_EDITOR: "true" },
    });
    if (result.status === 0) {
      break;
    }
    if (
      hash ===
      execSync("git rev-parse REBASE_HEAD", { encoding: "utf8" }).trim()
    ) {
      console.error("Rebase could not be continued automatically.");
      // eslint-disable-next-line n/no-process-exit
      process.exit(1);
    }
  }
  console.log("Rebase completed successfully.");
}
