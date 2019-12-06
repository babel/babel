(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["@babel/runtime/helpers/classCallCheck", "@babel/runtime/helpers/createClass", "foo"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("@babel/runtime/helpers/classCallCheck"), require("@babel/runtime/helpers/createClass"), require("foo"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.classCallCheck, global.createClass, global.foo);
    global.input = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_classCallCheck2, _createClass2, _foo) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _foo = _interopRequireDefault(_foo);

  let Example =
  /*#__PURE__*/
  function () {
    function Example() {
      (0, _classCallCheck2.default)(this, Example);
    }

    (0, _createClass2.default)(Example, [{
      key: "method",
      value: function method() {}
    }]);
    return Example;
  }();
});
