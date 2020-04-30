function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var x = {
  Foo: /*#__PURE__*/function (_Foo) {
    "use strict";

    babelHelpers.inherits(_class, _Foo);

    var _super = _createSuper(_class);

    function _class() {
      babelHelpers.classCallCheck(this, _class);
      return _super.apply(this, arguments);
    }

    return _class;
  }(Foo)
};
