import defineHelper from "../../../helpers/define-helper.js";

export default function(babel) {
  const dependencyDeep = defineHelper(babel, import.meta.url, "dependencyDeep", `
    export default function fn() {}
  `)

  const dependency = defineHelper(babel, import.meta.url, "dependency", `
    import f from "${dependencyDeep}";
    export default function fn() { return f; }
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
        if (path.node.name !== "REPLACE_ME") return;
        const helper = this.addHelper(main);
        path.replaceWith(helper);
      },
    },
  };
};
