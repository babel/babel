function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _one() {}

function _two() {}

let Test1 =
/*#__PURE__*/
function () {
  function Test1() {
    _classCallCheck(this, Test1);
  }

  _createClass(Test1, [{
    key: "one",
    value: function one() {
      _two.call(_one, 1, 2);
    }
  }, {
    key: "two",
    value: function two() {
      _two.call(_one, 1, 2);
    }
  }]);

  return Test1;
}();
