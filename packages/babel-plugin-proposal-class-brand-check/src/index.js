import { declare } from "@babel/helper-plugin-utils";
console.log(2);
export default declare(api => {
  api.assertVersion(7);

  return {
    name: "proposal-class-brand-check",
    manipulateOptions(opts, parserOpts) {
      parserOpts.proposal.push("brand-check");
    },
    visitor: {
      Identifier(path) {
        console.log(1);
        if (path.node.name === "class") {
          console.log(path.node);
        }
      },
    },
  };
});
