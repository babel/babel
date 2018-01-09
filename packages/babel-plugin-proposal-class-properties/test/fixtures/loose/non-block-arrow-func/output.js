export default (param => {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function () {
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
  }(), _class.props = {
    prop1: 'prop1',
    prop2: 'prop2'
  }, _temp;
});
