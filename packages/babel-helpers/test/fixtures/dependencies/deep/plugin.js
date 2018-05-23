const defineHelper = require("../../../helpers/define-helper").default;

const dependencyDeep = defineHelper(__dirname, "dependencyDeep", `
  export default function fn() {}
`)

const dependency = defineHelper(__dirname, "dependency", `
  import f from "${dependencyDeep}";
  export default function fn() { return f; }
`);

const main = defineHelper(__dirname, "main", `
  import dep from "${dependency}";

  export default function helper() {
    return dep();
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
