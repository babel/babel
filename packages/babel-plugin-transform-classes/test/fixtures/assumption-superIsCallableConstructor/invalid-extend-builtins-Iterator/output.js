// Iterator can not be invoked with new, so this example does not
// satisfy the superIsCallableConstructor assumption, it will throw
// a runtime error
var RangeIterator = /*#__PURE__*/function (_Iterator) {
  "use strict";

  function RangeIterator() {
    babelHelpers.classCallCheck(this, RangeIterator);
    return _Iterator.apply(this, arguments) || this;
  }
  babelHelpers.inherits(RangeIterator, _Iterator);
  return babelHelpers.createClass(RangeIterator);
}(Iterator);
