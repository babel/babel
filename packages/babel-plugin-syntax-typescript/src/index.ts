import { declare } from "@babel/helper-plugin-utils";

export interface Options {
  disallowAmbiguousJSXLike?: boolean;
  dts?: boolean;
  isTSX?: boolean;
}

export default declare((api, opts: Options) => {
  api.assertVersion(REQUIRED_VERSION("^7.0.0-0 || ^8.0.0-0"));

  const { disallowAmbiguousJSXLike, dts } = opts;

  return {
    name: "syntax-typescript",

    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push([
        "typescript",
        { disallowAmbiguousJSXLike, dts },
      ]);
    },
  };
});
