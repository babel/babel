import { declare } from "@babel/helper-plugin-utils";

export default declare((api, options) => {
  api.assertVersion(7);

  return {
    name: "syntax-record-and-tuple",

    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push([
        "recordAndTuple",
        {
          hash: options.hash,
          bar: options.bar,
        },
      ]);
    },
  };
});
