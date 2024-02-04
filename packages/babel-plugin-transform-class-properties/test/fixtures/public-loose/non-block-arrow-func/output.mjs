export default (param => {
  var _App;
  return _App = /*#__PURE__*/function () {
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
  }(), _App.props = {
    prop1: 'prop1',
    prop2: 'prop2'
  }, _App;
});
