"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _BaseFoo2 = babelHelpers.interopRequireDefault(require("./BaseFoo"));
var SubFoo = /*#__PURE__*/function (_BaseFoo) {
  babelHelpers.inherits(SubFoo, _BaseFoo);
  var _super = babelHelpers.createSuper(SubFoo);
  function SubFoo() {
    babelHelpers.classCallCheck(this, SubFoo);
    return _super.apply(this, arguments);
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
exports["default"] = SubFoo;
