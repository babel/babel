import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";

export interface Options {
  helperVersion?: string;
  allowlist?: false | string[];
}

export default declare((api, options: Options) => {
  api.assertVersion(REQUIRED_VERSION(7));

  if (Object.hasOwn(options, "whitelist")) {
    throw new Error(
      "The 'whitelist' option has been renamed to 'allowlist'. " +
        "Please update your configuration.",
    );
  }

  const { helperVersion = "7.0.0-beta.0", allowlist = false } = options;

  if (
    allowlist !== false &&
    (!Array.isArray(allowlist) || allowlist.some(w => typeof w !== "string"))
  ) {
    throw new Error(
      ".allowlist must be undefined, false, or an array of strings",
    );
  }

  const helperAllowlist = allowlist ? new Set(allowlist) : null;

  return {
    name: "external-helpers",
    pre(file) {
      file.set("helperGenerator", (name: string) => {
        // If the helper didn't exist yet at the version given, we bail
        // out and let Babel either insert it directly, or throw an error
        // so that plugins can handle that case properly.
        if (
          file.availableHelper &&
          !file.availableHelper(name, helperVersion)
        ) {
          return;
        }

        // babelCore.buildExternalHelpers() allows an allowlist of helpers
        // that will be inserted into the external helpers list. That same
        // allowlist should be passed into the plugin here in that case, so
        // that we can avoid referencing 'babelHelpers.XX' when the helper
        // does not exist.
        if (helperAllowlist && !helperAllowlist.has(name)) return;

        return t.memberExpression(
          t.identifier("babelHelpers"),
          t.identifier(name),
        );
      });
    },
  };
});
