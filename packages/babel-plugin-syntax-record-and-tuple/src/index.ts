import { declare } from "@babel/helper-plugin-utils";

export interface Options {
  syntaxType: "hash" | "bar";
}

export default declare((api, options: Options) => {
  api.assertVersion(REQUIRED_VERSION(7));
  if (process.env.BABEL_8_BREAKING) {
    if (options.syntaxType === "bar") {
      throw new Error(
        '@babel/plugin-proposal-record-and-tuple: The syntaxType option is no longer supported. Please remove { syntaxType: "bar" } from your Babel config and migrate to the hash syntax #{} and #[].',
      );
    } else if (options.syntaxType === "hash") {
      throw new Error(
        '@babel/plugin-proposal-record-and-tuple: The syntaxType option is no longer supported. You can safely remove { syntaxType: "hash" } from your Babel config.',
      );
    }
  }

  return {
    name: "syntax-record-and-tuple",

    manipulateOptions(opts, parserOpts) {
      if (process.env.BABEL_8_BREAKING) {
        parserOpts.plugins.push("recordAndTuple");
      } else {
        opts.generatorOpts.recordAndTupleSyntaxType = options.syntaxType;

        parserOpts.plugins.push([
          "recordAndTuple",
          { syntaxType: options.syntaxType },
        ]);
      }
    },
  };
});
