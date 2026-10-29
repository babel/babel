import type { getOctokit, context as _context } from "@actions/github";
import { readFileSync } from "node:fs";
import path from "node:path";
import { createOrUpdateComment } from "./_comment.ts";

const COMMENT_MARKER = "<!-- babel-test262-results -->";
const MAX_LISTED_TESTS = 100;

const TEST_LINE_RE =
  /^(not )?ok \d+ (test\/[\w$+./-]+) ([\w ]+) # \(([\w ,]+)\)$/;
const OUT_OF_SYNC_DIAG =
  "# main branch and PR artifacts are out of sync. Consider rebasing the PR.";

interface TestResult {
  file: string;
  scenario: string;
  message: string;
}

/**
 * Creates or updates a comment on a pull request listing the test262 tests
 * whose result changed compared to the main branch. `dataDir` contains the
 * artifact uploaded by the "test262 - Analyze results" CI job.
 */
export default async function (
  github: ReturnType<typeof getOctokit>,
  context: typeof _context,
  dataDir: string // untrusted
) {
  const { owner, repo } = context.repo;
  const read = (name: string) =>
    readFileSync(path.join(dataDir, name), "utf8").trim();

  const prNumber = read("pr-number");
  if (!/^\d+$/.test(prNumber)) {
    throw new Error(`Invalid PR number: ${JSON.stringify(prNumber)}`);
  }
  const test262Commit = read("test262-commit");
  if (!/^[0-9a-f]{40}$/.test(test262Commit)) {
    throw new Error(`Invalid test262 commit: ${JSON.stringify(test262Commit)}`);
  }
  const issue_number = Number(prNumber);

  // Make sure that the artifact belongs to the PR it claims to belong to, and
  // that the PR has not been updated in the meantime.
  const run = context.payload.workflow_run;
  const { data: pr } = await github.rest.pulls.get({
    owner,
    repo,
    pull_number: issue_number,
  });
  if (pr.head.sha !== run.head_sha) {
    console.log(
      `Skipping: PR #${issue_number} head is ${pr.head.sha}, but the CI run is for ${run.head_sha}.`
    );
    return;
  }

  const diff = read("diff.tap");
  const newFailures: TestResult[] = [];
  const newSuccesses: TestResult[] = [];
  for (const line of diff.split("\n")) {
    const match = TEST_LINE_RE.exec(line);
    if (!match) continue;
    const [, notOk, file, scenario, message] = match;
    (notOk ? newFailures : newSuccesses).push({ file, scenario, message });
  }

  const test262Link = `[tc39/test262@${test262Commit.slice(0, 7)}](https://github.com/tc39/test262/tree/${test262Commit})`;
  const hasChanges = newFailures.length > 0 || newSuccesses.length > 0;
  let body = `${COMMENT_MARKER}\n### test262 results\n\n`;

  if (hasChanges) {
    body += `As of ${run.head_sha}, this PR causes **${plural(newFailures.length, "new failure")}** and **${plural(newSuccesses.length, "new success", "new successes")}** compared to \`main\` (${test262Link}).\n`;
    if (diff.includes(OUT_OF_SYNC_DIAG)) {
      body += `\n> [!NOTE]\n> The \`main\` and PR results are out of sync, consider rebasing the PR.\n`;
    }
    body += formatList("New failures", newFailures, test262Commit, run, true);
    body += formatList("New successes", newSuccesses, test262Commit, run);
  } else {
    body += `As of ${run.head_sha}, this PR does not change any test262 results compared to \`main\` (${test262Link}).\n`;
  }

  await createOrUpdateComment(github, {
    owner,
    repo,
    issue_number,
    marker: COMMENT_MARKER,
    body,
    // Only update an existing comment if there are no changes, to avoid noise
    // on PRs that don't affect test262 results.
    create: hasChanges,
  });
}

function formatList(
  title: string,
  tests: TestResult[],
  test262Commit: string,
  run: { html_url: string },
  failures = false
) {
  if (tests.length === 0) return "";

  let list = `\n<details${failures ? " open" : ""}>\n<summary>${title} (${tests.length})</summary>\n\n`;
  for (const { file, scenario, message } of tests.slice(0, MAX_LISTED_TESTS)) {
    const url = `https://github.com/tc39/test262/blob/${test262Commit}/${file}`;
    list += `- [\`${file}\`](${url}) (${scenario})${failures ? `: ${message}` : ""}\n`;
  }
  if (tests.length > MAX_LISTED_TESTS) {
    list += `- …and ${tests.length - MAX_LISTED_TESTS} more, see the \`test262-result\` artifact of the [CI run](${run.html_url}).\n`;
  }
  list += `\n</details>\n`;
  return list;
}

function plural(count: number, singular: string, plural = singular + "s") {
  return `${count} ${count === 1 ? singular : plural}`;
}
