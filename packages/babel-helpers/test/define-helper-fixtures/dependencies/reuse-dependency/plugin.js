import defineHelper from "../../../helpers/define-helper.js";

export default function(babel) {
  const dependency = defineHelper(babel, import.meta.url, "dependency", `
    export default function fn() { 0; }
  `);

  const main = defineHelper(babel, import.meta.url, "main", `
    import dep from "${dependency}";

    export default function helper() {
      return dep();
    }
  `);

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
