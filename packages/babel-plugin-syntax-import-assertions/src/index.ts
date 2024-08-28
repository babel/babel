import { declare } from "@babel/helper-plugin-utils";

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION(7));

  return {
    name: "syntax-import-assertions",

    manipulateOptions(opts, { plugins }) {
      for (let i = 0; i < plugins.length; i++) {
        const plugin = plugins[i];
        if (plugin === "importAttributes") {
          plugins[i] = ["importAttributes", { deprecatedAssertSyntax: true }];
          return;
        }
        if (Array.isArray(plugin) && plugin[0] === "importAttributes") {
          if (plugin.length < 2) (plugins[i] as any[]).push({});
          plugin[1].deprecatedAssertSyntax = true;
          return;
        }
      }
      plugins.push("importAssertions");
    },
  };
});
