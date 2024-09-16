import { declare } from "@babel/helper-plugin-utils";

export interface Options {
  all?: boolean;
}

export default declare((api, options: Options) => {
  api.assertVersion(REQUIRED_VERSION(7));

  // When enabled and plugins includes flow, all files should be parsed as if
  // the @flow pragma was provided.
  // @ts-expect-error Babel 7
  const { all, enums } = options;

  if (typeof all !== "boolean" && all !== undefined) {
    throw new Error(".all must be a boolean, or undefined");
  }

  if (process.env.BABEL_8_BREAKING) {
    if (enums !== undefined) {
      throw new Error(
        "The .enums option has been removed and it's now always enabled. Please remove it from your config.",
      );
    }
  } else {
    if (enums === false) {
      console.warn(
        "The .enums option has been removed and it's now always enabled.",
      );
    }
  }

  return {
    name: "syntax-flow",

    manipulateOptions(opts, parserOpts) {
      if (!process.env.BABEL_8_BREAKING) {
        // If the file has already enabled TS, assume that this is not a
        // valid Flowtype file.
        if (
          parserOpts.plugins.some(
            p => (Array.isArray(p) ? p[0] : p) === "typescript",
          )
        ) {
          return;
        }
      }

      if (process.env.BABEL_8_BREAKING) {
        parserOpts.plugins.push(["flow", { all }]);
      } else {
        // @ts-expect-error Babel 7
        parserOpts.plugins.push(["flow", { all, enums }]);
      }
    },
  };
});
