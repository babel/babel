export default (param => {
  var App, _temp;

  return _temp = App = /*#__PURE__*/function () {
    function App() {
      babelHelpers.classCallCheck(this, App);
    }

    babelHelpers.createClass(App, [{
      key: "getParam",
      value: function getParam() {
        return param;
      }
    }]);
    return App;
  }(), babelHelpers.defineProperty(App, "props", {
    prop1: 'prop1',
    prop2: 'prop2'
  }), _temp;
});
