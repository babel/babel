/*
% Enforces `exports` to be consistent
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
*/

function enforcePackageExports({ Yarn }) {
  for (const workspace of Yarn.workspaces()) {
    if (workspace.manifest.private) continue;
    // Exclude packages with more complex `exports`
    const packageName = workspace.pkg.ident;
    if (
      [
        "@babel/compat-data",
        "@babel/helper-plugin-test-runner", // TODO: Remove in Babel 8
        "@babel/core", // TODO: Remove in Babel 8
        "@babel/parser",
        "@babel/plugin-transform-react-jsx", // TODO: Remove in Babel 8
        "@babel/standalone",
        "@babel/types", // @babel/types has types exports
      ].includes(packageName) ||
      packageName.startsWith("@babel/eslint-") ||
      packageName.startsWith("@babel/runtime")
    ) {
      continue;
    }

    const desiredExports = {
      ".": "./lib/index.js",
      "./package.json": "./package.json",
    };

    // TODO: Yarn 4 does not support object literal in constraints as it does in Yarn 3
    // remove this branch when Yarn 4 supports it
    if (
      JSON.stringify(workspace.manifest.exports) ===
      JSON.stringify(desiredExports)
    ) {
      continue;
    }
    workspace.set("exports", desiredExports);
  }
}

module.exports = {
  constraints: async ctx => {
    enforcePackageExports(ctx);
  },
};
