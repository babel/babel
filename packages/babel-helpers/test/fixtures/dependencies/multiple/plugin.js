const defineHelper = require("../../../helpers/define-helper").default;

const dependency1 = defineHelper("dependency1", `
  export default function fn() { 0; }
`);

const dependency2 = defineHelper("dependency2", `
  export default function fn() { 1; }
`);

const main = defineHelper("main", `
  import dep1 from "${dependency1}";
  import dep2 from "${dependency2}";

  export default function helper() {
    return dep1() + dep2();
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
