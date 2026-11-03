// @ts-check

const COMMENT_PREFIX =
  "Build successful! You can test your changes in the REPL here: ";

/**
 * Updates the REPL comment on a pull request with the latest build link.
 * This function retrieves the CircleCI job ID for the current pull request,
 * constructs the REPL URL, and either updates an existing comment or creates a new one.
 * @param {ReturnType<import("@actions/github").getOctokit>} github
 * @param {import("@actions/github").context} context
 */
export default async function (github, context) {
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

  const circleciId = await getCircleciJobId(
    // @ts-expect-error the pull_request payload must be defined for pull requests events
    context.payload.pull_request.head.repo.fork
      ? "pull/" + pull_number
      : /** @type {string} */ (process.env.GITHUB_HEAD_REF),
    // @ts-expect-error the pull_request payload must be defined for pull requests events
    context.payload.pull_request.head.sha
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

/**
 * @typedef {{ id: string, created_at: string, vcs: { revision: string } }} Pipeline
 * @typedef {{ id: string, attributes: { name: string, created_at: string, phase: string, outcome?: string | null } }} Workflow
 * @typedef {{ id: string, attributes: { name: string, type: string, phase: string, outcome?: string | null, number: number } }} Job
 */

/**
 * @param {string} branch
 * @param {string} headSha
 */
export async function getCircleciJobId(branch, headSha) {
  // Stop starting new requests after ten minutes.
  const deadline = Date.now() + 10 * 60 * 1000;
  while (true) {
    /** @type {Pipeline | undefined} */
    let pipeline;
    const pipelinesUrl = new URL(
      "https://circleci.com/api/v2/project/github/babel/babel/pipeline?" +
        new URLSearchParams({ branch }).toString()
    );
    while (true) {
      const body = await request(pipelinesUrl, deadline);
      /** @type {Pipeline[]} */
      const pipelines = body.items;
      pipeline = latest(
        pipelines.filter(item => item.vcs.revision === headSha),
        item => item.created_at
      );
      // Pipelines are returned newest-first; later pages cannot have a newer match.
      if (pipeline || !body.next_page_token) break;
      pipelinesUrl.searchParams.set("page-token", body.next_page_token);
    }

    if (pipeline) {
      // The v2 pipeline ID is a v3 run ID, not a v3 pipeline definition ID.
      /** @type {Workflow[]} */
      const workflows = [];
      const workflowsUrl = new URL(
        "https://circleci.com/api/v3/workflows?" +
          new URLSearchParams({
            "filter[run_id]": pipeline.id,
            order_by: "created desc",
            "page[limit]": "20",
          }).toString()
      );
      while (true) {
        const body = await request(workflowsUrl, deadline);
        workflows.push(...body.data);
        if (!body.page?.next) break;
        workflowsUrl.searchParams.set("page[cursor]", body.page.next);
      }
      const workflow = latest(
        workflows.filter(item => item.attributes.name === "build-standalone"),
        item => item.attributes.created_at
      );

      if (workflow) {
        checkCompletion(workflow.attributes, `workflow ${workflow.id}`);
        const body = await request(
          new URL(
            "https://circleci.com/api/v3/jobs?" +
              new URLSearchParams({
                "filter[workflow_id]": workflow.id,
              }).toString()
          ),
          deadline
        );
        /** @type {Job[]} */
        const jobs = body.data;
        const matches = jobs.filter(
          item =>
            item.attributes.name === "build-standalone" &&
            item.attributes.type === "build"
        );
        if (matches.length > 1) {
          throw new Error(
            `Ambiguous CircleCI build-standalone jobs in workflow ${workflow.id}`
          );
        }
        const job = matches[0];
        if (job && checkCompletion(job.attributes, `job ${job.id}`)) {
          return job.attributes.number;
        }
      }
    }
    // Re-select both the run and the workflow so a rerun supersedes an old job.
    await wait(10000);
  }
}

/**
 * @param {Workflow["attributes"] | Job["attributes"]} attributes
 * @param {string} name
 */
function checkCompletion({ phase, outcome }, name) {
  if (phase !== "ended") return false;
  if (outcome !== "succeeded") {
    throw new Error(`CircleCI ${name} ended: ${outcome}`);
  }
  return true;
}

/**
 * @template T
 * @param {T[]} items
 * @param {(item: T) => string} createdAt
 * @returns {T | undefined}
 */
function latest(items, createdAt) {
  items.sort((a, b) => Date.parse(createdAt(b)) - Date.parse(createdAt(a)));
  return items[0];
}

/** @param {number} ms */
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * @param {URL} url
 * @param {number} deadline
 * @returns {Promise<any>}
 */
async function request(url, deadline) {
  if (Date.now() >= deadline) {
    throw new Error("Timed out waiting for CircleCI build-standalone");
  }
  const response = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(10000),
  });
  return response.json();
}
