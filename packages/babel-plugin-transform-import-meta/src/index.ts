import { declare } from "@babel/helper-plugin-utils";

const SUPPORTED_MODULES = new Set(["amd"]);

const MODULES_NOT_FOUND = `\
@babel/plugin-transform-import-meta depends on a modules
transform plugin. Supported plugins are:
 - @babel/plugin-transform-modules-amd ^7.27.0
`;

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION(7));

  return {
    name: "transform-import-meta",
    pre() {
      this.file.set(
        "@babel/plugin-transform-import-meta",
        PACKAGE_JSON.version,
      );
    },

    visitor: {
      Program() {
        const modules = this.file.get("@babel/plugin-transform-modules-*");

        if (!SUPPORTED_MODULES.has(modules)) {
          throw new Error(MODULES_NOT_FOUND);
        }
      },
    },
  };
});
