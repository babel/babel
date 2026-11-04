import type { getOctokit } from "@actions/github";

const BOT_LOGIN = "babel-bot";

/**
 * Updates the comment posted by babel-bot on the given issue that includes
 * `marker`, or creates a new one if it does not exist (unless `create` is
 * false).
 */
export async function createOrUpdateComment(
  github: ReturnType<typeof getOctokit>,
  {
    owner,
    repo,
    issue_number,
    marker,
    body,
    create = true,
  }: {
    owner: string;
    repo: string;
    issue_number: number;
    marker: string;
    body: string;
    create?: boolean;
  }
) {
  let commentId;
  for await (const { data: comments } of github.paginate.iterator(
    github.rest.issues.listComments,
    { owner, repo, issue_number }
  )) {
    const comment = comments.find(
      c => c.user?.login === BOT_LOGIN && c.body?.includes(marker)
    );
    if (comment) {
      commentId = comment.id;
      break;
    }
  }

  if (commentId) {
    await github.rest.issues.updateComment({
      owner,
      repo,
      comment_id: commentId,
      body,
    });
  } else if (create) {
    await github.rest.issues.createComment({
      owner,
      repo,
      issue_number,
      body,
    });
  }
}
