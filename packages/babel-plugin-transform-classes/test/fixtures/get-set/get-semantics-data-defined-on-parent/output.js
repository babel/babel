"use strict";

let Base = /*#__PURE__*/babelHelpers.createClass(function Base() {
  babelHelpers.classCallCheck(this, Base);
});
Base.prototype.test = 1;
let Obj = /*#__PURE__*/function (_Base) {
  function Obj() {
    babelHelpers.classCallCheck(this, Obj);
    return babelHelpers.callSuper(this, Obj, arguments);
  }
  babelHelpers.inherits(Obj, _Base);
  return babelHelpers.createClass(Obj, [{
    key: "get",
    value: function get() {
      return babelHelpers.superPropGet(Obj, "test", this, 1);
    }
  }]);
}(Base);
Obj.prototype.test = 2;
const obj = new Obj();
expect(obj.test).toBe(2);
expect(obj.get()).toBe(1);
