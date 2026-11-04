import type { getOctokit, context as _context } from "@actions/github";
import { createOrUpdateComment } from "./_comment.ts";

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

  const circleciId = await getCircleciJobId(
    context.payload.pull_request!.head.repo.fork
      ? "pull/" + pull_number
      : process.env.GITHUB_HEAD_REF!,
    context.payload.pull_request!.head.sha
  );

  await createOrUpdateComment(github, {
    owner,
    repo,
    issue_number: pull_number,
    marker: COMMENT_PREFIX,
    body: `${COMMENT_PREFIX}https://babeljs.io/repl/build/${circleciId}`,
  });
}

type Pipeline = {
  id: string;
  created_at: string;
  vcs: { revision: string };
};

type Workflow = {
  id: string;
  attributes: {
    name: string;
    created_at: string;
    phase: string;
    outcome?: string | null;
  };
};

type Job = {
  id: string;
  attributes: {
    name: string;
    type: string;
    phase: string;
    outcome?: string | null;
    number: number;
  };
};

export async function getCircleciJobId(branch: string, headSha: string) {
  // Stop starting new requests after ten minutes.
  const deadline = Date.now() + 10 * 60 * 1000;
  while (true) {
    let pipeline: Pipeline | undefined;
    const pipelinesUrl = new URL(
      "https://circleci.com/api/v2/project/github/babel/babel/pipeline?" +
        new URLSearchParams({ branch }).toString()
    );
    while (true) {
      const body = await request(pipelinesUrl, deadline);
      const pipelines: Pipeline[] = body.items;
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
      const workflows: Workflow[] = [];
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
        const jobs: Job[] = body.data;
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

function checkCompletion(
  { phase, outcome }: Workflow["attributes"] | Job["attributes"],
  name: string
) {
  if (phase !== "ended") return false;
  if (outcome !== "succeeded") {
    throw new Error(`CircleCI ${name} ended: ${outcome}`);
  }
  return true;
}

function latest<T>(items: T[], createdAt: (item: T) => string): T | undefined {
  items.sort((a, b) => Date.parse(createdAt(b)) - Date.parse(createdAt(a)));
  return items[0];
}

function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function request(url: URL, deadline: number): Promise<any> {
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
