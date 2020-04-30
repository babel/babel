const defineHelper = require("../../../helpers/define-helper").default;

const main = defineHelper(__dirname, "main", `
  export default function helper() {}
`);

module.exports = function() {
  return {
    visitor: {
      Identifier(path) {
        if (path.node.name !== "REPLACE_ME") {
          if (path.hub) {
            path.node.name += "_hub_is_found";
          }
          return;
        }
        const helper = this.addHelper(main);
        path.replaceWith(helper);
      },
    },
  };
};
