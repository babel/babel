// @ts-check
/// <reference lib="es2015" />

/**
 * @typedef {import('@yarnpkg/types').Yarn.Constraints.Context} Context
 * */

const babel7plugins_babel8core = new Set(
  require("./test/babel-7-8-compat/data.json")["babel7plugins-babel8core"]
);

/**
 * Enforces that all workspaces depend on other workspaces using `workspace:^`
 *
gen_enforced_dependency(WorkspaceCwd, DependencyIdent, 'workspace:^', DependencyType) :-
  workspace_has_dependency(WorkspaceCwd, DependencyIdent, DependencyRange, DependencyType),
  % Only consider dependency ranges that start with 'workspace:'
  atom_concat('workspace:', _, DependencyRange),
  % Only consider 'dependencies' and 'devDependencies'
  (DependencyType = 'dependencies'; DependencyType = 'devDependencies').
 * @param {Context} context
 */
function enforceWorkspaceDependencies({ Yarn }) {
  for (const dependency of Yarn.dependencies()) {
    if (
      dependency.type === "dependencies" ||
      dependency.type === "devDependencies"
    ) {
      if (/^workspace:(?!\^$)/.test(dependency.range)) {
        dependency.update("workspace:^");
      }
    }
  }
}

/**
 * @param {Context} context
 */
function enforcePackageInfo({ Yarn }) {
  for (const workspace of Yarn.workspaces()) {
    const info = {
      license: "MIT",
      repository: {
        type: "git",
        url: "https://github.com/babel/babel.git",
        directory: workspace.cwd,
      },
      publishConfig: {
        access: "public",
      },
      author: "The Babel Team (https://babel.dev/team)",
    };

    for (const key of Object.keys(info)) {
      if (workspace.manifest.private) {
        workspace.unset(key);
      } else {
        workspace.set(key, info[key]);
      }
    }
  }
}

/**
 * Enforces the engines.node field for all workspaces
gen_enforced_field(WorkspaceCwd, 'engines.node', '>=6.9.0') :-
  \+ workspace_field(WorkspaceCwd, 'private', true),
  % Get the workspace name
  workspace_ident(WorkspaceCwd, WorkspaceIdent),
  % Exempt from the rule as it supports '>=6.0.0'. TODO: remove with the next major
  WorkspaceIdent \= '@babel/parser',
  % Skip '@babel/eslint*' workspaces. TODO: remove with the next major
  \+ atom_concat('@babel/eslint', _, WorkspaceIdent).

% Enforces the engines.node field for '@babel/eslint*' workspaces
gen_enforced_field(WorkspaceCwd, 'engines.node', "^20.19.0 || >=22.12.0") :-
  \+ workspace_field(WorkspaceCwd, 'private', true),
  % Get the workspace name
  workspace_ident(WorkspaceCwd, WorkspaceIdent),
  % Only target '@babel/eslint*' workspaces
  atom_concat('@babel/eslint', _, WorkspaceIdent).

% Removes the 'engines.node' field from private workspaces
gen_enforced_field(WorkspaceCwd, 'engines.node', null) :-
  workspace_field(WorkspaceCwd, 'private', true).
 * @param {Context} context
 */
function enforceEnginesNodeForPublicUnsetForPrivate({ Yarn }) {
  for (const workspace of Yarn.workspaces()) {
    if (workspace.manifest.private) {
      workspace.unset("engines.node");
    } else {
      workspace.set("engines.node", "^20.19.0 || >=22.12.0");
    }
  }
}

/**
 * Enforces the main and types field to start with ./
gen_enforced_field(WorkspaceCwd, FieldName, ExpectedValue) :-
  % Fields the rule applies to
  member(FieldName, ['main', 'types']),
  % Get current value
  workspace_field(WorkspaceCwd, FieldName, CurrentValue),
  % Must not start with ./ already
  \+ atom_concat('./', _, CurrentValue),
  % Store './' + CurrentValue in ExpectedValue
  atom_concat('./', CurrentValue, ExpectedValue).
 * @param {Context} context
 */
function enforceMainAndTypes({ Yarn }) {
  for (const workspace of Yarn.workspaces()) {
    const { main: currentMain, types: currentTypes } = workspace.manifest;
    if (currentMain && !currentMain.startsWith("./")) {
      workspace.set("main", "./" + currentMain);
    }
    if (currentTypes && !currentTypes?.startsWith("./")) {
      workspace.set("types", "./" + currentTypes);
    }
  }
}

/**
 * Enforces the type field to be set
gen_enforced_field(WorkspaceCwd, 'type', 'commonjs') :-
  \+ workspace_field(WorkspaceCwd, 'type', 'module').
 * @param {Context} context
 */
function enforceType({ Yarn }) {
  for (const workspace of Yarn.workspaces()) {
    if (!workspace.manifest.private && workspace.manifest.type !== "commonjs") {
      workspace.set("type", "module");
    }
  }
}

/**
 * Enforces that @babel/runtime-corejs2 must depend on core-js 2
gen_enforced_dependency(WorkspaceCwd, 'core-js', '^2.6.12', 'dependencies') :-
  % Get the workspace name
  % The rule works for @babel/runtime-corejs2 only
  workspace_ident(WorkspaceCwd, '@babel/runtime-corejs2').
 * @param {Context} context
 */
function enforceRuntimeCorejs2DependsOnCorejs2({ Yarn }) {
  const workspace =
    Yarn.workspace({ ident: "@babel/runtime-corejs2" }) ?? undefined;
  const dep = Yarn.dependency({ workspace, ident: "core-js" });
  if (dep === null) {
    workspace?.error("@babel/runtime-corejs2 must depend on core-js");
    return;
  }
  dep.update("^2.6.12");
}

/**
 * Enforces that a dependency doesn't appear in both `dependencies` and `devDependencies`
gen_enforced_dependency(WorkspaceCwd, DependencyIdent, null, 'devDependencies') :-
  workspace_has_dependency(WorkspaceCwd, DependencyIdent, _, 'devDependencies'),
  workspace_has_dependency(WorkspaceCwd, DependencyIdent, _, 'dependencies').
 * @param {Context} context
 */
function enforceNoDualTypeDependencies({ Yarn }) {
  for (const dependency of Yarn.dependencies({ type: "devDependencies" })) {
    const otherDependency = Yarn.dependency({
      workspace: dependency.workspace,
      ident: dependency.ident,
      type: "dependencies",
    });
    if (
      otherDependency !== null &&
      !otherDependency.range.includes("condition:")
    ) {
      dependency.delete();
    }
  }
}

/**
 * Enforces that @babel/helper-* must not depend on @babel/traverse, @babel/template, @babel/types if they peer-depend on @babel/core
gen_enforced_dependency(WorkspaceCwd, DependencyIdent, null, 'dependencies') :-
  % Get the workspace name
  workspace_ident(WorkspaceCwd, WorkspaceIdent),
  atom_concat('@babel/helper-', _, WorkspaceIdent),
  workspace_has_dependency(WorkspaceCwd, '@babel/core', _, 'peerDependencies'),
  member(DependencyIdent, ['@babel/template', '@babel/traverse', '@babel/types']).
 * @param {Context} context
 */
function enforceBabelHelperBabelDeps({ Yarn }) {
  for (const workspace of Yarn.workspaces()) {
    if (workspace.ident?.startsWith("@babel/helper-")) {
      if (workspace.pkg.peerDependencies.has("@babel/core")) {
        workspace.unset("dependencies['@babel/template']");
        workspace.unset("dependencies['@babel/types']");
        // TODO: Consider re-enforcing this in Babel 8
        // workspace.unset("dependencies['@babel/traverse']");
      }
    }
  }
}

/**
 * Enforces that @babel/core must not be in dependency for most packages
gen_enforced_dependency(WorkspaceCwd, '@babel/core', null, 'dependencies') :-
  % Get the workspace name
  workspace_ident(WorkspaceCwd, WorkspaceIdent),
  % Exclude some packages
  \+ member(WorkspaceIdent, ['@babel/eslint-shared-fixtures', '@babel/eslint-tests', '@babel/helper-transform-fixture-test-runner']).

 * Enforces that @babel/core should be in devDependencies if a package peer-depends on @babel/core and it does not list @babel/core in dependencies. Doing so will ensure that they are linked to an ESM @babel/core build in the e2e ESM tests.
gen_enforced_dependency(WorkspaceCwd, '@babel/core', 'workspace:^', 'devDependencies') :-
  workspace_has_dependency(WorkspaceCwd, '@babel/core', _, 'peerDependencies'),
  \+ workspace_has_dependency(WorkspaceCwd, '@babel/core', _, 'dependencies').

 * @param {Context} context
 */
function enforceBabelCoreNotInDeps({ Yarn }) {
  for (const workspace of Yarn.workspaces()) {
    if (
      workspace.pkg.peerDependencies.has("@babel/core") &&
      !workspace.manifest.dependencies?.["@babel/core"]
    ) {
      workspace.set("devDependencies['@babel/core']", "workspace:^");
    }
    if (
      workspace.ident !== null &&
      [
        "@babel/eslint-shared-fixtures",
        "@babel/eslint-tests",
        "@babel/helper-transform-fixture-test-runner",
      ].includes(workspace.ident)
    ) {
      continue;
    }
    workspace.unset("dependencies['@babel/core']");
  }
}

/**
 * Enforces `exports` to be consistent
 *
gen_enforced_field(WorkspaceCwd, 'exports', '{ ".": "./lib/index.js", "./package.json": "./package.json" }') :-
  \+ workspace_field(WorkspaceCwd, 'private', true),
  % Exclude packages with more complex `exports`
  workspace_ident(WorkspaceCwd, WorkspaceIdent),
  WorkspaceIdent \= '@babel/compat-data',
  WorkspaceIdent \= '@babel/helper-plugin-test-runner', % TODO: Remove in Babel 8
  WorkspaceIdent \= '@babel/core', % TODO: Remove in Babel 8
  WorkspaceIdent \= '@babel/parser',
  WorkspaceIdent \= '@babel/plugin-transform-react-jsx', % TODO: Remove in Babel 8
  WorkspaceIdent \= '@babel/standalone',
  WorkspaceIdent \= '@babel/types', % @babel/types has types exports
  \+ atom_concat('@babel/eslint-', _, WorkspaceIdent),
  \+ atom_concat('@babel/runtime', _, WorkspaceIdent).
 * @param {Context} context
 */
function enforceExports({ Yarn }) {
  for (const workspace of Yarn.workspaces()) {
    if (workspace.manifest.private) continue;
    // Exclude packages with more complex `exports`
    const packageName = workspace.pkg.ident;
    if (
      [
        "@babel/compat-data",
        "@babel/helper-globals",
        "@babel/helper-plugin-test-runner", // TODO: Remove in Babel 8
        "@babel/plugin-transform-react-jsx", // TODO: Remove in Babel 8
        "@babel/standalone",
        "@babel/types", // @babel/types has types exports
        "@babel/register", // index.cjs
      ].includes(packageName) ||
      packageName.startsWith("@babel/eslint-") ||
      packageName.startsWith("@babel/runtime")
    ) {
      continue;
    }

    workspace.set("exports", {
      ".": {
        types: "./lib/index.d.ts",
        default: "./lib/index.js",
      },
      "./package.json": "./package.json",
    });
  }
}

/**
 * Enforces the @babel/core version for compatibility with Babel 7 and 8
 * @param {Context} context
 * @param {string} version
 */
function enforceBabelCoreVersionFor78Compat({ Yarn }, version) {
  for (const workspace of Yarn.workspaces()) {
    if (workspace.cwd === ".") {
      workspace.set("devDependencies['@babel/core']", version);
    } else if (
      workspace.ident === "@babel/helper-transform-fixture-test-runner"
    ) {
      workspace.set("dependencies['@babel/core']", version);
    } else if (
      workspace.ident &&
      babel7plugins_babel8core.has(workspace.ident.replace("@babel/", "babel-"))
    ) {
      workspace.set("devDependencies['@babel/core']", version);
    }
  }
}

/**
 * @type {import('@yarnpkg/types').Yarn.Config}
 */
module.exports = {
  constraints: async ctx => {
    enforceWorkspaceDependencies(ctx);
    enforcePackageInfo(ctx);
    enforceEnginesNodeForPublicUnsetForPrivate(ctx);
    enforceMainAndTypes(ctx);
    enforceType(ctx);
    enforceExports(ctx);
    enforceNoDualTypeDependencies(ctx);
    enforceRuntimeCorejs2DependsOnCorejs2(ctx);
    enforceBabelHelperBabelDeps(ctx);
    if (process.env.BABEL_CORE_DEV_DEP_VERSION) {
      enforceBabelCoreVersionFor78Compat(
        ctx,
        process.env.BABEL_CORE_DEV_DEP_VERSION
      );
    } else {
      enforceBabelCoreNotInDeps(ctx);
    }
  },
};
