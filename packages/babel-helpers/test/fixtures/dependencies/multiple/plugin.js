import defineHelper from "../../../helpers/define-helper.js";

const dependency1 = defineHelper(import.meta.url, "dependency1", `
  export default function fn() { 0; }
`);

const dependency2 = defineHelper(import.meta.url, "dependency2", `
  export default function fn() { 1; }
`);

const main = defineHelper(import.meta.url, "main", `
  import dep1 from "${dependency1}";
  import dep2 from "${dependency2}";

  export default function helper() {
    return dep1() + dep2();
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
