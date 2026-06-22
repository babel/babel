// @ts-check
/// <reference lib="es2015" types="node" />

/**
 * @typedef {import('@yarnpkg/types').Yarn.Constraints.Context} Context
 * */

const babel7plugins_babel8core = new Set(
  require("./test/babel-7-8-compat/data.json")["babel7plugins-babel8core"]
);

/**
 * Enforces that all workspaces depend on other workspaces using `workspace:^`
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
 * @param {Context} context
 */
function enforceEnginesNodeForPublicUnsetForPrivate({ Yarn }) {
  for (const workspace of Yarn.workspaces()) {
    if (
      workspace.manifest.private ||
      workspace.ident?.startsWith("@babel/runtime")
    ) {
      workspace.unset("engines.node");
    } else {
      workspace.set("engines.node", "^22.18.0 || >=24.11.0");
    }
  }
}

/**
 * Enforces the main and types field to start with ./
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
 * Enforces that a dependency doesn't appear in both `dependencies` and `devDependencies`
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
 * Enforces `exports` to be consistent, and ensures that `./package.json` is always exported for public packages.
 * Also enforces `types` is unset in favor of the `exports` field for type exports.
 * @param {Context} context
 */
function enforceExportsAndTypes({ Yarn }) {
  for (const workspace of Yarn.workspaces()) {
    if (workspace.manifest.private) continue;
    // Exclude packages with more complex `exports`
    const packageName = workspace.pkg.ident;
    if (
      [
        "@babel/compat-data", // JSON library
        "@babel/helper-globals", // JSON library
        "@babel/standalone", // No index.js entry point
        "@babel/node", // cli
        "@babel/build-external-helpers", // cli
        "@babel/cli", // cli
      ].includes(packageName) ||
      packageName.startsWith("@babel/runtime")
    ) {
      workspace.set("exports['./package.json']", "./package.json");
      continue;
    } else if (
      [
        "@babel/helper-plugin-test-runner", // Custom exports["."].esm
        "@babel/plugin-transform-react-jsx", // Extra entry points
        "@babel/code-frame", // Custom exports["."].browser
      ].includes(packageName)
    ) {
      workspace.set("exports['.'].default", "./lib/index.js");
      workspace.set("exports['.'].types", "./lib/index.d.ts");
      workspace.set("exports['./package.json']", "./package.json");
      workspace.unset("types");
      continue;
    }

    workspace.set("exports", {
      ".": {
        types: "./lib/index.d.ts",
        default: "./lib/index.js",
      },
      "./package.json": "./package.json",
    });
    workspace.unset("types");
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

function enforceBabelCorePeerDependencyVersion({ Yarn }) {
  for (const workspace of Yarn.workspaces()) {
    if (workspace.pkg.peerDependencies.has("@babel/core")) {
      workspace.set("peerDependencies['@babel/core']", "^8.0.0");
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
    enforceExportsAndTypes(ctx);
    enforceNoDualTypeDependencies(ctx);
    enforceBabelHelperBabelDeps(ctx);
    if (process.env.BABEL_CORE_DEV_DEP_VERSION) {
      enforceBabelCoreVersionFor78Compat(
        ctx,
        process.env.BABEL_CORE_DEV_DEP_VERSION
      );
    } else {
      enforceBabelCoreNotInDeps(ctx);
    }
    enforceBabelCorePeerDependencyVersion(ctx);
  },
};
