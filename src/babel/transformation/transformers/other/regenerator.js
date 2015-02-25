var regenerator = require("regenerator-babel");
var t           = require("../../../types");

exports.check = function (node) {
  return t.isFunction(node) && (node.async || node.generator);
};

exports.Program = {
  enter(ast) {
    regenerator.transform(ast);
    this.stop();
  }
};
