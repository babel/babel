var bind = require("core-js-pure/features/function/virtual/bind");
var FunctionPrototype = Function.prototype;

module.exports = function (it) {
  var own = it.bind;
  return (own === FunctionPrototype.bind && it instanceof Function) ? bind : own;
};
