import fs from "fs";
import { fileURLToPath } from "url";

const standaloneURL = new URL("../packages/babel-standalone/", import.meta.url);
const inStandalone = path =>
  fileURLToPath(new URL(path, standaloneURL)).replace(/\\/g, "/");
const { noopPlugins, unexposedNoopPlugins } = JSON.parse(
  fs.readFileSync(new URL("./scripts/pluginConfig.json", standaloneURL), "utf8")
);

const pluginUtilsID = "@babel/helper-plugin-utils";

const generatedPluginsPath = inStandalone("./src/generated/plugins.ts");
const makeNoopPluginPath = inStandalone("./src/make-noop-plugin.ts");
const pluginUtilsShimPath = inStandalone("./src/plugin-utils-shim.ts");

const toCamel = str => str.replace(/-[a-z]/g, c => c[1].toUpperCase());

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
