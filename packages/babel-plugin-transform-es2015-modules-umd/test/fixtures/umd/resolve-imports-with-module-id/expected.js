(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('MyLib', ['non/relative', './down/the-rabbit-hole/we/go', './baz/../fizzbuzz', '../../../bar'], factory);
  } else if (typeof exports !== "undefined") {
    factory(require('non/relative'), require('./down/the-rabbit-hole/we/go'), require('./baz/../fizzbuzz'), require('../../../bar'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.nonRelative, global.MyLibDownTheRabbitHoleWeGo, global.MyLibFizzbuzz, global.MyLibBar);
    global.MyLib = mod.exports;
  }
})(this, function (_relative, _go, _fizzbuzz, _bar) {
  'use strict';

  var _relative2 = babelHelpers.interopRequireDefault(_relative);

  var _go2 = babelHelpers.interopRequireDefault(_go);

  var _bar2 = babelHelpers.interopRequireDefault(_bar);
});