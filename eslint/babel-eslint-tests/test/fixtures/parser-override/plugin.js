const parser = require("@babel/parser");

module.exports = function () {
  return {
    parserOverride(code, opts) {
      return parser.parse(`foo;`, opts);
    },
  };
};
