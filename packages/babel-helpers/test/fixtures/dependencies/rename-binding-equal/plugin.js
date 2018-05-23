const defineHelper = require("../../../helpers/define-helper").default;

const dependency = defineHelper(__dirname, "dependency", `
  let foo = "dependency";
  export default function fn() { return foo }
`);

const main = defineHelper(__dirname, "main", `
  import dep from "${dependency}";

  let foo = "main";

  export default function helper() {
    return dep() + foo;
  }
`);

module.exports = function() {
  return {
    visitor: {
      Identifier(path) {
        if (path.node.name !== "REPLACE_ME") return;
        const helper = this.addHelper(main);
        path.replaceWith(helper);
      },
    },
  };
};
