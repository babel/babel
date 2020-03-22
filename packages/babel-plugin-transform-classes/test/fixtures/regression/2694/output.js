"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _BaseFoo2 = babelHelpers.interopRequireDefault(require("./BaseFoo"));

function _createSuper(Derived) { return function () { var Super = babelHelpers.getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var SubFoo = /*#__PURE__*/function (_BaseFoo) {
  babelHelpers.inherits(SubFoo, _BaseFoo);

  var _super = _createSuper(SubFoo);

  function SubFoo() {
    babelHelpers.classCallCheck(this, SubFoo);
    return _super.apply(this, arguments);
  }

  babelHelpers.createClass(SubFoo, null, [{
    key: "talk",
    value: function talk() {
      babelHelpers.get(babelHelpers.getPrototypeOf(SubFoo), "talk", this).call(this);
      console.log('SubFoo.talk');
    }
  }]);
  return SubFoo;
}(_BaseFoo2["default"]);

exports["default"] = SubFoo;
