"use strict";

var MyDate = /*#__PURE__*/function (_Date) {
  function MyDate(time) {
    babelHelpers.classCallCheck(this, MyDate);
    return babelHelpers.callSuper(this, MyDate, [time]);
  }
  babelHelpers.inherits(MyDate, _Date);
  return babelHelpers.createClass(MyDate);
}(/*#__PURE__*/babelHelpers.wrapNativeSuper(Date));
var myDate = new MyDate();
