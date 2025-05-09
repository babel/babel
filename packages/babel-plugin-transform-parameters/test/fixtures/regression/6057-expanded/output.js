"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _args = babelHelpers.interopRequireDefault(require("utils/url/args"));
var App = exports["default"] = /*#__PURE__*/function (_Component) {
  function App() {
    var _this;
    babelHelpers.classCallCheck(this, App);
    _this = babelHelpers.callSuper(this, App, arguments);
    babelHelpers.defineProperty(_this, "exportType", '');
    return _this;
  }
  babelHelpers.inherits(App, _Component);
  return babelHelpers.createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.exportType = _args["default"].get('type', window.location.href);
    }
  }]);
}(Component);
