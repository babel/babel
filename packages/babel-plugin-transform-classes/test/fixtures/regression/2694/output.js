"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseFoo2 = babelHelpers.interopRequireDefault(require("./BaseFoo"));

var SubFoo =
/*#__PURE__*/
function (_BaseFoo) {
  babelHelpers.inherits(SubFoo, _BaseFoo);

  function SubFoo() {
    var _babelHelpers$getProt;

    babelHelpers.classCallCheck(this, SubFoo);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return babelHelpers.possibleConstructorReturn(this, (_babelHelpers$getProt = babelHelpers.getPrototypeOf(SubFoo)).call.apply(_babelHelpers$getProt, [this].concat(args)));
  }

  babelHelpers.createClass(SubFoo, null, [{
    key: "talk",
    value: function talk() {
      babelHelpers.get(babelHelpers.getPrototypeOf(SubFoo), "talk", this).call(this);
      console.log('SubFoo.talk');
    }
  }]);
  return SubFoo;
}(_BaseFoo2.default);

exports.default = SubFoo;
