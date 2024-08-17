import { declare } from "@babel/helper-plugin-utils";

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION(7));

  return {
    name: "syntax-destructuring-private",

    manipulateOptions(_, parserOpts) {
      parserOpts.plugins.push("destructuringPrivate");
    },
  };
});
