"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _BaseFoo2 = babelHelpers.interopRequireDefault(require("./BaseFoo"));
var SubFoo = exports["default"] = /*#__PURE__*/function (_BaseFoo) {
  babelHelpers.inherits(SubFoo, _BaseFoo);
  function SubFoo() {
    babelHelpers.classCallCheck(this, SubFoo);
    return babelHelpers.callSuper(this, SubFoo, arguments);
  }
  babelHelpers.createClass(SubFoo, null, [{
    key: "talk",
    value: function talk() {
      babelHelpers.get(babelHelpers.getPrototypeOf(SubFoo), "talk", this).call(this);
      console.log('SubFoo.talk');
    }
  }]);
  return SubFoo;
}(_BaseFoo2["default"]);
