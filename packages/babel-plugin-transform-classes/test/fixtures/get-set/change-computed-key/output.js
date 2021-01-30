function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

let A = /*#__PURE__*/function () {
  "use strict";

  function A() {
    _classCallCheck(this, A);
  }

  _createClass(A, [{
    key: x,
    get: function () {}
  }, {
    key: (x = 2, 3),
    value: function () {}
  }, {
    key: x,
    set: function (_) {}
  }]);

  return A;
}();
