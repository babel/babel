"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = babelHelpers.interopRequireDefault(require("react"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var RandomComponent = /*#__PURE__*/function (_Component) {
  babelHelpers.inherits(RandomComponent, _Component);

  var _super = _createSuper(RandomComponent);

  function RandomComponent() {
    babelHelpers.classCallCheck(this, RandomComponent);
    return _super.call(this);
  }

  babelHelpers.createClass(RandomComponent, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "sui-RandomComponent"
      }, /*#__PURE__*/_react.default.createElement("h2", null, "Hi there!"));
    }
  }]);
  return RandomComponent;
}(_react.Component);

exports.default = RandomComponent;
