"use strict";

var _copyPaste = require("./copyPaste");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Thing =
/*#__PURE__*/
function () {
  function Thing() {
    _classCallCheck(this, Thing);
  }

  _createClass(Thing, [{
    key: "handleCopySomething",
    value: function handleCopySomething() {
      (0, _copyPaste.copy)();
    }
  }, {
    key: "completelyUnrelated",
    value: function completelyUnrelated() {
      var copy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 123;
    }
  }]);

  return Thing;
}();
