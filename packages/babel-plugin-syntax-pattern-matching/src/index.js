import { declare } from "@babel/helper-plugin-utils";

export default declare((api, { proposal }) => {
  return {
    name: "syntax-pattern-matching",
    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push(["patternMatching", { proposal }]);
    },
  };
});
