import { declare } from "@babel/helper-plugin-utils";

export default declare((api, { proposal }) => {
  return {
    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push(["patternMatching", { proposal }]);
    },
  };
});
