"use strict";

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

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

  var _super = _createSuper(Obj);

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
