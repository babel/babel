import { declare } from "@babel/helper-plugin-utils";

const VERSIONS = ["2018-07"] as const;
export interface Options {
  version: (typeof VERSIONS)[number];
}

export default declare((api, options: Options) => {
  api.assertVersion(REQUIRED_VERSION("^7.0.0-0 || ^8.0.0"));
  const { version } = options ?? {};

  if (typeof version !== "string" || !VERSIONS.includes(version)) {
    throw new Error(
      `The partial application plugin requires a "version" option. ` +
        `"version" must be one of: ${VERSIONS.join(", ")}.`,
    );
  }

  return {
    name: "syntax-partial-application",

    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push(["partialApplication", { version }]);
    },
  };
});
