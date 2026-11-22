// Load every published plugin and preset with the @babel/core version
// installed in the root package.json. Loading a plugin runs its
// api.assertVersion() check and validates its visitor against
// @babel/traverse, so this catches plugins that use node types or APIs that
// the installed @babel/core doesn't have.
//
// e2e-babel-old-version.sh installs the published packages under `e2e-*`
// aliases, so that they don't replace the workspace packages.

import fs from "node:fs";
import { loadOptionsAsync, version } from "@babel/core";

// Options that a plugin requires to load.
const pluginOptions = {
  "@babel/plugin-proposal-decorators": { version: "2023-11" },
  "@babel/plugin-syntax-decorators": { version: "2023-11" },
  "@babel/plugin-proposal-discard-binding": { syntaxType: "void" },
  "@babel/plugin-proposal-optional-chaining-assign": { version: "2023-07" },
  "@babel/plugin-syntax-optional-chaining-assign": { version: "2023-07" },
  "@babel/plugin-proposal-partial-application": { version: "2018-07" },
  "@babel/plugin-syntax-partial-application": { version: "2018-07" },
  "@babel/plugin-proposal-pipeline-operator": {
    proposal: "hack",
    topicToken: "^^",
  },
  "@babel/plugin-syntax-pipeline-operator": {
    proposal: "hack",
    topicToken: "^^",
  },
};

// Plugins that require a newer @babel/core than the installed one. They must
// throw BABEL_VERSION_UNSUPPORTED.
const requiresNewerCore = new Set([
  "@babel/plugin-proposal-filtered-namespaces",
]);

// Run from the root of the monorepo.
const { devDependencies } = JSON.parse(fs.readFileSync("package.json", "utf8"));

const failures = [];
let loaded = 0;
for (const [alias, spec] of Object.entries(devDependencies)) {
  if (!alias.startsWith("e2e-")) continue;
  const name = spec.replace(/^npm:/, "").replace(/@[^@]*$/, "");
  // `module:` stops Babel from adding a `babel-plugin-` or `babel-preset-`
  // prefix to the alias. It is resolved from the root, like the package.json.
  const item = [`module:${alias}`, pluginOptions[name] ?? {}];
  const isPreset = name.startsWith("@babel/preset-");

  let error;
  try {
    await loadOptionsAsync({
      configFile: false,
      babelrc: false,
      [isPreset ? "presets" : "plugins"]: [item],
    });
  } catch (e) {
    error = e;
  }

  if (requiresNewerCore.has(name)) {
    if (error?.code !== "BABEL_VERSION_UNSUPPORTED") {
      failures.push(
        `${name}: expected BABEL_VERSION_UNSUPPORTED with @babel/core ${version}, ` +
          (error ? `got ${error.stack}` : "but it loaded")
      );
    }
  } else if (error) {
    failures.push(`${name}: ${error.stack}`);
  } else {
    loaded++;
  }
}

console.log(
  `Loaded ${loaded} plugins and presets with @babel/core ${version}.`
);
if (failures.length) {
  console.error(failures.join("\n\n"));
  process.exitCode = 1;
}
