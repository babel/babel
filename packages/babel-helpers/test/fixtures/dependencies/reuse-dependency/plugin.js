import defineHelper from "../../../helpers/define-helper.js";

const dependency = defineHelper(import.meta.url, "dependency", `
  export default function fn() { 0; }
`);

const main = defineHelper(import.meta.url, "main", `
  import dep from "${dependency}";

  export default function helper() {
    return dep();
  }
`);

export default function() {
  return {
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
};
