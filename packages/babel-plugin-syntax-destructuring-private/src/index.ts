import { declare } from "@babel/helper-plugin-utils";

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION("^7.0.0-0 || ^8.0.0"));

  return {
    name: "syntax-destructuring-private",

    manipulateOptions(_, parserOpts) {
      parserOpts.plugins.push("destructuringPrivate");
    },
  };
});
