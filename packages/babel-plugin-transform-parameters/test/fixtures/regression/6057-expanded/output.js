"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _args2 = babelHelpers.interopRequireDefault(require("utils/url/args"));

var App = /*#__PURE__*/function (_Component) {
  babelHelpers.inherits(App, _Component);

  var _super = babelHelpers.createSuper(App);

  function App() {
    var _this;

    babelHelpers.classCallCheck(this, App);

    for (var _args = arguments, _len = _args.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = _args[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    babelHelpers.defineProperty(babelHelpers.assertThisInitialized(_this), "exportType", '');
    return _this;
  }

  babelHelpers.createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.exportType = _args2["default"].get('type', window.location.href);
    }
  }]);
  return App;
}(Component);

exports["default"] = App;
