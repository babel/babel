"use strict";

var MyDate = /*#__PURE__*/function (_Date) {
  babelHelpers.inherits(MyDate, _Date);
  var _super = babelHelpers.createSuper(MyDate);
  function MyDate(time) {
    babelHelpers.classCallCheck(this, MyDate);
    return _super.call(this, time);
  }
  return babelHelpers.createClass(MyDate);
}( /*#__PURE__*/babelHelpers.wrapNativeSuper(Date));
var myDate = new MyDate();
