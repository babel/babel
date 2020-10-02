// prettier-ignore
module.exports = ({ types: t, template }) => ({
  visitor: {
    Program: {
      exit(path) {
        path.unshiftContainer(
          "body",
          template.ast`Symbol.asyncIterator = require("core-js-pure/es/symbol/async-iterator.js");`
        );
      }
    }
  }
});
