import { declare } from "@babel/helper-plugin-utils";

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION("^7.0.0-0 || ^8.0.0-0"));

  return {
    name: "syntax-jsx",

    manipulateOptions(opts, parserOpts) {
      if (!process.env.BABEL_8_BREAKING) {
        // If the Typescript plugin already ran, it will have decided whether
        // or not this is a TSX file.
        if (
          parserOpts.plugins.some(
            p => (Array.isArray(p) ? p[0] : p) === "typescript",
          )
        ) {
          return;
        }
      }

      parserOpts.plugins.push("jsx");
    },
  };
});
