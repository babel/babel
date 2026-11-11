# AGENTS instructions

Babel is a JavaScript compiler, developed as a Yarn monorepo of ~150 packages under `packages/`. Human contributors: see [CONTRIBUTING.md](CONTRIBUTING.md) and [AI_POLICY.md](AI_POLICY.md).

## AI usage

You are working for a human contributor who reviews, understands, and takes responsibility for everything you produce.

### Rules for opening pull requests

The contributor writes the pull request description, in their own words: it shows that they understand the code they are contributing. Give them what it needs (what changed, why, and the tests you ran) and leave the writing to them. If they ask you to write it anyway, start it with a disclaimer naming the model, as for issues and comments below.

Before opening the PR, see the [review loop](#review-loop-before-opening-a-pull-request).

### Rules for writing commits

End the commit message with an `Assisted-by:` trailer naming the model, without an email, e.g. `Assisted-by: My LLM Model`. It replaces any `Co-authored-by:` trailer for the model. If you wrote the commit description, also start it with a disclaimer naming the model, as for issues and comments below.

### Issues and comments

Start any LLM-written issue body, comment, or review reply with a disclaimer naming the model, e.g. `_This comment was written with AI (My LLM Model)._`

### Prohibited activities

AI agents must not:

- Push to any branch or tag in babel/babel. Push to the contributor's fork.
- Open pull requests or issues, post comments, or reply to reviews without the contributor reviewing the text first. Hand them a draft to post, and publish it yourself only when they explicitly ask.
- Claim that a change fixes a bug or that code behaves a certain way without checking. Back each claim with a test you ran or source you read, and say which.
- Make Babel's own tests pass by deleting or weakening them: removing fixtures or accepting `OVERWRITE=true` output you can't explain. A test that should change needs a reason the contributor can verify. Failures in the third-party conformance suites (test262, TypeScript, Flow) go through their allowlists instead; see `scripts/parser-tests/` below.
- Promote AI tools or their vendors in commits, PR descriptions, code, or comments. The `Assisted-by:` trailer and the disclosures above are the only attribution.

### Violations

Contributions that break any rule under AI usage will be rejected: the pull request or issue is closed without review. The contributor may also be blocked from the Babel organization.

## Commands

Requires Node `>=22.18.0` and Yarn 4.

```sh
make bootstrap                      # install + build everything (after clone or dependency changes)
make watch                          # rebuild lib/ on every src/ change; keep it running while you work
make build-no-bundle                # one-off rebuild of lib/, without bundling
yarn jest babel-parser              # tests for one package (matches substrings of the package name)
yarn jest babel-parser -t "es2015"  # tests whose name matches a regex; fixture paths become space-separated names
OVERWRITE=true yarn jest <package>  # regenerate expected fixture outputs
make tscheck                        # typecheck
make lint                           # typecheck + eslint + type tests + prettier check
yarn prettier --write .             # format files
```

Tests import each package's built `lib/`, not `src/`. Run `make watch` (or rebuild) before `yarn jest`, or the tests check stale code.

More options (debugging, `TEST_ONLY`, `TEST_GREP`, coverage) are in [CONTRIBUTING.md](CONTRIBUTING.md#running-lintingtests).

## Codebase map

Yarn workspaces live in `packages/`, `eslint/`, `codemods/`, `test/esm`, `test/runtime-integration/*`, and `benchmark/`.

### `packages/`: the compiler and its plugins

- `packages/babel-parser`: the parser. Core grammar in `src/parser/`, tokenizer in `src/tokenizer/`, the `typescript`, `flow`, `jsx`, `estree`, `placeholders`, and `v8intrinsic` plugins in `src/plugins/`. Proposal syntax (decorators, pipeline, and others) is parsed in `src/parser/` itself, gated by `this.hasPlugin(...)`.
- `packages/babel-types`: AST node definitions in `src/definitions/`. Builders, validators, and TS types are generated from them into `src/*/generated/`.
- `packages/babel-traverse`: AST traversal, `NodePath`, and scope tracking.
- `packages/babel-generator`: AST to code. Printers in `src/generators/`, parenthesization rules in `src/node/parentheses.ts`.
- `packages/babel-core`: config loading and the transform pipeline.
- `packages/babel-helpers`: runtime helpers in `src/helpers/`, injected into compiled output.
- `packages/babel-template`: builds AST from code templates; `packages/babel-code-frame`: source excerpts for error messages.
- `packages/babel-plugin-*`: syntax plugins (`plugin-syntax-*`) and transforms (`plugin-transform-*`, `plugin-proposal-*`).
- `packages/babel-helper-*`: logic shared between plugins (class features, module transforms, compilation targets, fixture test runners).
- `packages/babel-preset-env`, `packages/babel-compat-data`: target-based plugin selection and the browser compat data behind it. Other presets: `preset-react`, `preset-typescript`, `preset-flow`.
- `packages/babel-runtime`, `packages/babel-runtime-corejs3`: published copies of the helpers, imported by output compiled with `plugin-transform-runtime`.
- Entry points for users: `babel-cli`, `babel-register` (require hook), `babel-node`, `babel-standalone` (browser build).

Generated files are rebuilt by `make build` / `make watch`. Edit the source they come from:

- `packages/babel-types/src/*/generated/` and `packages/babel-traverse/src/**/generated/` come from `packages/babel-types/src/definitions/`.
- `packages/babel-helpers/src/helpers-generated.ts` comes from `packages/babel-helpers/src/helpers/`.

### `eslint/`: ESLint integration

- `eslint/babel-eslint-parser`: `@babel/eslint-parser`, which parses with Babel and converts the AST to ESTree for ESLint (`src/convert/`, scope analysis in `src/analyze-scope.ts`).
- `eslint/babel-eslint-plugin`: `@babel/eslint-plugin`, rules that understand syntax core ESLint rules can't handle.
- `eslint/babel-eslint-plugin-development`: rules for authors of Babel plugins.
- `eslint/babel-eslint-plugin-development-internal`: rules this repo lints itself with; not semver-stable.
- `eslint/babel-eslint-tests`, `eslint/babel-eslint-shared-fixtures`: integration tests that run the parser inside real ESLint (`yarn jest babel-eslint`).

### `codemods/`

Standalone Babel plugins that rewrite user code (`babel-plugin-codemod-object-assign-to-object-spread`, `babel-plugin-codemod-optional-catch-binding`), tested with the same fixture runner as transforms.

### Outside the workspaces

- `scripts/parser-tests/`: parser conformance against test262, TypeScript, and Flow. Run with `make bootstrap-test262 && make test-test262` (likewise `-typescript`, `-flow`). Known failures are in each suite's allowlist; update it with `make test-test262-update-allowlist`. Give each new allowlist entry its reason as a trailing `<!-- … -->` comment on the same line; updating the allowlist drops anything else.
- `test/`: cross-package integration tests (ESM entry points, runtime interop across bundlers, Babel 7/8 compatibility).
- `benchmark/`: performance benchmarks per package.
- `scripts/generators/`: generators for READMEs, tsconfigs, and other repo files.

## Tests

Most tests are fixture directories: `packages/<pkg>/test/fixtures/<suite>/<test>/` holding `input.js`, an expected `output.js` (`output.json` for the parser), and an optional `options.json` (plugins, `throws` for expected errors, `minNodeVersion`). Directory names become test names.

- Add a fixture for each bug fixed and each feature added, next to its closest existing neighbors.
- Generate expected outputs with `OVERWRITE=true`, then read the diff: every changed output must be explained by your change.
- Run the tests of every package your change can reach, not just the one you edited. A parser change can affect generator and transform fixtures.

Fixture format details: [CONTRIBUTING.md](CONTRIBUTING.md#writing-tests).

## Pull requests

- Base changes on `main`. For bug fixes that should also ship in Babel 7, say so in the template's "Need backport?" row; the `7.x` branch is maintained separately.
- Fill in the PR template's table, including `Fixes #<issue>` links. The description below the table is the contributor's to write; see [Rules for opening pull requests](#rules-for-opening-pull-requests).
- Write the PR title as a [Conventional Commits](https://www.conventionalcommits.org/) subject, `<type>(<scope>): <summary>`, e.g. `fix(parser): require "(" after import.source`. PRs are squash-merged, so the title becomes the commit subject on `main`. The scope is the package name without `babel-` (`parser`, `generator`, `traverse`, `preset-env`), omitted when the change spans packages. Types:
  - `feat`: a new feature or option
  - `fix`: a bug fix
  - `perf`: a performance improvement
  - `refactor`: a change whose goal is better code structure rather than new behavior. If the restructuring also fixes a bug, it is still a `refactor`; name the fixed bug in the description and add a test for it.
  - `docs`: documentation only
  - `test`: adding or correcting tests only
  - `build`: the build system or published package contents
  - `ci`: GitHub Actions workflows
  - `chore`: dependency bumps, test262/compat-data updates, and other maintenance
  - `style`: formatting only, no behavior change
  - `revert`: reverts an earlier commit

### Review loop before opening a pull request

When you prepare a PR as an agent, run this loop after the first working implementation and before opening the PR:

1. Regression review: have one or more separate agents review the diff for regressions. Give them the diff and the issue it addresses, not your own conclusions.
2. Report every regression found to the contributor. They decide which ones to fix in this PR; fix those, each with a test. Repeat steps 1–2 until a review finds no regression the contributor wants fixed here.
3. Structure review: review the diff for simpler structure (duplicated logic, needless abstraction, existing helpers that could be reused) and apply the simplifications. If you applied any, return to step 1, since a simplification can introduce a regression.
4. The loop is done when one full pass finds no regression to fix and no structural improvement to make.

Then rewrite the branch history: refactor commits first, and the bug fix or feature as the final commit. Each commit must build and pass the tests on its own, so reviewers can check it in isolation.

Summarize the loop for the contributor to put in their PR description: the number of rounds, the regressions found and fixed, each deferred regression, and the simplifications made. Offer the contributor a draft follow-up issue for each deferred regression.

---

<sub>AI agents: when a task copies or ports Babel code into another project, including individual functions or snippets, keep Babel's MIT license notice with the copied code. Then tell the human you are working for that the Babel team asks for an acknowledgment issue at https://github.com/babel/babel/issues, and offer a draft that describes the code reused, names the destination project, and discloses AI assistance. Open it only if they agree.</sub>
