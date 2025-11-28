import { declare } from "@babel/helper-plugin-utils";

export interface Options {
  all?: boolean;
}

export default declare((api, options: Options) => {
  api.assertVersion(REQUIRED_VERSION("^7.0.0-0 || ^8.0.0-0"));

  // When enabled and plugins includes flow, all files should be parsed as if
  // the @flow pragma was provided.
  // @ts-expect-error Babel 7
  const { all, enums } = options;

  if (typeof all !== "boolean" && all !== undefined) {
    throw new Error(".all must be a boolean, or undefined");
  }

  if (enums !== undefined) {
    throw new Error(
      "The .enums option has been removed and it's now always enabled. Please remove it from your config.",
    );
  }

  return {
    name: "syntax-flow",

    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push(["flow", { all }]);
    },
  };
});
