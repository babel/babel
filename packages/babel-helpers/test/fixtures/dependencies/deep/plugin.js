import defineHelper from "../../../helpers/define-helper.js";

const dependencyDeep = defineHelper(import.meta.url, "dependencyDeep", `
  export default function fn() {}
`)

const dependency = defineHelper(import.meta.url, "dependency", `
  import f from "${dependencyDeep}";
  export default function fn() { return f; }
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
        if (path.node.name !== "REPLACE_ME") return;
        const helper = this.addHelper(main);
        path.replaceWith(helper);
      },
    },
  };
};
