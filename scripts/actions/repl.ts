import type { getOctokit, context as _context } from "@actions/github";

const COMMENT_PREFIX =
  "Build successful! You can test your changes in the REPL here: ";

/**
 * Updates the REPL comment on a pull request with the latest build link.
 * This function retrieves the CircleCI job ID for the current pull request,
 * constructs the REPL URL, and either updates an existing comment or creates a new one.
 */
export default async function (
  github: ReturnType<typeof getOctokit>,
  context: typeof _context
) {
  const { owner, repo } = context.repo;
  const pull_number = context.issue.number;

  let commentId;

  const comments = await github.rest.issues.listComments({
    owner: owner,
    repo: repo,
    issue_number: pull_number,
  });
  for (const comment of comments.data) {
    if (comment.body?.includes(COMMENT_PREFIX)) {
      commentId = comment.id;
      break;
    }
  }

  // Make sure Circleci is triggered.
  await sleep(60000);
  const circleciId = await getCircleciJobId(
    // @ts-expect-error the pull_request payload must be defined for pull requests events
    context.payload.pull_request.head.repo.fork
      ? "pull/" + pull_number
      : process.env.GITHUB_HEAD_REF
  );

  const commentBody = `${COMMENT_PREFIX}https://babeljs.io/repl/build/${circleciId}`;

  if (commentId) {
    await github.rest.issues.updateComment({
      owner: owner,
      repo: repo,
      comment_id: commentId,
      body: commentBody,
    });
  } else {
    await github.rest.issues.createComment({
      owner: owner,
      repo: repo,
      issue_number: pull_number,
      body: commentBody,
    });
  }
}

async function getCircleciJobId(branch: string) {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  let resp = (await (
    await fetch(
      "https://circleci.com/api/v2/project/github/babel/babel/pipeline?branch=" +
        branch,
      {
        method: "GET",
      }
    )
  ).json()) as any;
  const pipeline = resp.items[0].id;

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  resp = (await (
    await fetch(`https://circleci.com/api/v2/pipeline/${pipeline}/workflow`, {
      method: "GET",
    })
  ).json()) as any;
  const workflow = resp.items[0].id;

  // Wait up to 10 minutes
  for (let i = 0; i < 60; i++) {
    resp = await (
      await fetch(`https://circleci.com/api/v2/workflow/${workflow}/job`, {
        method: "GET",
      })
    ).json();
    const { status, job_number } = resp.items[0];
    if (status === "success") {
      return job_number;
    } else if (status !== "running") {
      break;
    }
    await sleep(10000);
  }
  throw new Error("CircleCI job failed");
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
