"use strict";

function _inheritsLoose(subClass, superClass) { subClass.prototype.__proto__ = superClass && superClass.prototype; subClass.__proto__ = superClass; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

let Base =
/*#__PURE__*/
function () {
  function Base() {}

  _createClass(Base, [{
    key: "test",
    set: function (v) {
      throw new Error("gobbledygook");
    }
  }]);

  return Base;
}();

let Obj =
/*#__PURE__*/
function (_Base) {
  function Obj() {
    return _Base.apply(this, arguments) || this;
  }

  var _proto = Obj.prototype;

  _proto.call = function call() {
    return _Base.prototype.test.call(this);
  };

  _proto.test = function test() {
    throw new Error("gobbledygook");
  };

  _inheritsLoose(Obj, _Base);

  return Obj;
}(Base);

const obj = new Obj();
expect(() => {
  obj.call(); // Asser that this throws, but that it's not
  // a gobbledygook error that is thrown
}).toThrowError(TypeError);
