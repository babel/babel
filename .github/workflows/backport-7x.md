---
emoji: 🔙
description: 'Backport PRs to the 7.x branch'
intent: Keep the 7.x branch up to date with fixes landed on main, without maintainers having to backport them manually.
on:
  # NOTE: pull_request_target so that it runs on merged PRs coming from forks
  # with the right permission to open new PRs.
  # This workflow skips PRs that are not merged anyway, so it only runs on
  # trusted code.
  pull_request_target:
    types: [closed, labeled]
    branches: [main]
    forks: ["*"]
if: >-
  github.event.pull_request.merged == true && (
    (github.event.action == 'labeled' && github.event.label.name == '7.x: needs backport') ||
    (github.event.action == 'closed' && contains(github.event.pull_request.labels.*.name, '7.x: needs backport'))
  )
permissions:
  contents: read
  pull-requests: read
  issues: read
  copilot-requests: write
# Otherwise GH will re-trigger the workflow when a new label is added and cancel
# the running one.
concurrency:
  group: backport-7x-${{ github.run_id }}
  job-discriminator: ${{ github.event.pull_request.number }}
checkout:
  repository: ${{ github.repository }}
  fetch-depth: 0
  fetch: ["7.x"]
network:
  allowed:
    - defaults
    - node
tools:
  github:
    mode: gh-proxy
    toolsets: [default]
timeout-minutes: 60
steps:
  - name: Collect backport context
    env:
      GH_TOKEN: ${{ github.token }}
      PR_NUMBER: ${{ github.event.pull_request.number }}
    run: |
      set -euo pipefail
      out=/tmp/gh-aw/backport
      mkdir -p "$out"

      gh pr view "$PR_NUMBER" --repo "$GITHUB_REPOSITORY" \
        --json number,title,url,state,baseRefName,mergeCommit,commits \
        > "$out/pr.json"

      branch="automation/backport-$PR_NUMBER"
      existing_pr=$(gh pr list --repo "$GITHUB_REPOSITORY" --head "$branch" --state all --json url --jq '.[0].url // ""')

      state=$(jq -r .state "$out/pr.json")
      merge_sha=$(jq -r '.mergeCommit.oid // ""' "$out/pr.json")
      pr_commits=$(jq '.commits | length' "$out/pr.json")
      strategy=none
      : > "$out/commits.txt"

      if [ "$state" = MERGED ] && [ -n "$merge_sha" ]; then
        parents=$(($(git rev-list --parents -n 1 "$merge_sha" | wc -w) - 1))
        if [ "$parents" -gt 1 ]; then
          # Merge commit: backport the commits it brought in.
          strategy=merge
          git rev-list --reverse --no-merges "$merge_sha^1..$merge_sha^2" > "$out/commits.txt"
        elif [ "$pr_commits" -gt 1 ] && \
             [ "$(git log --format=%s -n "$pr_commits" "$merge_sha" | tac)" = "$(jq -r '.commits[].messageHeadline' "$out/pr.json")" ]; then
          # Rebase merge: the PR's N commits are the N commits ending at
          # merge_sha (the last rebased commit), regardless of what was merged
          # on main afterwards.
          strategy=rebase
          git rev-list --reverse -n "$pr_commits" "$merge_sha" > "$out/commits.txt"
        else
          strategy=squash
          echo "$merge_sha" > "$out/commits.txt"
        fi
      fi

      jq -n \
        --arg branch "$branch" \
        --arg existing_pr "$existing_pr" \
        --arg strategy "$strategy" \
        --slurpfile pr "$out/pr.json" \
        --rawfile commits "$out/commits.txt" \
        '{
          pr: ($pr[0] | {number, title, url, state, baseRefName}),
          merge_strategy: $strategy,
          commits_to_cherry_pick: ($commits | split("\n") | map(select(. != ""))),
          backport_branch: $branch,
          existing_backport_pr: $existing_pr
        }' > "$out/context.json"
      cat "$out/context.json"
jobs:
  conclusion:
    # This runs after the `safe-outputs` job from the agent.
    pre-steps:
      - name: Link the backport PR and remove the label
        if: needs.safe_outputs.outputs.created_pr_number != ''
        env:
          GH_TOKEN: ${{ secrets.BOT_TOKEN }}
          PR_NUMBER: ${{ github.event.pull_request.number }}
          BACKPORT_PR: ${{ needs.safe_outputs.outputs.created_pr_number }}
        run: |
          gh pr comment "$PR_NUMBER" --repo "$GITHUB_REPOSITORY" --body "Backported to 7.x in #$BACKPORT_PR."
          gh pr edit "$PR_NUMBER" --repo "$GITHUB_REPOSITORY" --remove-label "7.x: needs backport"
safe-outputs:
  create-pull-request:
    base-branch: 7.x
    allowed-branches: ["automation/backport-*"]
    preserve-branch-name: true
    labels: ["7.x: backport"]
    draft: false
    fallback-as-issue: false
    auto-close-issue: false
    # Push the original commits as-is, so that author is preserved.
    signed-commits: false
    github-token: ${{ secrets.BOT_TOKEN }}
    max-patch-files: 5000
  add-comment:
    github-token: ${{ secrets.BOT_TOKEN }}
---

# Backport to 7.x

A pull request merged into `main` has been marked with the `7.x: needs backport` label. Your job is to cherry-pick it onto the `7.x` branch and open a backport pull request.

## Context

`/tmp/gh-aw/backport/context.json` contains everything you need:

- `pr`: the original PR (`number`, `title`, `url`, `state`, `baseRefName`).
- `merge_strategy`: how the PR was merged into `main` (`squash`, `rebase` or `merge`; `none` if it was not merged).
- `commits_to_cherry_pick`: the SHAs on `main` to backport, oldest first.
- `backport_branch`: the name of the branch to create.
- `existing_backport_pr`: the URL of a PR that already exists for that branch, if any.

The repository is checked out at `main` with full history, and `origin/7.x` is available locally.

## When to do nothing

Call `noop` with a short reason, and do nothing else, if:

- `pr.state` is not `MERGED`, `pr.baseRefName` is not `main`, or `commits_to_cherry_pick` is empty;
- `existing_backport_pr` is not empty (the PR has already been backported);
- every commit is already on `7.x` (for example, `git cherry-pick` reports that it is empty because somebody already backported it manually).

## Steps

1. Create `backport_branch` from `7.x`: `git switch -c <backport_branch> origin/7.x`.
2. For each SHA in `commits_to_cherry_pick`, in order:
   1. Run `git cherry-pick <sha>`.
   2. If there are conflicts, resolve them (see below), `git add` the resolved files and run `git -c core.editor=true cherry-pick --continue`.
   3. Rewrite the commit message so that it is exactly the original commit's title (the first line of `git log -1 --format=%s <sha>`), followed by an empty line, followed by `backport of <sha>` (the full SHA): `git commit --amend -m "<title>" -m "backport of <sha>"`. This keeps the original author.
3. Check with `git log --format='%an%n%s%n%b' 7.x..HEAD` that the branch contains exactly one commit per SHA, with the message format above.
4. Open the pull request using the `create_pull_request` safe output (see below).

## Resolving conflicts

The goal is to apply the *intent* of the original change to the 7.x code, which may have diverged from `main`:

- Read the original diff (`git show <sha>`) and the PR description (`gh pr view <number>`) to understand what the change does.
- Inspect how the conflicting code looks on `7.x`, and use `git log origin/main -- <file>` to find the commits that are on `main` but not on `7.x` and that caused the conflict.
- Keep the 7.x behavior that the original PR did not mean to change. In particular, do not bring in Babel 8-only code (for example code that is only reached when `process.env.BABEL_8_BREAKING` is set on `main`, or code that relies on Babel 8 breaking changes), and do not bring in changes from other commits that were not part of the backported PR.
- If a test fixture's expected output conflicts, regenerate it rather than editing it by hand when possible.
- After resolving conflicts, validate your work: run `make bootstrap` and then `yarn jest <path to the affected packages>`. If tests that the backported PR touched fail, fix the backport. If you cannot make them pass, still open the PR, but say so clearly in its description.
- If a conflict cannot be resolved with confidence (for example the code it touches does not exist at all on `7.x`), do not guess: abort with `git cherry-pick --abort` and report the failure (see below). Do not open a PR.

## Reporting a failure

If you cannot complete the backport (for example because of conflicts you cannot resolve, or because a step fails in a way you cannot recover from), do not call `noop`. Instead, call `add_comment` on the original PR with a body in this format:

```markdown
⚠️ **The automatic backport to 7.x failed.**

<one or two sentences on why>

<if relevant, the list of conflicting files, with a short explanation for each>

This PR needs to be backported manually.
```

## Pull request

Call `create_pull_request` with:

- `branch`: `backport_branch`
- `title`: the original PR's title
- `body`: in this format:

  ```markdown
  **Backport of #<pr number> to 7.x**

  Cherry-picked commits:
  - <sha on main> → <title>

  **Conflicts:** None.
  ```

  If you had to resolve conflicts, replace the last line with `**Conflicts:** Resolved.`, followed by a list of the files that conflicted, with a short explanation for each of what conflicted and how you resolved it. Also report which tests you ran and their outcome, so that reviewers can focus their attention on those parts.

