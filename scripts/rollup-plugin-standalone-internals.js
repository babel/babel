// @ts-check

import { fileURLToPath } from "node:url";
import pluginConfig from "../packages/babel-standalone/scripts/pluginConfig.json" with { type: "json" };

const standaloneURL = new URL("../packages/babel-standalone/", import.meta.url);
/**
 * Convert a file path to a @babel/standalone file path.
 * @param {string} path - The original file path.
 * @returns {string} - The @babel/standalone file path.
 */
const inStandalone = path =>
  fileURLToPath(new URL(path, standaloneURL)).replace(/\\/g, "/");
const { noopPlugins, unexposedNoopPlugins } = pluginConfig;

const pluginUtilsID = "@babel/helper-plugin-utils";

const generatedPluginsPath = inStandalone("./src/generated/plugins.ts");
const makeNoopPluginPath = inStandalone("./src/make-noop-plugin.ts");
const pluginUtilsShimPath = inStandalone("./src/plugin-utils-shim.ts");

/**
 * Convert a kebab-case string to camelCase.
 * @param {string} str - The kebab-case string.
 * @returns {string} - The camelCase string.
 */
const toCamel = str => str.replace(/-[a-z]/g, c => c[1].toUpperCase());

/**
 * @typedef {Map<string, string>} InternalPluginsMap
 * @type {InternalPluginsMap}
 * A map of internal plugins where the key is the plugin name and the value is the
 * code to be returned by the Rollup plugin.
 */
// @ts-expect-error TS does not recognize the dynamic nature of the map
const internalPlugins = new Map([
  ...noopPlugins.map(plugin => [
    `@babel/plugin-${plugin}`,
    `export { ${toCamel(plugin)} as default } from "${generatedPluginsPath}"`,
  ]),
  ...unexposedNoopPlugins.map(plugin => [
    `@babel/plugin-${plugin}`,
    `import makeNoopPlugin from "${makeNoopPluginPath}"; export default makeNoopPlugin()`,
  ]),
]);

/** * Rollup plugin to handle Babel standalone internals.
 * It resolves internal noop syntax-only plugins and provides a shim for
 * `@babel/helper-plugin-utils`.
 * @returns {import("rollup").Plugin} - The Rollup plugin.
 */
export default function () {
  return {
    name: "standalone-internals",
    load(id) {
      return internalPlugins.get(id) ?? null;
    },
    resolveId(specifier) {
      if (specifier === pluginUtilsID) return pluginUtilsShimPath;
      return internalPlugins.has(specifier) ? specifier : null;
    },
  };
}
