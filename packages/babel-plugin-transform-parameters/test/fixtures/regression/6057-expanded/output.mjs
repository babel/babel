import args from 'utils/url/args';
var App = /*#__PURE__*/function (_Component) {
  function App() {
    var _this;
    babelHelpers.classCallCheck(this, App);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = babelHelpers.callSuper(this, App, [].concat(args));
    babelHelpers.defineProperty(_this, "exportType", '');
    return _this;
  }
  babelHelpers.inherits(App, _Component);
  return babelHelpers.createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.exportType = args.get('type', window.location.href);
    }
  }]);
}(Component);
export { App as default };
