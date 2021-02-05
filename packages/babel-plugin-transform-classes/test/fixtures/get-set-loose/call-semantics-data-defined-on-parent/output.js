"use strict";

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

let Base = /*#__PURE__*/function () {
  function Base() {}

  var _proto = Base.prototype;

  _proto.test = function test(...args) {
    expect(this).toBe(obj);
    expect(args).toEqual([1, 2, 3]);
    return 1;
  };

  return Base;
}();

let Obj = /*#__PURE__*/function (_Base) {
  _inheritsLoose(Obj, _Base);

  function Obj() {
    return _Base.apply(this, arguments) || this;
  }

  var _proto2 = Obj.prototype;

  _proto2.call = function call() {
    _Base.prototype.test.call(this, 1, 2, 3);

    _Base.prototype.test.call(this, 1, ...[2, 3]);

    _Base.prototype.test.call(this, ...[1, 2, 3]);

    return _Base.prototype.test.apply(this, arguments);
  };

  _proto2.test = function test() {
    throw new Error("called");
  };

  return Obj;
}(Base);

const obj = new Obj();
expect(obj.call(1, 2, 3)).toBe(1);
