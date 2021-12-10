"use strict";

let Base = /*#__PURE__*/babelHelpers.createClass(function Base() {});

let Obj = /*#__PURE__*/function (_Base) {
  babelHelpers.inheritsLoose(Obj, _Base);

  function Obj() {
    return _Base.apply(this, arguments) || this;
  }

  var _proto = Obj.prototype;

  _proto.set = function set() {
    return this.test = 3;
  };

  return babelHelpers.createClass(Obj);
}(Base);

const obj = new Obj();
expect(obj.set()).toBe(3);
expect(Base.prototype.test).toBeUndefined();
expect(Obj.prototype.test).toBeUndefined();
expect(obj.test).toBe(3);
