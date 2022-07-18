import defineHelper from "../../../helpers/define-helper.js";

const dependency = defineHelper(import.meta.url, "dependency", `
  export default function fn() {}
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
