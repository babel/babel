import defineHelper from "../../../helpers/define-helper.js";

const main = defineHelper(import.meta.url, "main", `
  export default function helper() {}
`);

export default function() {
  return {
    visitor: {
      Identifier(path) {
        if (path.node.name !== "REPLACE_ME") {
          if (path.hub) {
            path.node.name += "_hub_is_found";
          }
          return;
        }
        const helper = this.addHelper(main);
        path.replaceWith(helper);
      },
    },
  };
};
