const defineHelper = require("../../../helpers/define-helper").default;

const dependency = defineHelper(__dirname, "dependency", `
  export default function fn() {}
`);

const main = defineHelper(__dirname, "main", `
  import dep from "${dependency}";

  export default function helper() {
    return dep();
  }
`);

module.exports = {
  visitor: {
    Identifier(path) {
      if (path.node.name !== "REPLACE_ME") return;
      const helper = this.addHelper(main);
      path.replaceWith(helper);
    },
  },
};
