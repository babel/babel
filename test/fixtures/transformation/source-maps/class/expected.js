"use strict";

var _createClass = (function () { function defineProperties(target, props) { var keys = Object.getOwnPropertyNames(props).concat(Object.getOwnPropertySymbols(props)); for (var i = 0, count = keys.length; i < count; ++i) { var prop = props[keys[i]]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Test = (function () {
  function Test() {
    _classCallCheck(this, Test);
  }

  _createClass(Test, {
    bar: {
      get: function () {
        throw new Error("wow");
      }
    }
  });

  return Test;
})();

var test = new Test();
test.bar;

