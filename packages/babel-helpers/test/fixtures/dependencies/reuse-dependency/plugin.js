const defineHelper = require("../../../helpers/define-helper").default;

const dependency = defineHelper(__dirname, "dependency", `
  export default function fn() { 0; }
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
      if (path.node.name === "REPLACE_ME_1") {
        const mainHelper = this.addHelper(main);
        path.replaceWith(mainHelper);
      } else if (path.node.name === "REPLACE_ME_2") {
        const dependencyHelper = this.addHelper(dependency);
        path.replaceWith(dependencyHelper);
      }
    },
  },
};
