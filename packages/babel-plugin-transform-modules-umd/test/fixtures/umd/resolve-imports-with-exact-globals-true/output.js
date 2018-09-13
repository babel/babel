(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["non/relative", "./down/the-rabbit-hole/we/go", "./baz/../fizzbuzz", "../../../bar"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("non/relative"), require("./down/the-rabbit-hole/we/go"), require("./baz/../fizzbuzz"), require("../../../bar"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.nonRelative, global.umdResolveImportsWithExactGlobalsTrueDownTheRabbitHoleWeGo, global.umdResolveImportsWithExactGlobalsTrueFizzbuzz, global.umdBar);
    global.input = mod.exports;
  }
})(this, function (_relative, _go, _fizzbuzz, _bar) {
  "use strict";

  _relative = babelHelpers.interopRequireDefault(_relative);
  _go = babelHelpers.interopRequireDefault(_go);
  _bar = babelHelpers.interopRequireDefault(_bar);
});