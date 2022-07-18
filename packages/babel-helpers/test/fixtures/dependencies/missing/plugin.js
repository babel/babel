import defineHelper from "../../../helpers/define-helper.js";

const main = defineHelper(import.meta.url, "main", `
  import dep from "(!!!)%-..a,4892 missing";

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
