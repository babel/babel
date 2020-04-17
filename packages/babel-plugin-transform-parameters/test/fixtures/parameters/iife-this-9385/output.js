"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Test = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Test = /*#__PURE__*/function () {
  function Test() {
    _classCallCheck(this, Test);
  }

  _createClass(Test, [{
    key: "invite",
    value: function invite() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var privacy = options.privacy || "Private";
      console.log(this);
    }
  }]);

  return Test;
}();

exports.Test = Test;
