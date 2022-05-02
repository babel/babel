import { declare } from "@babel/helper-plugin-utils";

export default declare(api => {
  api.assertVersion(7);

  return {
    name: "syntax-jsx",

    manipulateOptions(opts, parserOpts) {
      const { plugins } = parserOpts;
      // If the Typescript plugin already ran, it will have decided whether
      // or not this is a TSX file.
      if (plugins.some(p => (Array.isArray(p) ? p[0] : p) === "typescript")) {
        return;
      }

      plugins.push("jsx");
    },
  };
});
