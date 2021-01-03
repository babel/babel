const defineHelper = require("../../../helpers/define-helper").default;

const main = defineHelper(__dirname, "main", `
  export default function helper() {}
`);

module.exports = function() {
  return {
    visitor: {
      Identifier(path) {
        console.log("ENTER!", path.find(p => p.isProgram()).toString());
        if (path.node.name !== "REPLACE_ME") {
          if (path.hub) {
            path.node.name += "_hub_is_found";
          }
          console.log("EXIT!", path.find(p => p.isProgram()).toString());
          return;
        }
        const helper = this.addHelper(main);
        console.log("REPLACE!", path.find(p => p.isProgram()).toString());
        path.replaceWith(helper);
        console.log("EXIT!", path.find(p => p.isProgram()).toString());
      },
    },
  };
};
