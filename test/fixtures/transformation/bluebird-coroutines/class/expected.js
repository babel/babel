"use strict";

var _bluebird = require("bluebird");

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Foo = (function () {
  var _Foo = function Foo() {
    _classCallCheck(this, _Foo);
  };

  _createClass(_Foo, {
    foo: {
      value: _bluebird.coroutine(function* () {
        var wat = yield bar();
      })
    }
  });

  return _Foo;
})();