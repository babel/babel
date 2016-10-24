(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('umd/resolve-imports-with-module-name/expected', ['non/relative', './down/the-rabbit-hole/we/go', './baz/../fizzbuzz', '../../../bar'], factory);
  } else if (typeof exports !== "undefined") {
    factory(require('non/relative'), require('./down/the-rabbit-hole/we/go'), require('./baz/../fizzbuzz'), require('../../../bar'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.nonRelative, global.umdResolveImportsWithModuleNameDownTheRabbitHoleWeGo, global.umdResolveImportsWithModuleNameFizzbuzz, global.umdBar);
    global.umdResolveImportsWithModuleNameExpected = mod.exports;
  }
})(this, function (_relative, _go, _fizzbuzz, _bar) {
  'use strict';

  var _relative2 = babelHelpers.interopRequireDefault(_relative);

  var _go2 = babelHelpers.interopRequireDefault(_go);

  var _bar2 = babelHelpers.interopRequireDefault(_bar);
});