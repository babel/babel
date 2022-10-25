/* eslint-disable */

import path from "path";
import fs from "fs";
import os from "os";
import assert from "assert";
import { Duplex } from "stream";

import shell from "shelljs";
import compressing from "compressing";
import { startGroup, endGroup } from "@actions/core";
import { context, getOctokit } from "@actions/github";
import SizePlugin from "size-plugin-core";

import { diffTable, toBool } from "./utils.js";

let token = process.env.token;

let owner, repo, ref, workflow, pull_number;

({ ref, workflow } = context);
({ owner, repo } = context.repo);
pull_number = context.issue.number;

const octokit = getOctokit(token);

async function getArtifact(branch, actionName) {
  assert(workflow !== branch, "Cannot use `getArtifact` in target workflow");

  let i = 0;
  while (true) {
    i++;
    try {
      let runs = (
        await octokit.actions.listWorkflowRunsForRepo({
          owner,
          repo,
          branch: branch,
        })
      ).data.workflow_runs;

      const run = runs.find(v => v.name === actionName);

      if (run.status === "in_progress") {
        throw new Error("Target workflow is still in progress");
      }

      //console.log("WorkflowRun", run);

      const artifact = (
        await octokit.actions.listWorkflowRunArtifacts({
          owner,
          repo,
          run_id: run.id,
        })
      ).data.artifacts[0];

      assert(artifact.name === "verdaccio-workspace");

      //console.log("Artifact", artifact);

      const buf = Buffer.from(
        new Uint8Array(
          (
            await octokit.actions.downloadArtifact({
              owner,
              repo,
              artifact_id: artifact.id,
              archive_format: "zip",
            })
          ).data
        )
      );

      assert(buf.length > 0);

      return buf;
    } catch (error) {
      // 30 minutes
      if (i > 180) {
        throw error;
      }
      console.log("Retry to fetch artifact", i);
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  }
}

function bufToStream(buf) {
  const stream = new Duplex();
  stream.push(buf);
  stream.push(null);
  return stream;
}

function streamToBuf(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", chunk => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
}

/**
 *
 * @param {Buffer} buf
 * @returns {Promise<Map<string, Buffer>>}
 */
function extractArtifact(buf) {
  return new Promise((resolve, reject) => {
    const stream = bufToStream(buf);
    const data = new Map();

    const zip = new compressing.zip.UncompressStream({ source: stream });
    zip
      .on("entry", (header, stream, next) => {
        if (header.type === "file" && header.name.endsWith(".tgz")) {
          streamToBuf(stream).then(buf => {
            data.set(header.name, buf);
            next();
          });
        } else {
          stream.on("end", next);
          stream.resume();
        }
      })
      .on("error", reject)
      .on("finish", () => {
        resolve(data);
      });
  });
}

async function fetchAndExtract(branchOrFiles, dir) {
  let data;
  if (Array.isArray(branchOrFiles)) {
    data = new Map();
    for (const file of branchOrFiles) {
      data.set(file, fs.readFileSync(file));
    }
  } else {
    const buf = await getArtifact(branchOrFiles, workflow);
    data = await extractArtifact(buf);
  }

  for (const [k, v] of data) {
    const p = path.dirname(path.join(dir, k.replace(/.*storage\//, "")));
    await compressing.tgz.uncompress(v, p);
  }
}

/**
 * Create a check and return a function that updates (completes) it
 */
async function createCheck() {
  const check = await octokit.checks.create({
    repo,
    name: "Compressed Size",
    head_sha: context.payload.pull_request.head.sha,
    status: "in_progress",
  });

  return async details => {
    await octokit.checks.update({
      repo,
      check_run_id: check.data.id,
      completed_at: new Date().toISOString(),
      status: "completed",
      ...details,
    });
  };
}

async function action(before, after) {
  const plugin = new SizePlugin({
    compression: "gzip",
    pattern: "**/*.{js,mjs,cjs}",
  });

  const newSizes = await plugin.readFromDisk(after);
  const oldSizes = await plugin.readFromDisk(before);
  const diff = await plugin.getDiff(oldSizes, newSizes);

  startGroup(`Size Differences:`);
  const cliText = await plugin.printSizes(diff);
  console.log(cliText);
  endGroup();

  const markdownDiff = diffTable(diff, {
    collapseUnchanged: true,
    omitUnchanged: true,
    showTotal: true,
    minimumChangeThreshold: 0,
  });

  if (markdownDiff.changedRows.length === 0) {
    console.log("No size changes");
    return;
  }

  let outputRawMarkdown = false;

  const commentInfo = {
    ...context.repo,
    issue_number: pull_number,
  };

  const comment = {
    ...commentInfo,
    body:
      markdownDiff.text +
      '\n\n<a href="https://github.com/preactjs/compressed-size-action"><sub>ported-from-compressed-size-action</sub></a>',
  };

  if (
    context.eventName !== "pull_request" &&
    context.eventName !== "pull_request_target"
  ) {
    console.log(
      "No PR associated with this action run. Not posting a check or comment."
    );
    outputRawMarkdown = false;
  } else if (toBool(process.env["use-check"])) {
    if (token) {
      const finish = await createCheck(octokit, context);
      await finish({
        conclusion: "success",
        output: {
          title: `Compressed Size Action`,
          summary: markdownDiff.text,
        },
      });
    } else {
      outputRawMarkdown = true;
    }
  } else {
    startGroup(`Updating stats PR comment`);
    let commentId;
    try {
      const comments = (await octokit.issues.listComments(commentInfo)).data;
      for (let i = comments.length; i--; ) {
        const c = comments[i];
        if (
          c.user.type === "Bot" &&
          /<sub>[\s\n]*(compressed|gzip)-size-action/.test(c.body)
        ) {
          commentId = c.id;
          break;
        }
      }
    } catch (e) {
      console.log("Error checking for previous comments: " + e.message);
    }

    if (commentId) {
      console.log(`Updating previous comment #${commentId}`);
      try {
        await octokit.issues.updateComment({
          ...context.repo,
          comment_id: commentId,
          body: comment.body,
        });
      } catch (e) {
        console.log("Error editing previous comment: " + e.message);
        commentId = null;
      }
    }

    // no previous or edit failed
    if (!commentId) {
      console.log("Creating new comment");
      try {
        await octokit.issues.createComment(comment);
      } catch (e) {
        console.log(`Error creating comment: ${e.message}`);
        console.log(`Submitting a PR review comment instead...`);
        try {
          await octokit.pulls.createReview({
            owner,
            repo,
            pull_number,
            event: "COMMENT",
            body: comment.body,
          });
        } catch (e) {
          console.log("Error creating PR review.");
          outputRawMarkdown = true;
        }
      }
    }
    endGroup();
  }

  if (outputRawMarkdown) {
    console.log(
      `
			Error: compressed-size-action was unable to comment on your PR.
			This can happen for PR's originating from a fork without write permissions.
			You can copy the size table directly into a comment using the markdown below:
			\n\n${comment.body}\n\n
		`.replace(/^(\t|  )+/gm, "")
    );
  }
}

(async () => {
  console.log(ref, workflow);

  if (ref === "refs/heads/main") {
    console.log("Does not check on main branch. Exiting.");
    return;
  }

  const tmpDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "compressed-size-action-")
  );

  const mainDir = path.join(tmpDir, "main");
  const prDir = path.join(tmpDir, "pr");

  await fetchAndExtract("main", mainDir);

  // Github does not support downloading artifacts uploaded in the current action through this API,
  // so we have to use another way.
  if (fs.existsSync("/tmp/verdaccio-workspace")) {
    const files = shell.ls("/tmp/verdaccio-workspace/**/*.tgz");
    await fetchAndExtract(files, prDir);
  } else {
    await fetchAndExtract(ref, prDir);
  }

  await action(mainDir, prDir);

  console.log("All done!");
})().catch(err => {
  throw err;
});
