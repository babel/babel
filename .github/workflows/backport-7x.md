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
network:
  allowed:
    - defaults
    - node
tools:
  github:
    mode: gh-proxy
    toolsets: [default]

# Otherwise GH will re-trigger the workflow when a new label is added and cancel
# the running one.
concurrency:
  group: backport-7x-${{ github.run_id }}
  job-discriminator: ${{ github.event.pull_request.number }}

timeout-minutes: 90

checkout:
  repository: ${{ github.repository }}
  fetch-depth: 0
  fetch: ["7.x"]

jobs:
  # The deterministic part of the backport, which runs before the agent. It
  # cherry-picks the PR and, if there are no conflicts, builds, lints and tests
  # it. When everything passes, it opens the backport PR itself and the agent is
  # skipped. The agent only runs to resolve conflicts or to fix failing checks.
  backport:
    runs-on: ubuntu-latest
    timeout-minutes: 60
    permissions:
      contents: read
      pull-requests: read
    outputs:
      needs_agent: ${{ steps.agent-context.outputs.needs_agent }}
    steps:
      - name: Checkout
        uses: actions/checkout@v7
        with:
          fetch-depth: 0
          persist-credentials: false

      - name: Collect backport context
        id: context
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
          base=$(jq -r .baseRefName "$out/pr.json")
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
            --arg strategy "$strategy" \
            --slurpfile pr "$out/pr.json" \
            --rawfile commits "$out/commits.txt" \
            '{
              pr: ($pr[0] | {number, title, url}),
              merge_strategy: $strategy,
              commits_to_cherry_pick: ($commits | split("\n") | map(select(. != ""))),
              backport_branch: $branch
            }' > "$out/context.json"
          cat "$out/context.json"

          if [ "$state" != MERGED ] || [ "$base" != main ]; then
            echo "#$PR_NUMBER is not merged into main."
          elif [ ! -s "$out/commits.txt" ]; then
            echo "Could not find the commits of #$PR_NUMBER on main."
          elif [ -n "$existing_pr" ]; then
            echo "#$PR_NUMBER already has a backport PR: $existing_pr"
          else
            echo "backport=true" >> "$GITHUB_OUTPUT"
          fi

      - name: Cherry-pick
        id: cherry-pick
        if: steps.context.outputs.backport == 'true'
        env:
          GIT_COMMITTER_NAME: Babel Bot
          GIT_COMMITTER_EMAIL: babel-bot@users.noreply.github.com
        run: |
          set -euo pipefail
          out=/tmp/gh-aw/backport
          branch=$(jq -r .backport_branch "$out/context.json")
          git switch -c "$branch" origin/7.x

          status=clean
          : > "$out/picked.txt"
          : > "$out/remaining.txt"
          : > "$out/conflicts.txt"
          for sha in $(cat "$out/commits.txt"); do
            if [ "$status" = conflict ]; then
              echo "$sha" >> "$out/remaining.txt"
              continue
            fi
            head_before=$(git rev-parse HEAD)
            if git cherry-pick --empty=drop "$sha"; then
              if [ "$(git rev-parse HEAD)" = "$head_before" ]; then
                echo "$sha is already on 7.x, skipping it"
                continue
              fi
              git commit --amend --quiet -m "$(git log -1 --format=%s "$sha")" -m "backport of $sha"
              echo "$sha $(git rev-parse HEAD)" >> "$out/picked.txt"
            else
              status=conflict
              git diff --name-only --diff-filter=U > "$out/conflicts.txt"
              if [ ! -s "$out/conflicts.txt" ]; then
                echo "Cherry-picking $sha failed, but not because of conflicts" >&2
                exit 1
              fi
              git cherry-pick --abort
              echo "$sha" >> "$out/remaining.txt"
            fi
          done

          if [ "$status" = clean ] && [ ! -s "$out/picked.txt" ]; then
            echo "All the commits are already on 7.x."
            status=skip
          fi
          echo "status=$status" >> "$GITHUB_OUTPUT"

          # The same commands are used by the agent to re-run the checks.
          cat > "$out/check.sh" <<'CHECK'
          #!/usr/bin/env bash
          # Usage: check.sh build|rebuild|lint|test
          set -o pipefail
          case "$1" in
            build) make -j build-standalone-ci ;;
            rebuild) make build ;;
            lint) make -j lint-ci check-compat-data && git diff --exit-code ;;
            test) BABEL_ENV=test yarn jest --ci ;;
            *) echo "Unknown check: $1" >&2; exit 2 ;;
          esac
          CHECK
          chmod +x "$out/check.sh"

      - name: Use Node.js latest
        if: steps.cherry-pick.outputs.status == 'clean'
        uses: actions/setup-node@v7
        with:
          node-version: latest
          check-latest: true
          cache: yarn

      - name: Build
        id: build
        if: steps.cherry-pick.outputs.status == 'clean'
        run: |
          set +e
          /tmp/gh-aw/backport/check.sh build > /tmp/gh-aw/backport/build.log 2>&1
          echo "exit_code=$?" >> "$GITHUB_OUTPUT"
          tail -n 50 /tmp/gh-aw/backport/build.log

      - name: Lint
        id: lint
        if: steps.cherry-pick.outputs.status == 'clean' && steps.build.outputs.exit_code == '0'
        run: |
          set +e
          /tmp/gh-aw/backport/check.sh lint > /tmp/gh-aw/backport/lint.log 2>&1
          echo "exit_code=$?" >> "$GITHUB_OUTPUT"
          tail -n 50 /tmp/gh-aw/backport/lint.log
          git checkout -- .

      - name: Test
        id: test
        if: steps.cherry-pick.outputs.status == 'clean' && steps.build.outputs.exit_code == '0'
        run: |
          set +e
          /tmp/gh-aw/backport/check.sh test > /tmp/gh-aw/backport/test.log 2>&1
          echo "exit_code=$?" >> "$GITHUB_OUTPUT"
          tail -n 50 /tmp/gh-aw/backport/test.log

      - name: Open the backport PR
        id: open-pr
        if: >-
          steps.cherry-pick.outputs.status == 'clean' &&
          steps.build.outputs.exit_code == '0' &&
          steps.lint.outputs.exit_code == '0' &&
          steps.test.outputs.exit_code == '0'
        env:
          GH_TOKEN: ${{ secrets.BOT_TOKEN }}
          PR_NUMBER: ${{ github.event.pull_request.number }}
        run: |
          set -euo pipefail
          out=/tmp/gh-aw/backport
          branch=$(jq -r .backport_branch "$out/context.json")
          title=$(jq -r .pr.title "$out/context.json")

          git push "https://babel-bot:${GH_TOKEN}@github.com/${GITHUB_REPOSITORY}.git" "HEAD:refs/heads/$branch"

          {
            echo "**Backport of #$PR_NUMBER to 7.x**"
            echo
            echo "Cherry-picked commits:"
            while read -r sha _; do
              echo "- $sha → $(git log -1 --format=%s "$sha")"
            done < "$out/picked.txt"
            echo
            echo "**Conflicts:** None."
            echo
            echo "**Checks:** build, lint (\`make -j lint-ci check-compat-data\`) and tests (\`yarn jest\`) pass."
          } > "$out/body.md"

          url=$(gh pr create --repo "$GITHUB_REPOSITORY" --head "$branch" --base 7.x \
            --title "$title" --body-file "$out/body.md" --label "7.x: backport")
          gh pr comment "$PR_NUMBER" --repo "$GITHUB_REPOSITORY" --body "Backported to 7.x in #${url##*/}."
          gh pr edit "$PR_NUMBER" --repo "$GITHUB_REPOSITORY" --remove-label "7.x: needs backport"

      - name: Prepare context for the agent
        id: agent-context
        if: >-
          steps.cherry-pick.outputs.status == 'conflict' ||
          (steps.cherry-pick.outputs.status == 'clean' && steps.open-pr.outcome == 'skipped')
        env:
          STATUS: ${{ steps.cherry-pick.outputs.status }}
          BUILD_EXIT_CODE: ${{ steps.build.outputs.exit_code }}
          LINT_EXIT_CODE: ${{ steps.lint.outputs.exit_code }}
          TEST_EXIT_CODE: ${{ steps.test.outputs.exit_code }}
        run: |
          set -euo pipefail
          out=/tmp/gh-aw/backport
          check() {
            if [ -z "$1" ]; then echo '"not run"'; elif [ "$1" = 0 ]; then echo '"passed"'; else echo '"failed"'; fi
          }
          jq \
            --arg status "$STATUS" \
            --rawfile picked "$out/picked.txt" \
            --rawfile remaining "$out/remaining.txt" \
            --rawfile conflicts "$out/conflicts.txt" \
            --argjson build "$(check "${BUILD_EXIT_CODE:-}")" \
            --argjson lint "$(check "${LINT_EXIT_CODE:-}")" \
            --argjson test "$(check "${TEST_EXIT_CODE:-}")" \
            '. + {
              status: $status,
              picked_commits: ($picked | split("\n") | map(select(. != "") | split(" ") | {original: .[0], backport: .[1]})),
              remaining_commits: ($remaining | split("\n") | map(select(. != ""))),
              conflicting_files: ($conflicts | split("\n") | map(select(. != ""))),
              checks: {build: $build, lint: $lint, test: $test}
            }' "$out/context.json" > "$out/context.json.tmp"
          mv "$out/context.json.tmp" "$out/context.json"
          cat "$out/context.json"

          # Pass the commits that have already been cherry-picked to the agent job.
          if [ -s "$out/picked.txt" ]; then
            git bundle create "$out/branch.bundle" "$(jq -r .backport_branch "$out/context.json")" ^origin/7.x
          fi
          echo "needs_agent=true" >> "$GITHUB_OUTPUT"

      - name: Upload the backport state
        if: steps.agent-context.outputs.needs_agent == 'true'
        uses: actions/upload-artifact@v7
        with:
          name: backport-state
          path: /tmp/gh-aw/backport
          retention-days: 7

  agent:
    if: needs.backport.outputs.needs_agent == 'true'

  conclusion:
    # This runs after the `safe-outputs` job from the agent.
    pre-steps:
      - name: 'Link the backport PR and remove the "7.x: needs backport" label'
        if: needs.safe_outputs.outputs.created_pr_number != ''
        env:
          GH_TOKEN: ${{ secrets.BOT_TOKEN }}
          PR_NUMBER: ${{ github.event.pull_request.number }}
          BACKPORT_PR: ${{ needs.safe_outputs.outputs.created_pr_number }}
        run: |
          gh pr comment "$PR_NUMBER" --repo "$GITHUB_REPOSITORY" --body "Backported to 7.x in #$BACKPORT_PR."
          gh pr edit "$PR_NUMBER" --repo "$GITHUB_REPOSITORY" --remove-label "7.x: needs backport"

# The agent only runs when the `backport` job couldn't complete the
# backport by itself.
steps:
  - name: Download the backport state
    uses: actions/download-artifact@v8
    with:
      name: backport-state
      path: /tmp/gh-aw/backport
  - name: Restore the backport branch
    run: |
      set -euo pipefail
      out=/tmp/gh-aw/backport
      chmod +x "$out/check.sh"
      branch=$(jq -r .backport_branch "$out/context.json")
      if [ -f "$out/branch.bundle" ]; then
        git fetch "$out/branch.bundle" "$branch:$branch"
        git switch "$branch"
      else
        git switch -c "$branch" origin/7.x
      fi
      git log --oneline origin/7.x..HEAD
      cat "$out/context.json"
  - name: Use Node.js latest
    uses: actions/setup-node@v7
    with:
      node-version: latest
      check-latest: true
      cache: yarn
  - name: Build
    run: |
      /tmp/gh-aw/backport/check.sh build > /tmp/gh-aw/backport/build.log 2>&1 || true
      tail -n 50 /tmp/gh-aw/backport/build.log

safe-outputs:
  activation-comments: false # babel-bot posts the "Backported to 7.x" comment itself
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

A pull request merged into `main` has been marked with the `7.x: needs backport` label, and it must be cherry-picked onto the `7.x` branch. The workflow already tried to do it without you, but it needs your help because there were conflicts, or because the build, lint or tests fail after the cherry-pick.

## Context

`/tmp/gh-aw/backport/context.json` contains:

- `pr`: the original PR (`number`, `title`, `url`).
- `backport_branch`: the branch with the backport. It is already checked out, and it was created from `origin/7.x`.
- `picked_commits`: the commits that have already been cherry-picked onto `backport_branch` (`original` is the SHA on `main`, `backport` the SHA on `backport_branch`).
- `status`:
  - `conflict`: cherry-picking the first commit in `remaining_commits` caused conflicts in `conflicting_files`. The cherry-pick has been aborted, so the working tree is clean. You have to cherry-pick `remaining_commits` yourself.
  - `clean`: all the commits have been cherry-picked without conflicts, but some of the `checks` failed.
- `remaining_commits`: the SHAs on `main` that still need to be cherry-picked, oldest first.
- `checks`: the result of `build`, `lint` and `test` (`passed`, `failed` or `not run`). Lint and tests are only run when there are no conflicts.

The logs of the checks that ran are in `/tmp/gh-aw/backport/{build,lint,test}.log`. Dependencies are already installed and Babel has already been built, so you do not need network access.

To run a check, use `/tmp/gh-aw/backport/check.sh <name>`, where `<name>` is one of:

- `rebuild`: rebuild Babel after changing its source code. Always do it before running `lint` or `test`.
- `lint`: `make -j lint-ci check-compat-data`, which must not leave changes in the working tree.
- `test`: run all the tests with Jest. While iterating, prefer running only the relevant tests with `yarn jest <paths>`.

Do not use `make bootstrap` or `check.sh build`, as they re-install the dependencies.

## 1. Resolve conflicts

If `status` is `conflict`, for each SHA in `remaining_commits`, in order:

1. Run `git cherry-pick <sha>`.
2. If there are conflicts, resolve them (see below), `git add` the resolved files and run `git -c core.editor=true cherry-pick --continue`.
3. Rewrite the commit message so that it is exactly the original commit's title (the first line of `git log -1 --format=%s <sha>`), followed by an empty line, followed by `backport of <sha>` (the full SHA): `git commit --amend -m "<title>" -m "backport of <sha>"`. This keeps the original author.

The goal is to apply the *intent* of the original change to the 7.x code, which may have diverged from `main`:

- Read the original diff (`git show <sha>`) and the PR description (`gh pr view <number>`) to understand what the change does.
- Inspect how the conflicting code looks on `7.x`, and use `git log origin/main -- <file>` to find the commits that are on `main` but not on `7.x` and that caused the conflict.
- Keep the 7.x behavior that the original PR did not mean to change. In particular, do not bring in Babel 8-only code (for example code that is only reached when `process.env.BABEL_8_BREAKING` is set on `main`, or code that relies on Babel 8 breaking changes), and do not bring in changes from other commits that were not part of the backported PR.
- If a test fixture's expected output conflicts, regenerate it rather than editing it by hand when possible.
- If a conflict cannot be resolved with confidence (for example the code it touches does not exist at all on `7.x`), do not guess: abort with `git cherry-pick --abort` and report the failure (see below). Do not open a PR.

Once all the commits have been cherry-picked, you must run all the checks before opening the PR, even if the code you touched looks right: first `rebuild`, then `lint` and `test` (the whole test suite, not only the relevant tests). Then continue with the next section.

## 2. Fix failing checks

If any check fails (either one of the `checks` in `context.json`, or one you ran after resolving conflicts):

1. Look at the failures, and determine whether they are caused by the backport. For example, the backported code might use an API or syntax that is not available on 7.x, or a test might expect Babel 8 behavior. Failures in code and tests unrelated to the backported PR are not your responsibility: do not fix them, but mention them in the PR description.
2. Fix the failures caused by the backport, keeping the fix as small as possible and consistent with the 7.x code. Do not amend the cherry-picked commits: create a new commit on top of them, with the message `Fix <what you fixed> after backporting #<pr number>`.
3. Re-run the relevant checks to verify your fix.

If you cannot make the checks pass, still open the PR, but say so clearly in its description.

## 3. Open the pull request

Check with `git log --format='%an%n%s%n%b' origin/7.x..HEAD` that the branch contains one commit per backported SHA with the message format above, followed by your fix commits, if any.

Call `create_pull_request` with:

- `branch`: `backport_branch`
- `title`: the original PR's title
- `body`: in this format:

  ```markdown
  **Backport of #<pr number> to 7.x**

  Cherry-picked commits:
  - <sha on main> → <title>

  **Conflicts:** None.

  **Checks:** <which checks you ran and their outcome>
  ```

  If you had to resolve conflicts, replace the `**Conflicts:**` line with `**Conflicts:** Resolved.`, followed by a list of the files that conflicted, with a short explanation for each of what conflicted and how you resolved it. If you added fix commits, list what each of them fixes and why it was needed on 7.x. Mention any failures you did not fix and why. This lets reviewers focus their attention on those parts.

## Reporting a failure

If you cannot complete the backport (for example because of conflicts you cannot resolve, or because a step fails in a way you cannot recover from), do not call `noop`. Instead, call `add_comment` on the original PR with a body in this format:

```markdown
⚠️ **The automatic backport to 7.x failed.**

<one or two sentences on why>

<if relevant, the list of conflicting files, with a short explanation for each>

This PR needs to be backported manually.
```
