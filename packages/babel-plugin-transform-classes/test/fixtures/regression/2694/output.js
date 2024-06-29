"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _BaseFoo2 = babelHelpers.interopRequireDefault(require("./BaseFoo"));
var SubFoo = exports["default"] = /*#__PURE__*/function (_BaseFoo) {
  function SubFoo() {
    babelHelpers.classCallCheck(this, SubFoo);
    return babelHelpers.callSuper(this, SubFoo, arguments);
  }
  babelHelpers.inherits(SubFoo, _BaseFoo);
  return babelHelpers.createClass(SubFoo, null, [{
    key: "talk",
    value: function talk() {
      babelHelpers.superPropGet(SubFoo, "talk", this, 2)([]);
      console.log('SubFoo.talk');
    }
  }]);
}(_BaseFoo2["default"]);
