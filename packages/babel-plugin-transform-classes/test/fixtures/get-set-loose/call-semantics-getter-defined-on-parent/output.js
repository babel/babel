"use strict";

let Base = /*#__PURE__*/function () {
  function Base() {}
  babelHelpers.createClass(Base, [{
    key: "test",
    get: function () {
      // This is incorrect according to the spec,
      // but close enough for loose.
      expect(this).toBe(Base.prototype);
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
  babelHelpers.inheritsLoose(Obj, _Base);
  function Obj() {
    return _Base.apply(this, arguments) || this;
  }
  var _proto = Obj.prototype;
  _proto.call = function call() {
    _Base.prototype.test.call(this, 1, 2, 3);
    _Base.prototype.test.call(this, 1, ...[2, 3]);
    _Base.prototype.test.call(this, ...[1, 2, 3]);
    return _Base.prototype.test.apply(this, arguments);
  };
  _proto.test = function test() {
    throw new Error("called");
  };
  return Obj;
}(Base);
const obj = new Obj();
expect(obj.call(1, 2, 3)).toBe(1);
