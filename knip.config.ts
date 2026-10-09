import type { KnipConfig, WorkspaceProjectConfig } from "knip";
import { globSync } from "node:fs";

function defaultWorkspaceConfig() {
  return {
    entry: ["src/index.{js,ts}"],
    project: ["**/*.{js,ts,cts,mts}", "!test/*/**"],
  };
}

const config: KnipConfig = {
  ignoreWorkspaces: [
    ".",
    "benchmark",
    "codemods/*",
    "test/**",
    "packages/babel-runtime",
    "packages/babel-runtime-corejs3",
    "packages/babel-helper-globals",
    "packages/babel-compat-data",
    "eslint/babel-eslint-plugin-development-internal",
    "eslint/babel-eslint-shared-fixtures",
    "eslint/babel-eslint-tests",
  ],
  ignore: [
    "packages/*/test/*.tst.ts",
    "packages/babel-helpers/src/helpers/**",
    "packages/babel-standalone/src/*-shim.ts",
    "packages/babel-standalone/examples/**/*",
    "packages/babel-helper-transform-fixture-test-runner/src/babel-helpers-in-memory.ts",
    "packages/babel-helper-transform-fixture-test-runner/src/exit-loader.cts",
    "packages/babel-parser/typings/*",
  ],
  workspaces: {},
};

const pkgs = globSync("{packages,eslint}/*");
for (let pkg of pkgs) {
  pkg = pkg.replace(/\\/g, "/");
  if (config.ignoreWorkspaces!.includes(pkg)) continue;
  const workspaceConfig: WorkspaceProjectConfig = {
    ...defaultWorkspaceConfig(),
  };
  switch (pkg) {
    case "packages/babel-node":
      workspaceConfig.entry = ["src/_babel-node.ts", "src/babel-node.ts"];
      workspaceConfig.project = ["**/*.{js,ts,cts,mts}", "!test/fixtures/**"];
      break;
    case "packages/babel-cli":
      workspaceConfig.entry = ["src/babel/index.ts"];
      break;
    case "packages/babel-build-external-helpers":
      workspaceConfig.entry = ["src/babel-build-external-helpers.ts"];
      break;
    case "packages/babel-code-frame":
      workspaceConfig.entry = ["src/index.ts", "src/browser.ts"];
      break;
    case "eslint/babel-eslint-parser":
      workspaceConfig.entry = ["src/index.ts", "src/worker/index.ts"];
      break;
  }
  const entry = workspaceConfig.entry as string[];
  if (globSync(`${pkg}/test/*.js`).length) {
    entry.push("test/*.js");
  }
  if (globSync(`${pkg}/test/batch-test-runner/*.js`).length) {
    entry.push("test/batch-test-runner/*.js");
  }
  if (globSync(`${pkg}/scripts/*`).length) {
    entry.push("scripts/**/*");
  }
  config.workspaces![pkg] = workspaceConfig;
}

export default config;
