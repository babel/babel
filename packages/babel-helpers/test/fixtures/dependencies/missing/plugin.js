const defineHelper = require("../../../helpers/define-helper").default;

const main = defineHelper("main", `
  import dep from "(!!!)%-..a,4892 missing";

  export default function helper() {
    return dep();
  }
`);

module.exports = {
  visitor: {
    Identifier(path) {
      if (path.node.name !== "REPLACE_ME") return;
      const helper = this.addHelper(main);
      path.replaceWith(helper);
    },
  },
};
