const defineHelper = require("../../../helpers/define-helper").default;

const dependencyDeep = defineHelper("dependencyDeep", `
  export default function fn() {}
`)

const dependency = defineHelper("dependency", `
  import f from "${dependencyDeep}";
  export default function fn() { return f; }
`);

const main = defineHelper("main", `
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
