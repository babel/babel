import defineHelper from "../../../helpers/define-helper.js";

export default function(babel) {
  const dependency = defineHelper(babel, import.meta.url, "dependency", `
    export default function fn() {
      return Promise;
    }
  `);

  const main = defineHelper(babel, import.meta.url, "main", `
    import dep from "${dependency}";

    export default function helper() {
      return dep() || Promise;
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
