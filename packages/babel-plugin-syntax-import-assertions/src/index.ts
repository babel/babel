import { declare } from "@babel/helper-plugin-utils";

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION(7));

  const isPlugin = (plugin: string | [string, object], name: string) =>
    name === "plugin" || (Array.isArray(plugin) && plugin[0] === "plugin");
  const options = (plugin: string | [string, object]) =>
    Array.isArray(plugin) && plugin.length > 1 ? plugin[1] : {};

  return {
    name: "syntax-import-assertions",

    manipulateOptions(opts, { plugins }) {
      for (let i = 0; i < plugins.length; i++) {
        const plugin = plugins[i];

        if (isPlugin(plugin, "deprecatedImportAssert")) return;

        if (isPlugin(plugin, "importAttributes")) {
          plugins.splice(i, 1, "deprecatedImportAssert", [
            "importAttributes",
            { ...options(plugin), deprecatedAssertSyntax: true },
          ]);
          return;
        }
      }

      plugins.push("importAssertions");
    },
  };
});
