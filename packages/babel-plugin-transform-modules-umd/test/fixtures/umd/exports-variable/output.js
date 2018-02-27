(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.input = mod.exports;
  }
})(this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.foo8 = foo8;
  _exports.foo9 = _exports.foo7 = _exports.foo6 = _exports.foo5 = _exports.foo4 = _exports.foo3 = _exports.bar = _exports.foo2 = _exports.foo = void 0;
  var foo = 1;
  _exports.foo = foo;
  var foo2 = 1,
      bar = 2;
  _exports.bar = bar;
  _exports.foo2 = foo2;

  var foo3 = function () {};

  _exports.foo3 = foo3;
  var foo4;
  _exports.foo4 = foo4;
  let foo5 = 2;
  _exports.foo5 = foo5;
  let foo6;
  _exports.foo6 = foo6;
  const foo7 = 3;
  _exports.foo7 = foo7;

  function foo8() {}

  class foo9 {}

  _exports.foo9 = foo9;
});
