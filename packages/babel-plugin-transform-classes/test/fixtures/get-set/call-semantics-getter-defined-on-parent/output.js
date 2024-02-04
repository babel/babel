"use strict";

let Base = /*#__PURE__*/function () {
  function Base() {
    babelHelpers.classCallCheck(this, Base);
  }
  babelHelpers.createClass(Base, [{
    key: "test",
    get: function () {
      expect(this).toBe(obj);
      return function (...args) {
        expect(this).toBe(obj);
        expect(args).toEqual([1, 2, 3]);
        return 1;
      };
    }
  }]);
  return Base;
}();
let Obj = /*#__PURE__*/function (_Base) {
  babelHelpers.inherits(Obj, _Base);
  function Obj() {
    babelHelpers.classCallCheck(this, Obj);
    return babelHelpers.callSuper(this, Obj, arguments);
  }
  babelHelpers.createClass(Obj, [{
    key: "call",
    value: function call() {
      babelHelpers.get(babelHelpers.getPrototypeOf(Obj.prototype), "test", this).call(this, 1, 2, 3);
      babelHelpers.get(babelHelpers.getPrototypeOf(Obj.prototype), "test", this).call(this, 1, ...[2, 3]);
      babelHelpers.get(babelHelpers.getPrototypeOf(Obj.prototype), "test", this).call(this, ...[1, 2, 3]);
      return babelHelpers.get(babelHelpers.getPrototypeOf(Obj.prototype), "test", this).apply(this, arguments);
    }
  }, {
    key: "test",
    value: function test() {
      throw new Error("called");
    }
  }]);
  return Obj;
}(Base);
const obj = new Obj();
expect(obj.call(1, 2, 3)).toBe(1);
