const defineHelper = require("../../../helpers/define-helper").default;

const dependency = defineHelper("dependency", `
  export default function fn() {
    return Promise;
  }
`);

const main = defineHelper("main", `
  import dep from "${dependency}";

  export default function helper() {
    return dep() || Promise;
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
